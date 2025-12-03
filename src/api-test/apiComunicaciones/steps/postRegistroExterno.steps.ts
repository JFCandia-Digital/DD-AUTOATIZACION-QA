import { Then, When } from "@cucumber/cucumber";
import { apiContext } from "../../../common/support/apiContext";
import { registroExternoRequest } from '../../request/requestBodies';
import FormData from "form-data";
import fs from "fs";
import _ from "lodash";
import { attachJsonToReport, attachReport, obtenerFechaActualFormateada } from "../../../common/utils/utils";
import { sendPostMultipartRequest } from "../../../common/support/apiClient";

Then('uso el cuerpo de registro externo llamado {string} como campo {string}', function (this: any, bodyName: string, campoName: string) {
  if (bodyName.toLowerCase() === '(null)') {
    return;
  }

  const requestBodyOriginal = registroExternoRequest[bodyName];

  if (!requestBodyOriginal) {
    throw new Error(`El cuerpo '${bodyName}' no se encuentra en la sección 'registroExternoRequest' de requestBodies.ts`);
  }

  const requestBody = _.cloneDeep(requestBodyOriginal);

  const fechaFormateada = obtenerFechaActualFormateada();

  if (requestBody.fechaHoraDespachoExterno === null) {
    requestBody.fechaHoraDespachoExterno = fechaFormateada;
    console.log(`[DEBUG] Fecha externa generada: ${requestBody.fechaHoraDespachoExterno}`);
  }

  const dynamicTimestamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (requestBody.materia && typeof requestBody.materia === 'string' && requestBody.materia.startsWith("AUT-materia-TEST-REGISTRO-EXTERNO")) {
    requestBody.materia = `${requestBody.materia}-${dynamicTimestamp}`;
  }

  attachJsonToReport(this, requestBody, `RequestBody_RegistroExterno_${bodyName}.json`);
  
  this.requestBody = requestBody;
  apiContext.attachData.requestBody['registroComunicacionRequest'] = requestBody;
});


When('envío la petición multipart de registro externo', { timeout: 60 * 1000 }, async function (this: any) {
  const formData = new FormData();
  
  if (this.filesToAttach && this.filesToAttach.length > 0) {
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
  }
  
  const bodyAsString = JSON.stringify(this.requestBody);
  
  formData.append('registroComunicacionRequest', bodyAsString, { contentType: 'application/json' });
  
  apiContext.attachData.requestBody['registroComunicacionRequest'] = this.requestBody;

  await sendPostMultipartRequest(this.endpoint, this.authType, formData);

  attachReport(this, 'request');
  attachReport(this, 'token');
});