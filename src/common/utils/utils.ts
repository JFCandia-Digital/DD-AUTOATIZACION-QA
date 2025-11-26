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

/**
 * Crea una copia profunda del objeto base y elimina un campo específico identificado por su ruta
 * @param {Object} objetoBase - Objeto original del cual se creará una copia sin el campo especificado
 * @param {string} rutaCampo - Ruta del campo a eliminar en formato 'propiedad.subpropiedad' (notación de punto)
 * @returns {Object} Nueva instancia del objeto sin el campo especificado, manteniendo inalterado el objeto original
 * 
 * @example
 * // Eliminar campo a nivel raíz
 * const sinFolio = crearVarianteSinCampo(COMUNICACION_DESPACHAR_BASE, 'folio');
 * 
 * @example
 * // Eliminar campo en objeto anidado
 * const sinDv = crearVarianteSinCampo(COMUNICACION_DESPACHAR_BASE, 'usuarioSolicitante.dv');
 * 
 * @example
 * // Eliminar campo en array de objetos (usando índice)
 * const sinIsEnCopia = crearVarianteSinCampo(COMUNICACION_DESPACHAR_BASE, 'configuracionDestinatarios.destinatarios.0.isEnCopia');
 * 
 * @throws {Error} Si el objetoBase no es un objeto válido
 * 
 * @note Utiliza lodash.cloneDeep para crear una copia profunda que evita mutaciones del objeto original
 * @note Si la ruta no existe, retorna el objeto clonado sin modificaciones
 * @note Para eliminar elementos de arrays, usar notación de índice (ej: 'array.0.propiedad')
 */
export function crearVarianteSinCampo(objetoBase: object, rutaCampo: string): object {
    if (!objetoBase || typeof objetoBase !== 'object') {
        throw new Error('El objetoBase debe ser un objeto válido');
    }
    if (!rutaCampo || typeof rutaCampo !== 'string') {
        throw new Error('La rutaCampo debe ser una cadena de texto válida');
    }
    const variante = _.cloneDeep(objetoBase);

    const partes = rutaCampo.split('.');
    let objetoActual = variante;
    
    for (let i = 0; i < partes.length - 1; i++) {
        const parte = partes[i];
        if (!objetoActual || !objetoActual.hasOwnProperty(parte)) {
            console.warn(`Advertencia: La ruta '${rutaCampo}' no existe completamente en el objeto. Parte faltante: '${parte}'`);
            return variante;
        }
        
        objetoActual = objetoActual[parte];
    }

    const campoFinal = partes[partes.length - 1];
    if (objetoActual && objetoActual.hasOwnProperty(campoFinal)) {
        delete objetoActual[campoFinal];
    } else {
        console.warn(`Advertencia: El campo '${campoFinal}' no existe en la ruta especificada`);
    }
    
    return variante;
}

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