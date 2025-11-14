@API @Comunicaciones @BuscarSalientes
Feature: Pruebas realizadas a la API "GET" - "/comunicaciones/buscar-salientes"
# =================================================================================
# == Pruebas para método GET /comunicaciones/buscar-salientes
# =================================================================================


  Scenario Outline: Validar "GET" - "/comunicaciones/buscar-salientes" con distintos token
    Given que realizo una petición "GET" a "/comunicaciones/buscar-salientes" con token "<tipo_auth>"
    Then el estado de la respuesta debe ser <status>
    And el cuerpo de la respuesta debe tener la estructura de error "<estructura>"
    And el cuerpo de la respuesta debe tener la propiedad "error" con el valor <mensaje_error>

    Examples:
      | tipo_auth | status | estructura             | mensaje_error      |
      | inválido  |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | nulo      |    401 | ERROR_401_Unauthorized | "No autorizado."   |
      | expirado  |    401 | ERROR_401_Unauthorized | "Sesión expirada." |