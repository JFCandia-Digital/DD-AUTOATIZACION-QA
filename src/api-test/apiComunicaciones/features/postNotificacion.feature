@API @Comunicaciones @Notificacion @Notificacion_OK
Feature: Pruebas realizadas a la API "POST" - "/comunicaciones/despachar-tipo-notificacion"

# =================================================================================
# == Pruebas para método POST /comunicaciones/despachar-tipo-notificacion
# =================================================================================

  Scenario: Validar rechazo de notificación con documento principal sin firma digital
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/despachar-tipo-notificacion" con token "válido"
    And uso el cuerpo de petición llamado "JSON_NOTIFICACION_VALIDO" como campo "comunicacionRequest"
    And adjunto el documento principal sin firma para notificación
    When envío la petición multipart
    Then el estado de la respuesta debe ser 400
    And el cuerpo de la respuesta debe tener la estructura de error "ERROR_400_Bad_Request"
    And el cuerpo de la respuesta debe tener la propiedad "errorCode" con el valor 4001
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor "Error en archivo principal sin firmas externas. El archivo principal debe tener firmas externas para ser marcado como resuelto o firmado."
