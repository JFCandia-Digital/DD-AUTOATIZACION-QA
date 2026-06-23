import { Then, When } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { apiContext } from '../../../common/support/apiContext';
import { PATHS } from '../../../common/support/constants';

function resolveDocumentoSinFirma(): { filePath: string; fileName: string } {
  const fileName = process.env.NOTIFICACION_DOC_SIN_FIRMA || 'Prueba.pdf';
  const candidates = [
    process.env.NOTIFICACION_DOC_SIN_FIRMA_PATH,
    path.join(PATHS.FILES_DIRECTORY, fileName),
    path.join('C:', 'temp', fileName),
  ].filter(Boolean) as string[];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      return { filePath, fileName: path.basename(filePath) };
    }
  }

  throw new Error(
    `No se encontró documento sin firma para notificación. Rutas probadas: ${candidates.join(', ')}`
  );
}

When('adjunto el documento principal sin firma para notificación', function (this: any) {
  const { filePath, fileName } = resolveDocumentoSinFirma();

  this.filesToAttach.push({
    formKey: 'documentoPrincipal',
    fileName,
    filePath,
  });

  apiContext.attachData.requestBody['documentoPrincipal'] = `(Archivo: ${fileName})`;
});

Then('la respuesta debe contener un id', function () {
  const response = apiContext.response;

  if (!response) {
    throw new Error('Response no definida');
  }

  if (!response.data?.result?.id) {
    throw new Error(
      `No se encontró id en la respuesta:\n${JSON.stringify(response.data, null, 2)}`
    );
  }
});
