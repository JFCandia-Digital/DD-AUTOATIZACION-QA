@API @Comunicaciones @BuscarEntrantes
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/buscar-entrantes"
# =================================================================================
# == Pruebas para método GET /comunicaciones/buscar-entrantes
# =================================================================================

  
  Scenario: Enviar petición "GET" - "/comunicaciones/buscar-entrantes" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/comunicaciones/buscar-entrantes" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_BUSCAR_SALIENTES"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/comunicaciones/buscar-entrantes" con distintos token
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/comunicaciones/buscar-entrantes" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/comunicaciones/buscar-entrantes" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/comunicaciones/buscar-entrantes" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo                            | valor                | status | estructura                           | campo_error | mensaje_error_esperado |
      | comunicacionId                   | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | comunicacionId                   | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | comunicacionId                   |                  1.5 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | comunicacionId                   | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | comunicacionId                   | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | comunicacionId                   |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    |                  1.5 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | tipoDocumento                    | -9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | estado                           |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | estado                           | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | estado                           | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | estado                           | aceptado             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         |                    0 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         |                  1.5 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         |              -999999 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageSize                         | -9223372036854775809 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       |                  1.5 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       |              -999999 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | pageNumber                       | -9223372036854775809 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId |                    0 |    400 | ERROR_400_Bad_Request                | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | abc                  |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | true                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId |                  1.5 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | null                 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | ' OR 1=1             |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId |              -999999 |    400 | ERROR_400_Bad_Request                | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId |  9223372036854775808 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |
      | entidadDespachadoraCodificadorId | -9223372036854775809 |    400 | ERROR_400_Bad_Request_con_errorCause | "message"   | "Petición no válida."  |

  Scenario Outline: Validar "GET" - "/comunicaciones/buscar-entrantes" con datos invalidos en cada parámetros de forma unitaria
    Given que preparo una petición "GET" a "/comunicaciones/buscar-entrantes" con token "válido"
    And con el parámetro de consulta <campo> fijado a <valor>
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de éxito "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples:
      | campo                               | valor                | status | estructura                     | campo_error | mensaje_error_esperado |
      | comunicacionId                      |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | comunicacionId                      |              -999999 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | comunicacionId                      | -9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | folio                               |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | folio                               | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | folio                               | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | folio                               | null                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | materia                             | null                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | materia                             |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | materia                             | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | materia                             | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | tipoDocumento                       |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | tipoDocumento                       |              -999999 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  |           2025-10-05 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | "2025/10/05"         |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  |             10:10:00 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  |           2025-10-05 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | "2025/10/05"         |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  |             10:10:00 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | pageNumber                          |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  |           2025-01-01 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  | false                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoDesde                  | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  |           2025-11-21 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  | false                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaDespachoHasta                  | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  |           2025-11-21 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | false                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionDesde                  | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  |           2025-11-21 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | false                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | fechaCreacionHasta                  | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | {1}                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | {abc}                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | ["1"]                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesCreadorasCodificadorId     | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | {1}                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | {abc}                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | ["1"]                |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadesDespachadorasCodificadorId | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    | true                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    | abc                  |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    |                    0 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    |                  1.5 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    | null                 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    | ' OR 1=1             |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    |              -999999 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    |  9223372036854775808 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
      | entidadDestinatariaCodificadorId    | -9223372036854775809 |    200 | JSON_RESPONSE_RESULT_SIN_DATOS | "result"    | []                     |
