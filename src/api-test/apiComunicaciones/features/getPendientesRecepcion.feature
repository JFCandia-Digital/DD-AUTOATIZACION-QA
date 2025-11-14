@API @Comunicaciones @PendientesRecepcion
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/pendientes-recepcion"
# =================================================================================
# == Pruebas para método GET /comunicaciones/pendientes-recepcion
# =================================================================================

  Scenario: Enviar petición "GET" - "/comunicaciones/pendientes-recepcion" con datos válidos
    Given que realizo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_PENDIENTES_RECEPCION"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/comunicaciones/pendientes-recepcion" con distintos token
    Given que realizo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

   
  Scenario Outline: Validar "GET" - "/pendientes-recepcion" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo                            | valor                | status | estructura                           | campo_error   | mensaje_error_esperado |
      | comunicacionId                   | 0                    | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | abc                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | true                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | 1.5                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | null                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | ' OR 1=1             | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | -999999              | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | 9223372036854775808  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | comunicacionId                   | -9223372036854775808 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionDesde               | 2025-10-05           | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionDesde               | "2025/10/05"         | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionDesde               | abc                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionDesde               | true                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionDesde               | 10:10:00             | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionHasta               | 2025-10-05           | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionHasta               | "2025/10/05"         | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionHasta               | abc                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionHasta               | true                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | fechaCreacionHasta               | 10:10:00             | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | 0                    | 400    | ERROR_400_Bad_Request                | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | abc                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | true                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | 1.5                  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | null                 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | ' OR 1=1             | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | -999999              | 400    | ERROR_400_Bad_Request                | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | 9223372036854775808  | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | -9223372036854775808 | 400    | ERROR_400_Bad_Request_con_errorCause | "message"     | "Petición no válida."  |