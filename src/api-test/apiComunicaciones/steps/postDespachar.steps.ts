import { Given, Then, When } from "@cucumber/cucumber";
import { apiContext } from "../../../common/support/apiContext";
import { comunicacionRequest } from '../../request/requestBodies';
import FormData from "form-data";
import fs from "fs";
import _ from "lodash";
import { PATHS } from '../../../common/support/constants';
import path from "path";
import { attachJsonToReport, attachReport } from "../../../common/utils/utils";
import { sendPostMultipartRequest } from "../../../common/support/apiClient";

Given('que preparo una petición "POST" a {string} con token {string}', async function (this: any, endpoint: string, authType: string) {
  this.formData = new FormData();
  this.endpoint = endpoint;
  this.authType = authType;
  this.requestBody = {};
  this.filesToAttach = [];

  apiContext.attachData.requestBody = {};
  attachReport(this, 'token', authType);
});

When('adjunto un archivo valido {string} como {string}', function (this: any, fileName: string, formKey: string) {
  if (fileName.toLowerCase() === '(null)') {
    apiContext.attachData.requestBody[formKey] = '(Archivo omitido)';
    return;
  }
  const filePath = path.join(PATHS.FILES_DIRECTORY, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`El archivo '${fileName}' no se encuentra en: ${filePath}`);
  }

  this.filesToAttach.push({
    formKey: formKey,
    fileName: fileName,
    filePath: filePath
  });

  const fileReportString = `(Archivo: ${fileName})`;

  if (formKey !== 'archivosAnexos') {
    apiContext.attachData.requestBody[formKey] = fileReportString;
    return;
  }

  if (!Array.isArray(apiContext.attachData.requestBody[formKey])) {
    apiContext.attachData.requestBody[formKey] = [];
  }

  apiContext.attachData.requestBody[formKey].push(fileReportString);
});

Then('uso el cuerpo de petición llamado {string} como campo {string}', function (this: any, bodyName: string, formKey: string) {
  if (bodyName.toLowerCase() === '(null)') {
    return;
  }
  const requestBodyOriginal = comunicacionRequest[bodyName];
  if (!requestBodyOriginal) {
    throw new Error(`El cuerpo '${bodyName}' no se encuentra en requestBodies.ts`);
  }

  const requestBody = _.cloneDeep(requestBodyOriginal);
  const dynamicTimestamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (requestBody.materia === "AUT-materia-TEST") {
    requestBody.materia = `AUT-materia-TEST-${dynamicTimestamp}`;
  }
  
  if (requestBody.folio === "FOLIO-BASE-2025") {
    requestBody.folio = `AUT-folio-TEST-${dynamicTimestamp}-Prueba Automatizada`;
  }

  if (requestBody.descripcion === "AUT-descripcion-TEST") { 
    requestBody.descripcion = `AUT-descripcion-TEST-${dynamicTimestamp}-Prueba Automatizada`;
  }

  attachJsonToReport(this, requestBody, `RequestBody_${bodyName}_FinalEnviado.json`);
  this.requestBody = requestBody;
  apiContext.attachData.requestBody[formKey] = requestBody;
});


When('envío la petición multipart', { timeout: 60 * 1000 }, async function (this: any) {
  const formData = new FormData();

  let shouldModifyAnexosInfo = 
       this.requestBody 
    && 'archivosAnexosInfo' in this.requestBody 
    && Array.isArray(this.requestBody.archivosAnexosInfo)
    && this.requestBody.archivosAnexosInfo.length > 0
    && this.filesToAttach.some(file => file.formKey === 'archivosAnexos');
  
  if (shouldModifyAnexosInfo) {
    this.requestBody.archivosAnexosInfo = [];
  }

  for (const file of this.filesToAttach) {
    if (file.formKey === 'archivosAnexos' && shouldModifyAnexosInfo) {
      this.requestBody.archivosAnexosInfo.push({
        "fileName": file.fileName,
        "isReservado": false
      });
    }

    formData.append(file.formKey, fs.createReadStream(file.filePath));
  }
  
  const bodyAsString = JSON.stringify(this.requestBody);
  formData.append('comunicacionRequest', bodyAsString, { contentType: 'application/json' });
  
  apiContext.attachData.requestBody['comunicacionRequest'] = this.requestBody;

  await sendPostMultipartRequest(this.endpoint, this.authType, formData);

  attachReport(this, 'request');
  attachReport(this, 'token');
});