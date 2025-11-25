@API @Comunicaciones @BuscarEntrantes
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/buscar-entrantes"
# =================================================================================
# == Pruebas para método GET /comunicaciones/buscar-entrantes
# =================================================================================

  @Revision
  Scenario: Enviar petición "GET" - "/comunicaciones/buscar-entrantes" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/comunicaciones/buscar-entrantes" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_BUSCAR_SALIENTES"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual