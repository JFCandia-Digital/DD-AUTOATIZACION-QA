import { Given, When } from "@cucumber/cucumber";
import { apiContext } from "../../../common/support/apiContext";
import { sendPutRequest } from "../../../common/support/apiClient";
import { attachJsonToReport, attachReport, guardarResumenDeTareas } from "../../../common/utils/utils";
import _ from "lodash";

Given('que ejecuto una petición "PUT" a {string} con token {string}', async function (this: any, endpoint: string, authType: string) {
  const defaultBody = {
    isRechazada: false,
    comentarios: "Prueba de seguridad automática"
  };

  // Usamos la función ya existente en tu apiClient
  await sendPutRequest(endpoint, authType, defaultBody);

  // Adjuntamos el reporte (request y token)
  attachReport(this, 'request');
  attachReport(this, 'token', authType);
});

/**
 *
 * Itera sobre una lista de tareas guardada en el contexto (worldData)
 * y ejecuta el Acuse de Recibo (PUT) para cada una.
 *
 * @param {string} key - La clave en 'worldData' donde está guardado el array (ej. "listaPendientes")
 * @param {string} isRechazada - "aceptado" (false) o "rechazado" (true)
 */
When('que {string} las tareas guardadas en {string} con el comentario {string}', async function (this: any, accion: string, key: string, comentario: string) {

  let isRechazada: boolean;
  if (accion.toLowerCase() === 'acepto') {
    isRechazada = false;
  } else if (accion.toLowerCase() === 'rechazo') {
    isRechazada = true;
  } else {
    throw new Error(`Acción no reconocida: ${accion}. Use "acepto" o "rechazo".`);
  }

  const requestBody = {
    isRechazada: isRechazada,
    comentarios: comentario
  };

  const tareas = apiContext.worldData.get(key);

  if (!Array.isArray(tareas)) {
    throw new Error(`No se encontró un array en el contexto con la clave: ${key}`);
  }

  if (tareas.length === 0) {
    console.log(`Advertencia: La lista de tareas '${key}' está vacía. No se ejecutará ningún Acuse de Recibo.`);
    return;
  }

  console.log(`Iniciando bucle de Acuse de Recibo para ${tareas.length} tareas...`);

  for (const tarea of tareas) {
    const comId = tarea.comunicacionId;
    const tareaId = tarea.tareaId;

    if (!comId || !tareaId) {
      console.error("Tarea omitida por falta de IDs:", tarea);
      continue;
    }

    const endpoint = `/comunicaciones/${comId}/recepcion/${tareaId}/acuse-recibo`;
    console.log(`  -> Ejecutando ${accion} en: ${endpoint}`);

    await sendPutRequest(endpoint, "válido", requestBody);

    attachReport(this, 'request');
    attachJsonToReport(this, apiContext.response.data, `ResponseBody_PUT_${tareaId}.json`);

    if (apiContext.response.status !== 200) {
      throw new Error(`Falló el Acuse de Recibo para tareaId ${tareaId}. Status: ${apiContext.response.status}`);
    }
  }

  console.log("Bucle de Acuse de Recibo completado.");
});

/**
 * * Este step ahora realiza 4 acciones (Pasos C-Extracción y D):
 * 1. Lee el array de tareas desde el contexto (ej. "listaArmada").
 * 2. Llama a 'guardarResumenDeTareas' para crear el JSON de auditoría (Paso C-Ext).
 * 3. Itera sobre cada tarea.
 * 4. Aplica lógica "inteligente" (Aceptar/Rechazar) y ejecuta el PUT (Paso D).
 * 5. (Bonus) Actualiza el array de resumen con el resultado y lo vuelve a guardar.
 *
 * @param {string} key - La clave en 'worldData' donde está guardado el array (ej. "listaArmada")
 */
When('que proceso las tareas guardadas en {string} en el metodo PUT {string}', { timeout: 120 * 1000 }, async function (this: any, key: string, urlTemplate: string) {

  const tareas = apiContext.worldData.get(key);

  if (!Array.isArray(tareas)) {
    throw new Error(`No se encontró un array en el contexto con la clave: ${key}`);
  }

  if (tareas.length === 0) {
    console.log(`Advertencia: La lista de tareas '${key}' está vacía. No se procesará nada.`);
    return;
  }

  console.log(`Iniciando bucle de PROCESAMIENTO INTELIGENTE para ${tareas.length} tareas...`);

  const resultadosProcesamiento = [];

  for (const tarea of tareas) {
    const comId = _.get(tarea, 'comunicacionId');
    const tareaId = _.get(tarea, 'tareaId');
    const materia = _.get(tarea, 'comunicacionMateria', '');

    if (!comId || !tareaId) {
      console.error("Tarea omitida por falta de IDs:", tarea);
      continue;
    }

    let isRechazada: boolean;
    let comentarios: string;

    if (Math.random() < 0.5) {
      isRechazada = true;
      comentarios = `Rechazado ALEATORIAMENTE por Test Automatizado (Materia: ${materia})`;
    } else {
      isRechazada = false;
      comentarios = `Aceptado ALEATORIAMENTE por Test Automatizado (Materia: ${materia})`;
    }


    const requestBody = { isRechazada, comentarios };
    const endpoint = `/comunicaciones/${comId}/recepcion/${tareaId}/acuse-recibo`;

    console.log(`  -> Procesando Tarea ${tareaId} como: ${isRechazada ? 'RECHAZADA' : 'ACEPTADA'}`);
    await sendPutRequest(endpoint, "válido", requestBody);

    attachReport(this, 'request');
    attachJsonToReport(this, apiContext.response.data, `ResponseBody_PUT_${tareaId}.json`);

    const resultadoAccion = {
      tareaId: tareaId,
      comunicacionId: comId,
      materia: materia,
      accion: {
        isRechazada: isRechazada,
        comentarios: comentarios
      }
    };
    resultadosProcesamiento.push(resultadoAccion);

    if (apiContext.response.status !== 200) {
      throw new Error(`Falló el Acuse de Recibo para tareaId ${tareaId}. Status: ${apiContext.response.status}`);
    }
  }

  const reporteFinalFileName = `reporte_acuse-recibo_${key}.json`;
  guardarResumenDeTareas(resultadosProcesamiento, reporteFinalFileName);
  attachJsonToReport(this, resultadosProcesamiento, reporteFinalFileName);

  console.log(`Bucle de procesamiento completado. Reporte final guardado en: ${reporteFinalFileName}`);
});