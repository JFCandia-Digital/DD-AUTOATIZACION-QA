@API @Entidades @GetIdentificadoresByCodificadorIds @IdCodificadorVsIdDd
Feature: Pruebas realizadas a la API "GET" - "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=X1,X2,Xn+1"
# =========================================================================================================
# == Pruebas para método GET /entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=X1,X2,Xn+1
# =========================================================================================================

  Scenario: Enviar petición "GET" - "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=X1,X2,Xn+1" con datos válidos
    Given que solicito un token de acceso con el usuario "CLIENT_ID_CARABINEROS" y el password "CLIENT_SECRET_CARABINEROS"
    And que realizo una petición "GET" a "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=156,175" con token "válido"
    Then el estado de la respuesta debe ser 200
    And el cuerpo de la respuesta debe tener la estructura de éxito "JSON_RESPONSE_IDENTIFICADORES_CODIFICADOR_IDS"
    And la propiedad "timestamp" del cuerpo de la respuesta debe ser una fecha y hora actual

  Scenario Outline: Validar "GET" - "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=X1,X2,Xn+1" con distintos token
    Given que realizo una petición "GET" a "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=156,175" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |


  Scenario Outline: Validar "GET" - "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=X1,X2,Xn+1" campo id con distintos tipos de datos
    Given que realizo una petición "GET" a "/entidades/identificadores-by-codificador-ids?id%20EntidadCodificador=<tipo_dato>" con token "válido"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad <campo_error> con el valor <mensaje_error_esperado>

    Examples: Campos que fallan validación
      | tipo_dato                | status | estructura              | campo_error | mensaje_error_esperado |
      # Casos 400: El formato es incorrecto (como los que ya tenías)
      | abc                      | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      | true                     | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      | 1.5                      | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      | null                     | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      # Casos 400: Pruebas de Inyección SQL (deben fallar igual)
      | '                        | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      | ' OR 1=1                 | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      | ';--                     | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
      # Casos 404: El formato es correcto, pero el recurso no existe
      | 9223372036854775808      | 400    | ERROR_400_Bad_Request   | "message"   | "Petición no válida."  |
