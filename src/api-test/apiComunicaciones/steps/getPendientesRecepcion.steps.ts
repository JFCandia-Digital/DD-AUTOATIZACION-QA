import { Given, Then, When, DataTable } from "@cucumber/cucumber";
import _ from "lodash";
import { attachReport, attachJsonToReport } from "../../../common/utils/utils";
import { sendGetRequest } from "../../../common/support/apiClient";
import { apiContext } from "../../../common/support/apiContext";

/**
 * 1. PREPARA la petición GET, limpiando el contexto
 * y guardando el endpoint y el tipo de token.
 */
Given('que preparo una petición "GET" a {string} con token {string}', async function (this: any, endpoint: string, authType: string) {
  apiContext.requestEndpoint = endpoint;
  apiContext.requestAuthType = authType;
  apiContext.requestQueryParams = new Map();
  
  apiContext.attachData.method = 'GET';
  apiContext.attachData.requestBody = null;
  attachReport(this, 'token', authType);
});

/**
 * 2. AÑADE los parámetros de consulta (query params)
 * desde una DataTable de Gherkin al contexto.
 */
When('con los siguientes parámetros de consulta:', function (this: any, dataTable: DataTable) {
  const params = dataTable.rows();
  const paramsObject: Record<string, string> = {};

  for (let i =0; i < params.length; i++) {
    const parametro = params[i][0].trim();
    let valor = params[i][1].trim();
    if (valor.startsWith('"') && valor.endsWith('"')) {
      valor = valor.substring(1, valor.length - 1);
    }
    apiContext.requestQueryParams.set(parametro, valor);
    paramsObject[parametro] = valor;
  }
  attachJsonToReport(this, paramsObject, 'RequestQueryParams.json');
});


/**
 * 3. EJECUTA la petición GET, construyendo la URL final
 * con los parámetros guardados en el contexto.
 */
When('ejecuto la petición GET', async function (this: any) {
  const { requestEndpoint, requestAuthType, requestQueryParams } = apiContext;

  if (!requestEndpoint || !requestAuthType) {
    throw new Error('La petición GET no fue preparada. Falta "Given que preparo..."');
  }

  const urlParams = new URLSearchParams();

  requestQueryParams.forEach((valor, key) => {

    if (valor !== null && valor !== undefined) {
      urlParams.append(key, String(valor));
    }
  });

  const queryString = urlParams.toString();
  const finalEndpoint = queryString ? `${requestEndpoint}?${queryString}` : requestEndpoint;

  await sendGetRequest(finalEndpoint, requestAuthType);

  apiContext.attachData.url = `${process.env.API_BASEURL}${finalEndpoint}`;
  attachReport(this, 'request');
});

Given(/^con el parámetro de consulta (.*?) fijado a (.*)$/, function (this: any, parametro: string, valor: string) {
  let valorLimpio = valor.trim();
  if (valorLimpio.startsWith('"') && valorLimpio.endsWith('"')) {
    valorLimpio = valorLimpio.substring(1, valorLimpio.length - 1);
  }

  apiContext.requestQueryParams.set(parametro.trim(), valorLimpio);
  const paramObj = { [parametro.trim()]: valorLimpio };
  attachJsonToReport(this, paramObj, `ParamUnitario_${parametro.trim()}.json`);
});