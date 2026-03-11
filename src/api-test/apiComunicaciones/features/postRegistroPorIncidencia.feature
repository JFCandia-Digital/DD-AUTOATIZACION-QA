@API @Comunicaciones @RegistroPorIncidencia
Feature: Pruebas realizadas a la API "POST" - "/comunicaciones/registro-por-incidencia"
# =================================================================================
# == Pruebas para método POST /comunicaciones/registro-por-incidencia
# =================================================================================

  Scenario: Enviar petición "POST" - "/comunicaciones/registro-por-incidencia" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_VALIDO_RI_CON_ANEXOS" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "Firmado_por_ecert.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    And adjunto un archivo valido "MINVU.pdf" como "archivosAnexos"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_REGISTRO_INCIDENCIA"
    And la propiedad "result.fechaDespacho" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "POST" - "/comunicaciones/registro-por-incidencia" con datos válidos y distintos token
    Given que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "<tipo_auth>"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con datos mínimos definido por el Swagger (Campos Opcionales Omitidos)
    Given que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_REGISTRO_INCIDENCIA"

  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con 'archivosAnexos' valido y sin 'archivosAnexosInfo' en JSON registroComunicacionIncidenciaRequest
    Given que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "La información asociada archivos anexos es obligatoria."

  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con 'archivosAnexos' valido y sin datos en 'archivosAnexosInfo' en JSON registroComunicacionIncidenciaRequest
    Given que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_VALIDO_RI_CON_ANEXOS_VACIOS" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "ACEPTA.pdf" como "archivosAnexos"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "La información asociada archivos anexos debe coincidir con la cantidad de archivos anexos enviados."

  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" sin 'archivosAnexos' y con 'archivosAnexosInfo' valido en JSON registroComunicacionIncidenciaRequest
    Given que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_VALIDO_RI_CON_ANEXOS" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "No se adjuntó un archivo anexo para la información proporcionada en archivosAnexosInfo."

  Scenario Outline: Validar cada campo del JSON 'registroComunicacionIncidenciaRequest'
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<body_name>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación (400 - Validation failure)
      | body_name                                                                                       | schema                | campo_error | mensaje_error_esperado |
      | JSON_RI_SIN_CONFIGURACION_DESTINATARIOS                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY                                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_FECHA_HORA_DESPACHO_EXTERNO                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_MATERIA                                                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_ID_TIPO_DOCUMENTO_OFICIAL                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_FOLIO                                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_USUARIO_SOLICITANTE                                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_RUN_USUARIO_SOLICITANTE                                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_SIN_DV_USUARIO_SOLICITANTE                                                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_INFO_VACIO_USUARIO_SOLICITANTE_OBJ                                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

  Scenario Outline: Validar regla de nombre de archivos anexos en el JSON 'registroComunicacionIncidenciaRequest'
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<body_name>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    And adjunto un archivo valido "<archivo_anexo>" como "archivosAnexos"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación (400 - Validation failure)
      | body_name                                  | archivo_anexo                                                                                                                                               | schema                | campo_error | mensaje_error_esperado |
      | JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RI | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.pdf | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

  Scenario Outline: Validar tipos de datos en JSON 'registroComunicacionIncidenciaRequest' (cada campo del JSON)
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<body_name>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | body_name                                                                                    | schema                | campo_error | mensaje_error_esperado |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO                    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FOLIO_STRING_A_ARRAY_VACIO                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FOLIO_STRING_A_ARRAY_CON_DATO                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FOLIO_STRING_A_OBJECT_VACIO                                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FOLIO_STRING_A_OBJECT_CON_DATO                                                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_ARRAY_VACIO                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_ARRAY_CON_DATO                                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_OBJECT_VACIO                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_OBJECT_CON_DATO                                                     | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_VACIA                                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_MATERIA_STRING_A_EXCEDE_DATO_LARGO                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_STRING                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_NUMBER                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_STRING_CARACTER_ESPECIAL                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_BOOLEAN                                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_ARRAY_VACIO                                                              | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_ARRAY_CON_DATO                                                           | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_OBJECT                                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_DV_STRING_A_OBJECT_CON_DATO                                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_BOOLEAN                                                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_ARRAY_VACIO                                                            | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_ARRAY_CON_DATO                                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_OBJECT                                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_RUN_INTEGER_A_OBJECT_CON_DATO                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_NUMBER                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_STRING_CARACTER_ESPECIAL                                      | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_BOOLEAN                                                       | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_ARRAY_VACIO                                                   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_ARRAY_CON_DATO                                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_OBJECT                                                        | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_STRING_A_OBJECT_CON_DATO                                               | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_STRING                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_STRING_CARACTER_ESPECIAL                                | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_BOOLEAN                                                 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_VACIO                                             | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_CON_DATO                                          | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT                                                  | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT_CON_DATO                                         | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

  Scenario Outline: Validar tipos de datos en JSON 'registroComunicacionExternaRequest' (cada campo del JSON)
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-externo" con token "válido"
    And uso el cuerpo de registro externo llamado "<body_name>" como campo "registroComunicacionExternaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo> con el valor <mensaje_esperado>

    Examples:
      | body_name                                                               | schema                            | campo     | mensaje_esperado |
      | JSON_RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS       | JSON_RESPONSE_REGISTRO_INCIDENCIA | "message" | "OK"             |
      | JSON_RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY | JSON_RESPONSE_REGISTRO_INCIDENCIA | "message" | "OK"             |
