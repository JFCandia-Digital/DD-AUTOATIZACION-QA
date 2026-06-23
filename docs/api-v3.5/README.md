# Manual API Middleware DocDigital v3.5

Colocar aquí el documento de integración:

`DocDigital V3_ MANUAL DE INTEGRACIÓN API MW V 3.5.docx`

Este manual es la referencia para automatizar el endpoint:

- `POST /comunicaciones/despachar-tipo-notificacion`

## Variables de entorno útiles (`.env.api`)

```env
# PDF sin firma (escenarios negativos)
NOTIFICACION_DOC_SIN_FIRMA=Prueba.pdf
NOTIFICACION_DOC_SIN_FIRMA_PATH=C:/temp/Prueba.pdf

# PDF con FEA para token PDI (66): usar PDF genéricos del framework
# NO usar Mineduc.pdf con token PDI (documento ligado a entidad MINEDUC / 106)
# NOTIFICACION_DOC_CON_FIRMA=Firmado_por_ecert.pdf

# Entidad despachadora QA PDI (misma que postDespachar)
NOTIFICACION_ENTIDAD_DESPACHADORA_CODIFICADOR_ID=598
NOTIFICACION_DESTINATARIO_PRINCIPAL_ID=156
# Obtener con: GET /entidades/dependientes/66
NOTIFICACION_DEPENDIENTE_CODIFICADOR_ID=<id_dependiente>
NOTIFICACION_DESTINATARIO_PRINCIPAL_ID=66
NOTIFICACION_DESTINATARIO_NO_DEPENDIENTE_ID=598

# Iniciales en materia/folio de notificación (default: JFC)
# NOTIFICACION_QA_INICIALES=JFC
```
