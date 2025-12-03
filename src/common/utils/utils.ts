import { expect } from "@playwright/test";
import { apiContext } from '../support/apiContext';
import { buildAuthConfig } from "../support/apiClient";
import _ from "lodash";
import fs from "fs";
import { PATHS } from "../support/constants";
import path from "path";

/**
 * Función helper para decidir si usar una variable de entorno o el valor literal.
 */
export function getCredential(credential: string): string {
  const upperCredential = credential.toUpperCase();

  switch (upperCredential) {
    // --- Credenciales PDI ---
    case 'CLIENT_ID_PDI':
      return process.env.CLIENT_ID_PDI!;
    case 'CLIENT_SECRET_PDI':
      return process.env.CLIENT_SECRET_PDI!;

    // --- Credenciales ARMADA ---
    case 'CLIENT_ID_ARMADA':
      return process.env.CLIENT_ID_ARMADA!;
    case 'CLIENT_SECRET_ARMADA':
      return process.env.CLIENT_SECRET_ARMADA!;

    // --- Credenciales SUES ---
    case 'CLIENT_ID_SUES':
      return process.env.CLIENT_ID_SUES!;
    case 'CLIENT_SECRET_SUES':
      return process.env.CLIENT_SECRET_SUES!;

    // --- Credenciales CARABINEROS ---
    case 'CLIENT_ID_CARABINEROS':
      return process.env.CLIENT_ID_CARABINEROS!;
    case 'CLIENT_SECRET_CARABINEROS':
      return process.env.CLIENT_SECRET_CARABINEROS!;

    // --- Credenciales SEGEPRES ---
    case 'CLIENT_ID_SEGEPRES':
      return process.env.CLIENT_ID_SEGEPRES!;
    case 'CLIENT_SECRET_SEGEPRES':
      return process.env.CLIENT_SECRET_SEGEPRES!;

    // --- Credenciales CNE ---
    case 'CLIENT_ID_CNE':
      return process.env.CLIENT_ID_CNE!;
    case 'CLIENT_SECRET_CNE':
      return process.env.CLIENT_SECRET_CNE!;

    default:
      return credential;
  }
};


/**
 * Valida recursivamente la estructura y los tipos de un objeto o array de la API.
 * @param actual El objeto/array real de la respuesta de la API.
 * @param expected El objeto/array con la estructura y tipos esperados.
 * @param path La ruta actual para mensajes de error claros.
 */
export function validateStructure(actual: any, expected: any, path: string) {

  if (Array.isArray(expected)) {
    expect(Array.isArray(actual), `La propiedad '${path}' debería ser un array.`).toBe(true);

    if (actual.length === 0) return;
    const expectedNode = expected[0];
    for (let i = 0; i < actual.length; i++) {
      validateStructure(actual[i], expectedNode, `${path}[${i}]`);
    }
    return;
  }

  if (typeof expected === 'object' && expected !== null) {
    for (const key in expected) {

      let isOptional = false;
      let actualKey = key;

      if (key.endsWith('?')) {
        isOptional = true;
        actualKey = key.slice(0, -1);
      }

      const currentPath = path ? `${path}.${actualKey}` : actualKey;

      if (isOptional && !Object.prototype.hasOwnProperty.call(actual, actualKey)) {
        continue;
      }

      expect(actual, `Al objeto en la ruta '${path}' le falta la propiedad '${actualKey}'.`).toHaveProperty(actualKey);

      const expectedValue = expected[key];
      const actualValue = actual[actualKey];
      validateStructure(actualValue, expectedValue, currentPath);
    }
    return;
  }

  if (typeof expected === 'string') {
    const actualType = typeof actual;
    expect(actualType, `El tipo de '${path}' debería ser '${expected}', pero es '${actualType}'.`).toBe(expected);
  }
}

/**
 * Adjunta un objeto JSON formateado al reporte de Cucumber.
 * @param worldContext El contexto 'this' del step de Cucumber.
 * @param data El objeto JavaScript a adjuntar.
 * @param fileName El nombre deseado para el archivo adjunto.
 */
export function attachJsonToReport(worldContext: any, data: any, fileName: string) {
  try {
    worldContext.attach(
      JSON.stringify(data, null, 2),
      { mediaType: 'application/json', fileName: fileName }
    );
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    worldContext.attach(
      `Error al adjuntar ${fileName}: ${errorMessage}`,
      { mediaType: 'text/plain', fileName: `${fileName}_Error.txt` }
    );
  }
}

