@API @Usuarios
Feature: Pruebas realizadas a la API "GET" - "/usuarios/"
# =================================================================================
# == Pruebas para método GET /usuarios/
# =================================================================================

  Scenario: Enviar petición "GET" - "/usuarios/" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/usuarios/" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_USUARIOS"
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
      | campo                     | valor                | status | estructura                           | campo_error | mensaje_error_esperado |
      | id                        | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id                        | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id                        | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id                        | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id                        |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | id                        |                10:05 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | run                       |                10:05 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | nombre                    |                    1 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      |                    0 |    400 | ERROR_400_Bad_Request                | "message"   | "Petición no válida."  |
      | entidadCodificadorId      | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId      | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId |                    0 |    400 | ERROR_400_Bad_Request                | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadPadreCodificadorId | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | roles                     | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                  | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |

  Scenario Outline: Validar "GET" - "/usuarios/" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/usuarios/" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de éxito "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo  | valor                | status | estructura                     | campo_error | mensaje_error_esperado |
      | id     |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre | null                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre |  9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre | -9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre | 'OR 1=1              |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
