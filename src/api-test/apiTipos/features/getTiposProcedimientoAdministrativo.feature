@API @Tipos @GetTiposProcedimientoAdministrativo
Feature: Pruebas realizadas a la API "GET" - "/tipo/tipos-procedimiento-administrativo/:entidadCodificadorId"
# =================================================================================
# == Pruebas para método GET /tipo/documento
# =================================================================================

  Scenario Outline: Enviar petición "GET" - "/tipo/tipos-procedimiento-administrativo/:entidadCodificadorId" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/tipo/tipos-procedimiento-administrativo/<entidadCodificadorId>" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_DEPENDIENTES"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

    Examples:
      | entidadCodificadorId |
      |                  598 |
      |                  175 |
      |                   27 |

  Scenario Outline: Validar "GET" - "/tipo/tipos-procedimiento-administrativo/:entidadCodificadorId" con distintos token
    Given que realizo una petición "GET" a "/tipo/tipos-procedimiento-administrativo/598" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/tipo/tipos-procedimiento-administrativo/:entidadCodificadorId" campo id con distintos tipos de datos
    Given que realizo una petición "GET" a "/tipo/tipos-procedimiento-administrativo/<tipo_dato>" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | tipo_dato           | status | estructura            | campo_error | mensaje_error_esperado |
      | abc                 |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | true                |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      |                 1.5 |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | null                |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | '                   |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | ' OR 1=1            |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | ';--                |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      |              999999 |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      |             -999999 |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
      | 9223372036854775808 |    400 | ERROR_400_Bad_Request | "message"   | "Petición no válida."  |