/**
 * Adjunta una parte específica del reporte (request, status, o response)
 * SOLO SI el escenario tiene el tag "@Report".
 * @param worldContext El 'this' del step de Cucumber.
 * @param part La parte del reporte a adjuntar.
 */
export function attachReport(worldContext: any, part: 'request' | 'status' | 'response' | 'token', typeToken?: string) {
  try {
    switch (part) {
      case 'request':
        const { method, url, requestBody } = apiContext.attachData;
        worldContext.attach(
          `Request: ${method || 'N/A'} ${url || 'N/A'}`,
          { mediaType: 'text/plain', fileName: 'RequestInfo.txt' }
        );
        if (requestBody) {
          attachJsonToReport(worldContext, requestBody, 'RequestBody.json');
        }
        break;

      case 'status':
        const { statusCode } = apiContext.attachData;
        worldContext.attach(
          `Status: ${statusCode || 'N/A'}`,
          { mediaType: 'text/plain', fileName: 'StatusInfo.txt' }
        );
        break;

      case 'response':
        const { responseBody } = apiContext.attachData;
        attachJsonToReport(worldContext, responseBody || {}, 'ResponseBody.json');
        break;

      case 'token':
        let authValue = 'N/A';

        if (typeToken) {
          const headers = buildAuthConfig(typeToken);
          authValue = headers.Authorization || 'N/A (Omitido)';
        } else { authValue = apiContext.attachData.authorizationHeader || 'N/A'; }
        worldContext.attach(
          `Authorization Header: ${authValue || 'N/A'}`,
          { mediaType: 'text/plain', fileName: 'AuthorizationHeader.txt' }
        );
        break;
    }
  } catch (e) {
    worldContext.attach(
      `Error al adjuntar la parte '${part}' del reporte: ${e.message}`,
      { mediaType: 'text/plain', fileName: 'ReportError.txt' }
    );
  }
}

// recibe el objeto contenedor y la clave/índice
type AccionTransformacion = (contenedor: any, clave: string | number) => void;

/**
 * MOTOR GENÉRICO DE NAVEGACIÓN
 * Recorre un objeto siguiendo una ruta y ejecuta una acción en el destino.
 * Soporta el comodín '*' para aplicar la acción a todos los elementos de un array.
 * * @param objetoBase Objeto original.
 * @param rutaCampo Ruta (ej: 'padre.hijo', 'lista.*.id').
 * @param accion Callback que define qué hacer al llegar al campo (borrar, null, etc).
 */
export function aplicarTransformacion(objetoBase: object, rutaCampo: string, accion: AccionTransformacion): object {
    if (!objetoBase || typeof objetoBase !== 'object') throw new Error('El objetoBase debe ser un objeto válido');
    if (!rutaCampo || typeof rutaCampo !== 'string') throw new Error('La rutaCampo debe ser una cadena de texto válida');
    
    const variante = _.cloneDeep(objetoBase);
    const partes = rutaCampo.split('.');

    function navegar(obj: any, indiceParte: number) {
        if (!obj) return;

        const parteActual = partes[indiceParte];
        const esUltimaParte = indiceParte === partes.length - 1;

        if (parteActual === '*') {
            if (Array.isArray(obj)) {
                obj.forEach(item => navegar(item, indiceParte + 1));
            } else {
                console.warn(`Advertencia: Se usó '*' en la ruta '${rutaCampo}' pero el valor encontrado no es un array.`);
            }
            return;
        }

        if (esUltimaParte) {
            if (obj.hasOwnProperty(parteActual)) {
               accion(obj, parteActual);
            } else {
                console.warn(`Advertencia: El campo '${parteActual}' no existe en la ruta especificada.`);
            }
            return;
        }

        if (obj.hasOwnProperty(parteActual)) {
            navegar(obj[parteActual], indiceParte + 1);
        }
    }

    navegar(variante, 0);
    return variante;
}

/**
 * Crea una copia profunda del objeto y ELIMINA el campo especificado.
 * Soporta 'ruta.array.*.campo' para borrar en masa.
 */
export function crearVarianteSinCampo(objetoBase: object, rutaCampo: string): object {
    const estrategiaEliminar: AccionTransformacion = (obj, clave) => {
        if (Array.isArray(obj) && !isNaN(Number(clave))) {
             delete obj[clave as any]; 
        } else {
            delete obj[clave as any];
        }
    };

    return aplicarTransformacion(objetoBase, rutaCampo, estrategiaEliminar);
}

