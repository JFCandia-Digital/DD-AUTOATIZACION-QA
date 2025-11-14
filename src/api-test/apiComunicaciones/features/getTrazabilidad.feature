@API @Comunicaciones @Trazabilidad
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/:comunicacionId/trazabilidad"
# =================================================================================
# == Pruebas para método GET /comunicaciones/:comunicacionId/trazabilidad
# =================================================================================

  Scenario: Enviar petición "GET" - "/comunicaciones/:comunicacionId/trazabilidad" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/comunicaciones/1/trazabilidad" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_GET_TRAZABILIDAD"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/comunicaciones/:comunicacionId/trazabilidad" con distintos token
    Given que realizo una petición "GET" a "/comunicaciones/1/trazabilidad" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/comunicaciones/:comunicacionId/trazabilidad" campo id con distintos tipos de datos
    Given que realizo una petición "GET" a "/comunicaciones/<tipo_dato>/trazabilidad" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | tipo_dato                | status | estructura                         | campo_error | mensaje_error_esperado        |         
      | abc                      | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | true                     | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | 1.5                      | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | null                     | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |           
      | '                        | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | ' OR 1=1                 | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | ';--                     | 400    | ERROR_400_Bad_Request              | "message"   | "Petición no válida."         |
      | 999999                   | 404    | ERROR_404_Not_Found_con_errorCause | "message"   | "Registro no encontrado."     |
      | -999999                  | 404    | ERROR_404_Not_Found_con_errorCause | "message"   | "Registro no encontrado."     |
      | 9223372036854775808      | 404    | ERROR_404_Not_Found_con_errorCause | "message"   | "Comunicación no encontrada." |
