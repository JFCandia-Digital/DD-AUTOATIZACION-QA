@API @Usuarios
Feature: Pruebas realizadas a la API "GET" - "/usuarios/"
# =================================================================================
# == Pruebas para método GET /comunicaciones/buscar-entrantes
# =================================================================================

  @Revision
  Scenario: Enviar petición "GET" - "/usuarios/" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/usuarios/" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_USUARIOS_ENTIDAD"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/usuarios/" con distintos token
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/usuarios/" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/usuarios/" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/usuarios/" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo | valor | status | estructura                           | campo_error | mensaje_error_esperado |
      | id    | abc   |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id    | true  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id    | null  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
