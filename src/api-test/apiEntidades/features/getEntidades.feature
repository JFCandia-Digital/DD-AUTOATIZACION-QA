@API @Entidades @GetEntidades @Revision
Feature: Pruebas realizadas a la API "GET" - "/entidades/"
# =================================================================================
# == Pruebas para método GET /entidades/
# =================================================================================
  
  Scenario: Enviar petición "GET" - "/entidades/" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/entidades/" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_ENTIDADES"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/entidades/" con distintos token
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/entidades/" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/entidades/" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/entidades/" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo                           | valor                | status | estructura                           | campo_error | mensaje_error_esperado |
      | entidadCodificadorId            | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId            | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId            | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId            | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId            |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadCodificadorId            | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDependenciaCodificadorId | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | isActiva                        | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | isActiva                        |                10:05 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | nombre                          |                    1 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                        | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      | 'OR 1=1              |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                      | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |

  Scenario Outline: Validar "GET" - "/entidades/" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/entidades/" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de éxito "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo                           | valor                | status | estructura                     | campo_error | mensaje_error_esperado |
      | entidadCodificadorId            |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDependenciaCodificadorId |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | isActiva                        |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          | null                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          |  9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          | -9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | nombre                          | 'OR 1=1              |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
