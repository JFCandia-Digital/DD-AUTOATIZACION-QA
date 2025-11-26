@API @Comunicaciones @AcuseRecibo
Feature: Pruebas realizadas a la API "PUT" - "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"

  Scenario Outline: Validar "PUT" - "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo" con distintos token
    Given que ejecuto una petición "PUT" a "/comunicaciones/1/recepcion/1/acuse-recibo" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |

  Scenario Outline: Validar "PUT" - "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo" campo comunicacionId con distintos tipos de datos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que ejecuto una petición "PUT" a "/comunicaciones/<tipo_dato>/recepcion/1/acuse-recibo" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | tipo_dato           | status | estructura                           | campo_error | mensaje_error_esperado        |
      | abc                 | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | true                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | 1.5                 | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | null                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | '                   | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | ' OR 1=1            | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | ';--                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | 999999              | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | -999999             | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | 9223372036854775808 | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |

  Scenario Outline: Validar "PUT" - "/comunicaciones/:id/recepcion/:tareaId/acuse-recibo" campo tareaId con distintos tipos de datos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que ejecuto una petición "PUT" a "/comunicaciones/1/recepcion/<tipo_dato>/acuse-recibo" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | tipo_dato           | status | estructura                           | campo_error | mensaje_error_esperado        |
      | abc                 | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | true                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | 1.5                 | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | null                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | '                   | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | ' OR 1=1            | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | ';--                | 400    | ERROR_400_Bad_Request                | "message"   | "Petición no válida."         |
      | 999999              | 404    | ERROR_404_Not_Found_con_errorCause   | "message"   | "Registro no encontrado."     |
      | -999999             | 404    | ERROR_404_Not_Found_con_errorCause   | "message"   | "Registro no encontrado."     |

  Scenario: PDI despacha y todas las instituciones procesan sus pendientes
    
    # --- PASO A: DESPACHAR (Como PDI, a 3 instituciones) ---
    Given que solicito un token de acceso con el usuario "CLIENT_ID_PDI" y el password "CLIENT_SECRET_PDI"
    And que preparo una petición "POST" a "/comunicaciones/despachar" con token "válido"
    And uso el cuerpo de petición llamado "JSON_MINIMO_VALIDO" como campo "comunicacionRequest"
    And adjunto un archivo valido "2_FIRMANTES_EN_DOC_DIGITAL.pdf" como "documentoPrincipal"
    When envío la petición multipart
    Then el estado de la respuesta debe ser 200

    # --- FLUJO ARMADA ---
    When que obtengo un nuevo token de acceso con el usuario "CLIENT_ID_ARMADA" y el password "CLIENT_SECRET_ARMADA"
    Then el estado de la respuesta debe ser 200
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    # Filtramos por la materia para encontrar solo la que acabamos de enviar
    And con los siguientes parámetros de consulta:
      | parametro | valor              |
      | materia   | "AUT-materia-TEST" |
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser 200
    And guardo el valor de la propiedad "result" como "listaArmada" en el contexto
    When que proceso las tareas guardadas en "listaArmada" en el metodo PUT "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"
    Then el estado de la respuesta debe ser 200

    # --- FLUJO SUES ---
    When que obtengo un nuevo token de acceso con el usuario "CLIENT_ID_SUES" y el password "CLIENT_SECRET_SUES"
    Then el estado de la respuesta debe ser 200
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    And con los siguientes parámetros de consulta:
      | parametro | valor              |
      | materia   | "AUT-materia-TEST" |
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser 200
    And guardo el valor de la propiedad "result" como "listaSues" en el contexto
    When que proceso las tareas guardadas en "listaSues" en el metodo PUT "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"
    Then el estado de la respuesta debe ser 200

    # --- FLUJO CARABINEROS ---
    When que obtengo un nuevo token de acceso con el usuario "CLIENT_ID_CARABINEROS" y el password "CLIENT_SECRET_CARABINEROS"
    Then el estado de la respuesta debe ser 200
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    And con los siguientes parámetros de consulta:
      | parametro | valor              |
      | materia   | "AUT-materia-TEST" |
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser 200
    And guardo el valor de la propiedad "result" como "listaCarabineros" en el contexto
    When que proceso las tareas guardadas en "listaCarabineros" en el metodo PUT "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"
    Then el estado de la respuesta debe ser 200

    # --- FLUJO SEGEPRES ---
    When que obtengo un nuevo token de acceso con el usuario "CLIENT_ID_SEGEPRES" y el password "CLIENT_SECRET_SEGEPRES"
    Then el estado de la respuesta debe ser 200
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    And con los siguientes parámetros de consulta:
      | parametro | valor              |
      | materia   | "AUT-materia-TEST" |
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser 200
    And guardo el valor de la propiedad "result" como "listaSEGEPRES" en el contexto
    When que proceso las tareas guardadas en "listaSEGEPRES" en el metodo PUT "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"
    Then el estado de la respuesta debe ser 200

    # --- FLUJO CNE ---
    When que obtengo un nuevo token de acceso con el usuario "CLIENT_ID_CNE" y el password "CLIENT_SECRET_CNE"
    Then el estado de la respuesta debe ser 200
    Given que preparo una petición "GET" a "/comunicaciones/pendientes-recepcion" con token "válido"
    And con los siguientes parámetros de consulta:
      | parametro | valor              |
      | materia   | "AUT-materia-TEST" |
    When ejecuto la petición GET
    Then el estado de la respuesta debe ser 200
    And guardo el valor de la propiedad "result" como "listaCNE" en el contexto
    When que proceso las tareas guardadas en "listaCNE" en el metodo PUT "/comunicaciones/:comunicacionId/recepcion/:tareaId/acuse-recibo"
    Then el estado de la respuesta debe ser 200