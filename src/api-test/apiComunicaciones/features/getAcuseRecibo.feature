@API @Comunicaciones @AcuseRecibo
Feature: Feature: Flujo E2E - Despacho y Acuse de Recibo Multidestinatario

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
    When que proceso las tareas guardadas en "listaArmada"
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
    When que proceso las tareas guardadas en "listaSues"
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
    When que proceso las tareas guardadas en "listaCarabineros"
    Then el estado de la respuesta debe ser 200