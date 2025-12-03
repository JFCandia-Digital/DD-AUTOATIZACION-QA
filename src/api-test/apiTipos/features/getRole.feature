@API @Tipos @GetRole
Feature: Pruebas realizadas a la API "GET" - "/tipo/role"
# =================================================================================
# == Pruebas para método GET /tipo/role
# =================================================================================

  Scenario: Enviar petición "GET" - "/tipo/role" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/tipo/role" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_ROL"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/tipo/role" con distintos token
    Given que realizo una petición "GET" a "/tipo/role" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |
