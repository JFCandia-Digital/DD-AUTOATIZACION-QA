@API @Comunicaciones @GetArchivoContenido @Revision
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/archivo-contenido/:comunicacion_id/:archivo_uuid"

  Scenario: Obtener contenido del documento principal y anexos usando IDs dinámicos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que realizo una petición "GET" a "/comunicaciones/86768" con token "válido"
    Then el estado de la respuesta debe ser 200
    When ejecuto peticiones "GET" a "/comunicaciones/archivo-contenido/:comunicacionId/:archivoId" para el documento principal y sus anexos
    Then el estado de la respuesta debe ser 200

  Scenario Outline: Validar seguridad del endpoint con distintos tokens
    Given que realizo una petición "GET" a "/comunicaciones/archivo-contenido/86066/3b617cc6-c8c3-4a0e-9c8c-284e7a4ea4f1" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "GET" - "/comunicaciones/archivo-contenido/:comunicacion_id/:archivo_uuid" campo comunicacionId con distintos tipos de datos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    Given que realizo una petición "GET" a "/comunicaciones/archivo-contenido/<comunicacion_id>/3b617cc6-c8c3-4a0e-9c8c-284e7a4ea4f1" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | comunicacion_id     | status | estructura                         | campo_error | mensaje_error_esperado    |
      | abc                 |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      | true                |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      |                 1.5 |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      | null                |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      | '                   |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      | ' OR 1=1            |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      | ';--                |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |
      |              999999 |    404 | ERROR_404_Not_Found_con_errorCause | "message"   | "Registro no encontrado." |
      |             -999999 |    404 | ERROR_404_Not_Found_con_errorCause | "message"   | "Registro no encontrado." |
      | 9223372036854775808 |    400 | ERROR_400_Bad_Request              | "message"   | "Petición no válida."     |

  Scenario Outline: Validar "GET" - "/comunicaciones/archivo-contenido/:comunicacion_id/:archivo_uuid" campo archivo_uuid con distintos tipos de datos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    Given que realizo una petición "GET" a "/comunicaciones/archivo-contenido/86066/<archivo_uuid>" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | archivo_uuid        | status | estructura            | campo_error | mensaje_error_esperado |
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
