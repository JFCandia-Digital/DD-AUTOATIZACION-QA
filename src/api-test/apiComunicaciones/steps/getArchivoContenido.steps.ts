import { When } from "@cucumber/cucumber";
import { apiContext } from "../../../common/support/apiContext";
import { sendGetRequest } from "../../../common/support/apiClient";
import { attachReport, procesarMultipartEstricto } from "../../../common/utils/utils";
import _ from "lodash";

When('ejecuto peticiones {string} a {string} para el documento principal y sus anexos', async function (this: any, method: string, urlTemplate: string) {

    const responseDataPrevio = apiContext.response?.data?.result;
    if (!responseDataPrevio) throw new Error("No hay datos en la respuesta anterior (Prerrequisito) para extraer los IDs.");

    const comunicacionId = responseDataPrevio.comunicacionId;
    if (!comunicacionId) throw new Error("No se encontró el 'comunicacionId' en la respuesta previa.");

    const archivosParaDescargar: Array<{ id: string, tipo: string }> = [];

    const docPrincipalId = _.get(responseDataPrevio, 'documentoPrincipal.id');
    if (docPrincipalId) {
        archivosParaDescargar.push({ id: docPrincipalId, tipo: 'Documento Principal' });
    }

    const anexos = _.get(responseDataPrevio, 'documentosAnexos', []);
    if (Array.isArray(anexos)) {
        anexos.forEach((anexo: any, index: number) => {
            if (anexo.id) {
                archivosParaDescargar.push({ id: anexo.id, tipo: `Anexo #${index + 1}` });
            }
        });
    }

    if (archivosParaDescargar.length === 0) {
        throw new Error("La comunicación consultada no tiene archivos para probar este endpoint.");
    }

    console.log(`[Test] Ejecutando peticiones a: ${urlTemplate}`);
    console.log(`[Test] Se procesarán ${archivosParaDescargar.length} archivos.`);

    const erroresAcumulados: string[] = [];

    const esEndpointMetadata = urlTemplate.includes("archivo-contenido-y-metadata");

    for (const archivo of archivosParaDescargar) {
        const endpointFinal = urlTemplate
            .replace(':comunicacionId', String(comunicacionId))
            .replace(':archivoId', String(archivo.id))
            .replace(':comunicacion_id', String(comunicacionId)) 
            .replace(':archivo_uuid', String(archivo.id));
        
        console.log(`-> Probando GET ${endpointFinal} (${archivo.tipo})`);

        try {
            await sendGetRequest(endpointFinal, "válido");
            
            this.attach(`Petición realizada: ${method} ${endpointFinal}\nArchivo: ${archivo.tipo}`);
            attachReport(this, 'request');

            if (apiContext.response.status !== 200) {
                throw new Error(`Status incorrecto: ${apiContext.response.status}`);
            }

            const headers = apiContext.response.headers;
            const contentType = (headers['content-type'] || headers['Content-Type'] || '').toLowerCase();
            const responseBody = apiContext.response.data;
            const bodyString = String(responseBody);

            this.attach(`Content-Type recibido: ${contentType}`);
            
            if (esEndpointMetadata) {
                if (!contentType.includes("multipart/mixed")) {
                    throw new Error(`Error de Contrato: Se esperaba 'multipart/mixed' pero se recibió '${contentType}'.`);
                }
                procesarMultipartEstricto(this, contentType);

            } else {
                const esBinarioPDF = bodyString.includes("%PDF-");

                if (contentType.includes("application/pdf") && !esBinarioPDF) {
                     console.warn("El content-type es PDF pero no se detectó la cabecera %PDF- en el inicio del string (podría ser encoding).");
                }
            }

        } catch (error: any) {
            const mensajeError = `[FALLO en ${archivo.tipo}]: ${error.message}`;
            console.error(mensajeError);
            erroresAcumulados.push(mensajeError);
            this.attach(mensajeError);
        }
    }

    if (erroresAcumulados.length > 0) {
        throw new Error(`Se encontraron ${erroresAcumulados.length} errores durante la validación:\n` + erroresAcumulados.join("\n"));
    }
});