/**
 * Crea una copia profunda del objeto y MODIFICA el valor en la ruta especificada.
 * Soporta 'ruta.array.*.campo' para modificar en masa todos los items de un array.
 * * @param objetoBase El objeto original.
 * @param rutaCampo La ruta (ej: 'config.destinatarios.0.id' o 'config.destinatarios.*.id').
 * @param nuevoValor El valor que quieres asignar.
 */
export function crearVarianteValor(objetoBase: object, rutaCampo: string, nuevoValor: any): object {
    // Definimos la estrategia: "Asignar Valor"
    const estrategiaAsignar: AccionTransformacion = (obj, clave) => {
        obj[clave] = nuevoValor;
    };

    return aplicarTransformacion(objetoBase, rutaCampo, estrategiaAsignar);
}

/**
 * Helper para variantes de archivos anexos
 */
export const crearVarianteArchivo = (base: object, fileName: string) => ({
  ...base,
  "archivosAnexosInfo": [{ "fileName": fileName, "isReservado": false }]
});


/**
 * Guarda CUALQUIER dato en un archivo JSON en el directorio de históricos.
 * (Función genérica y de responsabilidad única).
 *
 * @param {any} data - El objeto o array que se guardará.
 * @param {string} fileName - El nombre del archivo (ej. "reporte_armada.json")
 */
export function guardarResumenDeTareas(data: any, fileName: string) {
  if (!data) {
    console.log(`Advertencia: No se guardó '${fileName}' (datos nulos o vacíos).`);
    return;
  }

  try {
    const outputDir = PATHS.JSON_HISTORICS_DIRECTORY;
    const filePath = path.join(outputDir, fileName);

    fs.mkdirSync(outputDir, { recursive: true });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`Reporte JSON guardado en: ${filePath}`);

  } catch (error) {
    console.error(`Error al guardar el resumen JSON '${fileName}':`, error);
  }
}

/**
 * Retorna la fecha y hora actual formateada como "dd-MM-yyyy HH:mm:ss".
 * Útil para campos de fecha en Registro Externo u otros endpoints que requieran este formato específico.
 */
export function obtenerFechaActualFormateada(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Intenta parsear una respuesta Multipart/Mixed para extraer la parte JSON (metadatos).
 * Si el contenido no cumple el contrato o el JSON es inválido, lanza un error.
 * * @param worldContext El contexto 'this' de Cucumber para adjuntar reportes.
 * @param contentType El header Content-Type recibido.
 */
export function procesarMultipartEstricto(worldContext: any, contentType: string) {
  const boundaryMatch = contentType.match(/boundary=(.+)/);
  if (!boundaryMatch) {
    throw new Error("El header Content-Type es multipart/mixed pero no incluye el parámetro 'boundary'.");
  }

  let boundary = boundaryMatch[1];
  boundary = boundary.replace(/["';]/g, ''); 

  const responseBody = apiContext.response.data;
  const bodyString = typeof responseBody === 'string' ? responseBody : String(responseBody);
  const partes = bodyString.split(`--${boundary}`);
  const parteJson = partes.find((p: string) => 
      p.includes('application/json')
  );

  if (!parteJson) {

    throw new Error("Multipart recibido, pero no se encontró una parte con 'Content-Type: application/json'.");
  }

  const headerIndex = parteJson.indexOf('application/json');
  const inicioJson = parteJson.indexOf('{', headerIndex);
  const finJson = parteJson.lastIndexOf('}');

  if (inicioJson !== -1 && finJson !== -1) {
    let jsonStringLimpio = parteJson.substring(inicioJson, finJson + 1);
    jsonStringLimpio = jsonStringLimpio.trim();

    try {
      const metadatos = JSON.parse(jsonStringLimpio);
      attachJsonToReport(worldContext, metadatos, `Metadatos_Extraidos.json`);
      console.log("   -> JSON de metadatos parseado correctamente.");
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      worldContext.attach(jsonStringLimpio, { mediaType: 'text/plain', fileName: 'JSON_INVALIDO_RAW.txt' });
      throw new Error(`Fallo al parsear JSON. Error: ${errorMsg}. Contenido (primeros 50 chars): ${jsonStringLimpio.substring(0, 50)}...`);
    }
  } else {
      throw new Error("Se encontró la parte 'application/json', pero no contiene un objeto JSON válido delimitado por { }.");
  }
}