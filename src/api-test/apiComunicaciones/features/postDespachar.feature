@API @Comunicaciones @Despachar
Feature: Pruebas realizadas a la API "POST" - "/comunicaciones/despachar"

# =================================================================================
# == Pruebas para método POST /comunicaciones/despachar
# =================================================================================
@Revision
  Scenario: Enviar petición "POST" - "/comunicaciones/despachar" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_CON_ARCHIVOS_ANEXOS" como campo "comunicacionRequest"
    And adjunto un archivo valido "Firmado_por_ecert.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    And adjunto un archivo valido "MINVU.pdf" como "archivosAnexos"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "COMUNICACION_DESPACHAR_EXITOSA"
    And la propiedad "result.fechaDespacho" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "POST" - "/comunicaciones/despachar" con datos válidos y distintos token
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "<tipo_auth>"
    And uso el cuerpo de petición llamado "JSON_MINIMO_VALIDO" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario: Validar "POST" - "/comunicaciones/despachar" con datos mínimos definido por el Swagger (Campos Opcionales Omitidos)
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_SWAGGER_MINIMUM" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "COMUNICACION_DESPACHAR_EXITOSA"

  Scenario: Validar "POST" - "/comunicaciones/despachar" con 'archivosAnexos' valido y sin 'archivosAnexosInfo' en JSON comunicacionRequest
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_MINIMO_VALIDO" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "La información asociada archivos anexos es obligatoria."

  Scenario: Validar "POST" - "/comunicaciones/despachar" con 'archivosAnexos' valido y sin datos en 'archivosAnexosInfo' en JSON comunicacionRequest
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_CON_ARCHIVOS_ANEXOS_VACIOS" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "La información asociada archivos anexos debe coincidir con la cantidad de archivos anexos enviados."

  Scenario: Validar "POST" - "/comunicaciones/despachar" sin 'archivosAnexos' y con 'archivosAnexosInfo' valido en JSON comunicacionRequest
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_CON_ARCHIVOS_ANEXOS" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request_con_errorCause"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "El archivo descrito en archivosAnexosInfo no fue adjuntado."

  Scenario Outline: Validar cada campo del JSON 'comunicacionRequest'
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "<body_name>" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación (400 - Validation failure)
      | body_name                                                                              | schema                | campo_error | mensaje_error_esperado |
      | JSON_SIN_CONFIGURACION_DESTINATARIOS                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_DESTINATARIOS_REFERENCIADOS_CONFIGURACION_DESTINATARIOS                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_INFO_VACIO_DESTINATARIOS_REFERENCIADOS_CONFIGURACION_DESTINATARIOS                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_INFO_VACIO_CONFIGURACION_DESTINATARIOS                                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_FOLIO                                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_ID_TIPO_DOCUMENTO_OFICIAL                                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_MATERIA                                                                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_USUARIO_SOLICITANTE                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_RUN_USUARIO_SOLICITANTE                                                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_SIN_DV_USUARIO_SOLICITANTE                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_INFO_VACIO_USUARIO_SOLICITANTE                                                    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

  Scenario Outline: Validar regla de nombre de archivos anexos en el JSON 'comunicacionRequest'
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "<body_name>" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "<archivo_anexo>" como "archivosAnexos"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación (400 - Validation failure)
      | body_name                                | archivo_anexo                                                                                                                                               | schema                | campo_error | mensaje_error_esperado |
      | JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO  | ab.pdf                                                                                                                                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO  | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.pdf | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

  Scenario Outline: Validar tipos de datos en JSON 'comunicacionRequest' (cada campo del JSON)
    Given que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "<body_name>" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | body_name                                                                                 | schema                | campo_error | mensaje_error_esperado |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO                    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL                                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_INTEGER                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_BOOLEAN                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_ARRAY_VACIO                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_ARRAY_CON_DATO                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_OBJECT_VACIO                                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_FOLIO_STRING_A_OBJECT_CON_DATO                                                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_NUMBER                                                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL                                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_BOOLEAN                                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_ARRAY_VACIO                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_ARRAY_CON_DATO                                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_OBJECT_VACIO                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_OBJECT_CON_DATO                                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_VACIA                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_MATERIA_STRING_A_EXCEDE_DATO_LARGO                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_NUMBER                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_NUMBER                                                                    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_STRING_CARACTER_ESPECIAL                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_BOOLEAN                                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_ARRAY_VACIO                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_ARRAY_CON_DATO                                                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_OBJECT                                                                    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_SRING_A_OBJECT_CON_DATO                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_STRING                                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_STRING_CARACTER_ESPECIAL                                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_BOOLEAN                                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_ARRAY_VACIO                                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_ARRAY_CON_DATO                                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_OBJECT                                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_DV_INTEGER_A_OBJECT_CON_DATO                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
