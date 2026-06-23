@API @Comunicaciones @Notificacion @Notificacion_OK
Feature: Pruebas realizadas a la API "POST" - "/comunicaciones/despachar-tipo-notificacion"

# =================================================================================
# == Pruebas para método POST /comunicaciones/despachar-tipo-notificacion
# =================================================================================

  Background:
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"

  @Notificacion_SinFirma
  Scenario: Validar rechazo de notificación con documento principal sin firma digital
    Given que preparo una petición "POST" a "/comunicaciones/despachar-tipo-notificacion" con token "válido"
    And uso el cuerpo de petición llamado "JSON_NOTIFICACION_VALIDO" como campo "comunicacionRequest"
    And adjunto el documento principal sin firma para notificación
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "errorCode" con el valor 4001
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "Error en archivo principal sin firmas externas. El archivo principal debe tener firmas externas para ser marcado como resuelto o firmado."

  @Notificacion_CamposPA
  Scenario Outline: Validar campos obligatorios PA en notificación
    Given que preparo una petición "POST" a "/comunicaciones/despachar-tipo-notificacion" con token "válido"
    And uso el cuerpo de petición llamado "<body_name>" como campo "comunicacionRequest"
    And adjunto el documento principal sin firma para notificación
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "errorCode" con el valor 40000
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error_esperado>

    Examples: Campos obligatorios PA (400 - Validation failure)
      | body_name                                         | mensaje_error_esperado                              |
      | JSON_NOTIFICACION_SIN_DESTINATARIOS                 | "Se requiere al menos una entidad destinataria"     |
      | JSON_NOTIFICACION_SIN_CONFIGURACION_DESTINATARIOS   | "configuracionDestinatarios es obligatorio"       |
      | JSON_NOTIFICACION_SIN_USUARIO_SOLICITANTE           | "Usuario solicitante es obligatorio"              |
      | JSON_NOTIFICACION_SIN_RUN_USUARIO_SOLICITANTE       | "RUN del usuario es obligatorio"                    |
      | JSON_NOTIFICACION_SIN_DV_USUARIO_SOLICITANTE        | "Digito verificador del RUN es obligatorio"         |
      | JSON_NOTIFICACION_SIN_TIPO_PROCEDIMIENTO            | "tipoProcedimientoAdministrativo es obligatorio"    |

  # Con PDF sin firma, si el JSON es válido el API valida firma (4001) antes que dependientes.
  # Cuando exista PDF firmado, reforzar este escenario con el mensaje de negocio de dependientes.
  @Notificacion_Dependientes
  Scenario: Validar rechazo de notificación con destinatario no dependiente de la entidad despachadora
    Given que preparo una petición "POST" a "/comunicaciones/despachar-tipo-notificacion" con token "válido"
    And uso el cuerpo de petición llamado "JSON_NOTIFICACION_DESTINATARIO_NO_DEPENDIENTE" como campo "comunicacionRequest"
    And adjunto el documento principal sin firma para notificación
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "errorCode" con el valor 4001
