import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { apiContext } from "../../common/support/apiContext";
import { errorStructures, successStructures } from '../schemas/schemas';
import _ from 'lodash';
import {
  validateStructure,
  attachJsonToReport,
  attachReport,
} from "../../common/utils/utils";


Then('el estado de la respuesta debe ser {int}', function (this: any, statusCode: number) {
  try {
    expect(apiContext.response.status).toBe(statusCode);
    attachReport(this, 'response');
  } catch (error) {
    throw new Error(`
    Status esperado: ${statusCode}
    Status recibido: ${apiContext.response.status}
    Response body: ${JSON.stringify(apiContext.response.data, null, 2)}
  `);

  }
});

Then('el cuerpo de la respuesta debe tener la propiedad {string}', function (this: any, path: string) {
  expect(_.has(apiContext.response.data, path)).toBe(true);
  attachReport(this, 'response');
});

Then('el cuerpo de la respuesta debe tener la propiedad {string} con el valor {}', function (path: string, value: string) {
  let expectedValue: any;
  try {
    expectedValue = JSON.parse(value);
  } catch (e) {
    expectedValue = value;
  }
  const actualValue = _.get(apiContext.response.data, path);
  expect(actualValue).toEqual(expectedValue);
  attachReport(this, 'response');
});

Then('el cuerpo de la respuesta debe tener la estructura de éxito {string}', function (this: any, structureName: string) {
  try {
    const expectedStructure = (successStructures as Record<string, any>)[structureName];
    if (!expectedStructure) {
      throw new Error(`La estructura de éxito llamada '${structureName}' no está definida en src/api-test/data/schemas.ts`);
    }
    attachJsonToReport(this, expectedStructure, `ExpectedSchema_SUCCESS_${structureName}.json`);
    const actualResponse = apiContext.response.data;

    validateStructure(actualResponse, expectedStructure, '');
  } catch (error) {
    throw new Error(`Response body: ${JSON.stringify(apiContext.response.data, null, 2)}`);
  }
});

Then('el cuerpo de la respuesta debe tener la estructura de error {string}', function (this: any, structureName: string) {
  try {
    const expectedStructure = (errorStructures as Record<string, any>)[structureName];
    if (!expectedStructure) {
      throw new Error(`La estructura llamada '${structureName}' no está definida en src/api-test/data/schemas.ts`);
    }
    attachJsonToReport(this, expectedStructure, `ExpectedSchema_ERROR_${structureName}.json`);
    const actualResponse = apiContext.response.data;
    validateStructure(actualResponse, expectedStructure, '');
  } catch (error) {
    throw new Error(`Response body: ${JSON.stringify(apiContext.response.data, null, 2)}`);

  }

});

Then('la propiedad {string} del cuerpo de la respuesta debe ser una fecha y hora actual', function (path: string) {
  const timestampString = _.get(apiContext.response.data, path);
  expect(timestampString, `La propiedad timestamp en la ruta '${path}' no fue encontrada.`).toBeDefined();
  console.log(`  Valor del timestamp recibido: "${timestampString}"`);

  const [datePart, timePart] = timestampString.split(' ');
  expect(datePart && timePart, `El formato del timestamp "${timestampString}" no es válido.`).toBeDefined();

  const [day, month, year] = datePart.split('-');
  const isoDateString = `${year}-${month}-${day}T${timePart}`;

  const timestampDate = new Date(isoDateString);
  expect(isNaN(timestampDate.getTime()), `No se pudo convertir "${isoDateString}" a una fecha válida.`).toBe(false);

  const requestTime = apiContext.requestTimestamp;
  expect(requestTime, 'No se guardó el timestamp de la petición en el contexto.').not.toBeNull();

  const differenceInSeconds = Math.abs(timestampDate.getTime() - requestTime!.getTime()) / 1000;
  const toleranceInSeconds = 10;
  expect(differenceInSeconds).toBeLessThan(toleranceInSeconds);
  attachReport(this, 'response');
});

/**
 * Extrae un valor de la respuesta JSON anterior (apiContext.response)
 * y lo guarda en el 'baúl' (apiContext.worldData) para usarlo después.
 */
Then('guardo el valor de la propiedad {string} como {string} en el contexto', function (this: any, path: string, key: string) {

  const value = _.get(apiContext.response.data, path);

  if (value === undefined) {
    throw new Error(`No se pudo encontrar la propiedad '${path}' en la respuesta anterior.`);
  }

  apiContext.worldData.set(key, value);
  console.log(`Contexto guardado: ${key} = ${value}`);

  const data = { [key]: value };
  attachJsonToReport(this, data, `ContextoGuardado_${key}.json`);
});