# =================================================================================
# == Pruebas de formato inválido para fechaHoraDespachoExterno (Registro por Incidencia)
# =================================================================================

  @FormatoFechaRI
  Scenario Outline: Validar formato del campo "fechaHoraDespachoExterno" en JSON 'registroComunicacionIncidenciaRequest'
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<body_name>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "<schema>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Formatos de fecha incompletos (solo fecha o solo hora)
      | body_name                          | schema                | campo_error | mensaje_error_esperado |
      | JSON_RI_FECHA_HORA_DE_SOLO_FECHA   | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | JSON_RI_FECHA_HORA_DE_SOLO_HORA    | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |

# =================================================================================
# == Pruebas de fecha de despacho externo con días anteriores (Registro por Incidencia)
# =================================================================================

  @FechaAnteriorPosteriorRI
  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraDespachoExterno de 1 día anterior
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_REGISTRO_INCIDENCIA"

  @FechaAnteriorPosteriorRI
  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraDespachoExterno de 2 días anteriores
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_REGISTRO_INCIDENCIA"
# =================================================================================
# == Pruebas de fecha de despacho externo con días posteriores (Registro por Incidencia)
# =================================================================================

  @FechaAnteriorPosteriorRI
  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraDespachoExterno de 1 día posterior
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"

  @FechaAnteriorPosteriorRI
  Scenario: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraDespachoExterno de 2 días posteriores
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
# =================================================================================
# == Pruebas de fechaHoraRecepcion (Registro por Incidencia)
# =================================================================================

  @FechaRecepcion
  Scenario Outline: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraRecepcion en diferentes offset de fechas
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<requestBody>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser <statusCode>
    And el cuerpo de la respuesta debe tener la estructura de <resultType> "<resultStructure>"

    Examples: Scenarios con 1 día anterior
      | offsetFecha | tipoRecepcion | requestBody                                             | statusCode | resultType | resultStructure                   |
      |      -1 día | IGUAL         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_IGUAL |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |      -1 día | MAYOR         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MAYOR |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |      -1 día | MENOR         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MENOR |        400 | error      | ERROR_400_Bad_Request             |

    Examples: Scenarios con 2 días anteriores
      | offsetFecha | tipoRecepcion | requestBody                                              | statusCode | resultType | resultStructure                   |
      |     -2 días | IGUAL         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_IGUAL |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |     -2 días | MAYOR         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MAYOR |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |     -2 días | MENOR         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MENOR |        400 | error      | ERROR_400_Bad_Request             |

    Examples: Scenarios con 1 día posterior (rechazados)
      | offsetFecha | tipoRecepcion | requestBody                                           | statusCode | resultType | resultStructure       |
      |      +1 día | IGUAL         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_IGUAL |        400 | error      | ERROR_400_Bad_Request |
      |      +1 día | MAYOR         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MAYOR |        400 | error      | ERROR_400_Bad_Request |
      |      +1 día | MENOR         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MENOR |        400 | error      | ERROR_400_Bad_Request |

    Examples: Scenarios con 2 días posteriores (rechazados)
      | offsetFecha | tipoRecepcion | requestBody                                            | statusCode | resultType | resultStructure       |
      |     +2 días | IGUAL         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_IGUAL |        400 | error      | ERROR_400_Bad_Request |
      |     +2 días | MAYOR         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MAYOR |        400 | error      | ERROR_400_Bad_Request |
      |     +2 días | MENOR         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MENOR |        400 | error      | ERROR_400_Bad_Request |

# =================================================================================
# == Pruebas de fechaHoraRecepcion distintas por destinatario (Registro por Incidencia)
# =================================================================================

  @FechaRecepcionDistintas
  Scenario Outline: Validar "POST" - "/comunicaciones/registro-por-incidencia" con fechaHoraRecepcion distintas por destinatario
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/registro-por-incidencia" con token "válido"
    And uso el cuerpo de registro externo llamado "<requestBody>" como campo "registroComunicacionIncidenciaRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart de registro externo
    Then el estado de la respuesta debe ser <statusCode>
    And el cuerpo de la respuesta debe tener la estructura de <resultType> "<resultStructure>"

    Examples: Scenarios con 1 día anterior
      | offsetFecha | descripcion                                               | requestBody                                                              | statusCode | resultType | resultStructure                   |
      |      -1 día | distintas válidas (mezcla IGUAL y MAYOR por destinatario) | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_VALIDAS      |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |      -1 día | distintas con inválida (MENOR en un destinatario)         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA |        400 | error      | ERROR_400_Bad_Request             |

    Examples: Scenarios con 2 días anteriores
      | offsetFecha | descripcion                                               | requestBody                                                               | statusCode | resultType | resultStructure                   |
      |     -2 días | distintas válidas (mezcla IGUAL y MAYOR por destinatario) | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS      |        200 | éxito      | JSON_RESPONSE_REGISTRO_INCIDENCIA |
      |     -2 días | distintas con inválida (MENOR en un destinatario)         | JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA |        400 | error      | ERROR_400_Bad_Request             |

    Examples: Scenarios con 1 día posterior (rechazados por fecha futura)
      | offsetFecha | descripcion                                               | requestBody                                                              | statusCode | resultType | resultStructure       |
      |      +1 día | distintas válidas (mezcla IGUAL y MAYOR por destinatario) | JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_VALIDAS        |        400 | error      | ERROR_400_Bad_Request |
      |      +1 día | distintas con inválida (MENOR en un destinatario)         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA   |        400 | error      | ERROR_400_Bad_Request |

    Examples: Scenarios con 2 días posteriores (rechazados por fecha futura)
      | offsetFecha | descripcion                                               | requestBody                                                               | statusCode | resultType | resultStructure       |
      |     +2 días | distintas válidas (mezcla IGUAL y MAYOR por destinatario) | JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS        |        400 | error      | ERROR_400_Bad_Request |
      |     +2 días | distintas con inválida (MENOR en un destinatario)         | JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA   |        400 | error      | ERROR_400_Bad_Request |
