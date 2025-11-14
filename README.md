

# Framework de Automatización de API (Doc. Digital)
Este framework está diseñado para la ejecución de pruebas de API de punta a punta (E2E), funcionales y de validación de datos para el proyecto Doc. Digital. Utiliza Cucumber para la definición de escenarios (BDD) y Axios/Playwright para la ejecución de peticiones HTTP y aserciones.

## ⚙️ Tecnologías Principales

* TypeScript
* Cucumber (para BDD)
* Playwright (Asserts) (para el motor de aserciones expect)
* Axios (para realizar las peticiones HTTP a la API)
* DotEnv (para la gestión de variables de entorno)
* ts-node (para la ejecución de TypeScript)
* multiple-cucumber-html-reporter (para la generación de reportes)

## 🚀 Configuración del Entorno

1. **Instalar Dependencias**: Clona el repositorio y ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias:

```Bash
npm install
```
2. **Crear Archivo de Entorno**: Este proyecto es impulsado por variables de entorno. Debes crear un archivo llamado .env.api en la raíz del proyecto. Este archivo es cargado por el hook Before de Cucumber.

Copia y pega el siguiente contenido en el archivo .env.api y complétalo con las credenciales correctas para el ambiente de pruebas:

```Ini, TOML

# URL Base de la API
API_BASEURL=https://middleware.docv3.test.digital.gob.cl/api/v3

# Credenciales Remitente (PDI)
CLIENT_ID_PDI=...
CLIENT_SECRET_PDI=...

# Credenciales Destinatarios (E2E)
CLIENT_ID_ARMADA=...
CLIENT_SECRET_ARMADA=...

CLIENT_ID_SUES=...
CLIENT_SECRET_SUES=...

CLIENT_ID_CARABINEROS=...
CLIENT_SECRET_CARABINEROS=...
```

## 🛠️ Ejecución de Pruebas
Los scripts de ejecución están definidos en package.json y se configuran en cucumber.json.

Ejecutar Todas las Pruebas de API
Este comando ejecuta todos los features que tengan el tag @API.

```Bash
npm run apiTest
```

### Ejecutar por Tags
Puedes ejecutar conjuntos de pruebas más pequeños usando los tags definidos en los archivos .feature:

* **Ejecutar solo el E2E (Acuse de Recibo)**:

```Bash
npm run revision
```
(Este script ejecuta el tag @Revision)

* **Ejecutar solo pruebas de Autenticación**:

```Bash
npm run auth
```
(Este script ejecuta el tag @Auth)

* **Ejecutar por Módulo (ej. Comunicaciones)**:

```Bash
npm run comunicaciones
```
(Este script ejecuta el tag @Comunicaciones)

## 📋 Reportes
**Reporte HTML**

Después de cada ejecución, puedes generar un reporte HTML detallado ejecutando:

```Bash
npm run api-report
```
Esto leerá los archivos JSON de Cucumber y generará un reporte visual en la carpeta /reports.

**Reporte JSON (Acuse de Recibo)**

Para el flujo E2E (getAcuseRecibo.feature ), el step de procesamiento (When que proceso las tareas...) generará reportes JSON personalizados que detallan las acciones (Aceptado/Rechazado) de cada tarea.

Estos archivos se guardan en la ruta definida en constants.ts: ./reports/json-acuse-recibo/

## 🏗️ Arquitectura y Flujos de Prueba
Este framework utiliza un diseño modular para separar responsabilidades.

**Archivos Clave**

* apiClient.ts: Contiene la lógica central de peticiones (ej. sendPutRequest, sendGetRequest). Es el único archivo que interactúa directamente con axios.

* apiContext.ts: Objeto global que mantiene el estado de la prueba. Almacena el token actual, la response de la última petición y un worldData (Map) para pasar datos entre steps (ej. comunicacionId y tareaId).

* utils.ts: Funciones helpers genéricas, como getCredential (para leer el .env) y guardarJsonEnHistoricos (para crear los reportes JSON).

* /schemas y /request: Directorios que contienen los schemas de respuesta (schemas.ts) y los payloads de POST (requestBodies.ts).

* cucumber.json: Define los perfiles de ejecución, especificando qué archivos .feature y .steps.ts debe cargar para cada perfil.

### Patrones de Prueba Implementados
El framework utiliza dos patrones principales para probar endpoints GET:

1. **Patrón Simple (Ejecución Inmediata)**

* **Descripción**: Se usa para endpoints simples sin filtros complejos (ej. GET por ID).
* **Step Clave**: Given que realizo una petición "GET" a "..." con token "...".
* **Implementación**: getComunicacionesId.steps.ts.
* **Features que lo usan**:
  * getComunicacionesId.feature 
  * getTrazabilidad.feature 
  * getDependientes.feature 
  * getPadreFamilia.feature 

2. **Patrón "Builder" (Constructor)**

* **Descripción**: Se usa para endpoints complejos con múltiples parámetros de consulta opcionales. El escenario "construye" la petición en varios pasos.

* **Steps Clave**:

  * Given que preparo una petición "GET" a "..."
  * And con los siguientes parámetros de consulta: (para DataTables)
  * And con el parámetro de consulta ... fijado a ... (para Outlines)
  * When ejecuto la petición GET

* **Implementación**: getPendientesRecepcion.steps.ts.
* **Features que lo usan**:
  * getPendientesRecepcion.feature 
  * getAcuseRecibo.feature 

3. **Flujo E2E (Acuse de Recibo)**

* **Descripción**: El escenario más complejo, definido en getAcuseRecibo.feature, que simula un flujo de negocio completo.

* **Lógica**:
  1. **Paso A**: Se autentica como PDI (Given que solicito...) y despacha un documento a 3 instituciones (When envío la petición multipart).
  2. **Paso B**: Cambia el contexto a ARMADA (When que obtengo un nuevo token...).
  3. **Paso C**: Busca los pendientes de ARMADA (When ejecuto la petición GET) y guarda el result en apiContext.worldData.
  4. **Paso D**: Procesa las tareas (When que proceso las tareas...), aceptando/rechazando aleatoriamente y guardando el reporte JSON.
  5. Repite los Pasos B, C y D para SUES y CARABINEROS.


## Documentation

* [DocDigital V3: MANUAL DE INTEGRACIÓN API MW V 3.5](https://docs.google.com/document/d/1yBGQwdH29olArvYqIgPvQwL_kIfQGnrC8hrTyoNtNbk/edit?tab=t.0#heading=h.8opo4p3kxwmw)
* [Swagger](https://middleware.docv3.test.digital.gob.cl/api/v3/swagger-ui/index.html)
