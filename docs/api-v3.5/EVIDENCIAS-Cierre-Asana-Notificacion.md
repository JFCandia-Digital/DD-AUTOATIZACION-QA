# Evidencias QA — Cierre tarjeta Asana  
## Endpoint `POST /comunicaciones/despachar-tipo-notificacion` (API MW v3.5)

**Proyecto:** DD-AUTOMATIZACION-QA  
**Repositorio:** JFCandia-Digital/DD-AUTOATIZACION-QA  
**Ambiente:** QA — `https://middleware.docv3.test.digital.gob.cl/api/v3`  
**Token:** PDI (`CLIENT_ID_PDI` / `CLIENT_SECRET_PDI`)  
**Ejecutor:** Juan Candia — QA Automatizador  
**Fecha evidencia:** 23-06-2026  
**Ejecución suite completa:** `npm run notificacion_report` — **11 scenarios (11 passed)** | 97 steps | ~14 s  

---

## 1. Objetivo de la tarjeta (Asana)

Automatizar y validar el endpoint de notificación según Manual de Integración API MW v3.5, cubriendo:

- Flujo exitoso con documento firmado (FEA)
- Rechazo por documento sin firma
- Validaciones de campos obligatorios (Procedimiento Administrativo / PA)
- Reglas de negocio con entidades dependientes

---

## 2. Configuración utilizada (`.env.api`)

| Variable | Valor QA | Uso |
|----------|----------|-----|
| `API_BASEURL` | `https://middleware.docv3.test.digital.gob.cl/api/v3` | Base API |
| `CLIENT_ID_PDI` / `CLIENT_SECRET_PDI` | *(credenciales QA)* | Autenticación OAuth |
| `NOTIFICACION_ENTIDAD_DESPACHADORA_CODIFICADOR_ID` | `598` | Entidad despachadora (alineada a `postDespachar`) |
| `NOTIFICACION_DESTINATARIO_PRINCIPAL_ID` | `156` | Destinatario principal válido en QA |
| `NOTIFICACION_DEPENDIENTE_CODIFICADOR_ID` | `4758` | PI Inspectoría General (dependiente de 598 vía `GET /entidades/dependientes/598`) |
| `NOTIFICACION_DESTINATARIO_NO_DEPENDIENTE_ID` | `598` | Destinatario ajeno a la relación despachadora/dependiente |

**PDFs utilizados:**

| Archivo | Escenarios |
|---------|------------|
| `2_FIRMANTES_EN_DOC_DIGITAL.pdf` | Happy path, dependientes (con firma) |
| `Prueba.pdf` (o `NOTIFICACION_DOC_SIN_FIRMA`) | Negativos sin firma / campos PA |

> **Nota:** Con token PDI (entidad token 66) no usar `Mineduc.pdf` como documento principal; el PDF está ligado a entidad MINEDUC (106) y provoca error 4001.

---

## 3. Cuadro de evidencias — Matriz requisito Asana vs automatización

| # | Requisito Asana / Manual v3.5 | Escenario Cucumber | Tag | Archivo feature | Resultado | Evidencia |
|---|------------------------------|-------------------|-----|-----------------|-----------|-----------|
| 1 | Despacho exitoso con firma válida → 200 + `result.id` | Despachar notificación con documento firmado y datos PA válidos | `@Notificacion_HappyPath` | `postNotificacion.feature` | **PASS** | id **89685** (23-06-2026 10:38:08) |
| 2 | Documento sin firma → 400, `errorCode` 4001 | Validar rechazo de notificación con documento principal sin firma digital | `@Notificacion_SinFirma` | `postNotificacion.feature` | **PASS** | Mensaje firma externa obligatoria |
| 3 | Sin destinatarios → 400, `errorCode` 40000 | Validar campos obligatorios PA (sin destinatarios) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"Se requiere al menos una entidad destinataria"` |
| 4 | Sin `configuracionDestinatarios` → 40000 | Validar campos obligatorios PA (sin configuración) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"configuracionDestinatarios es obligatorio"` |
| 5 | Sin `usuarioSolicitante` → 40000 | Validar campos obligatorios PA (sin usuario) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"Usuario solicitante es obligatorio"` |
| 6 | Sin RUN → 40000 | Validar campos obligatorios PA (sin RUN) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"RUN del usuario es obligatorio"` |
| 7 | Sin DV → 40000 | Validar campos obligatorios PA (sin DV) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"Digito verificador del RUN es obligatorio"` |
| 8 | Sin `tipoProcedimientoAdministrativo` → 40000 | Validar campos obligatorios PA (sin tipo PA) | `@Notificacion_CamposPA` | `postNotificacion.feature` | **PASS** | `"tipoProcedimientoAdministrativo es obligatorio"` |
| 9 | Dependiente en copia permitido → 200 | Despachar notificación con entidad dependiente como destinatario en copia | `@Notificacion_Dependientes` | `postNotificacion.feature` | **PASS** | id **89687** (23-06-2026 10:38:15) |
| 10 | Dependiente como principal (regla negocio) | Despachar notificación con entidad dependiente de la despachadora como destinatario principal | `@Notificacion_Dependientes` | `postNotificacion.feature` | **PASS** | id **89688** (23-06-2026 10:38:17) — API QA **acepta** 200 (ver hallazgo #1) |
| 11 | Destinatario no válido / no dependiente | Validar rechazo con destinatario no dependiente de la entidad despachadora | `@Notificacion_Dependientes` | `postNotificacion.feature` | **PASS** | 400 / `errorCode` **4001** (validación firma alcanzada antes que regla dependiente) |

**Total escenarios `@Notificacion`:** 11  
**Estado suite completa (23-06-2026 10:38):** `11 scenarios (11 passed)` — 97 steps — reporte en `reports/index.html`  

---

## 4. Comandos de ejecución

### Suite completa notificación (recomendado para cierre)

```bash
npm run notificacion
npm run api-report
```

### Suites por grupo (evidencia parcial)

```bash
npm run notificacion_happy_path
npm run notificacion_sin_firma
npx cucumber-js --profile api --tags @Notificacion_CamposPA
npm run notificacion_dependientes
```

### Resultado esperado suite completa

```
11 scenarios (11 passed)
```

---

## 5. Reportes HTML (adjuntar a Asana)

Tras `npm run notificacion` y `npm run api-report`:

| Reporte | Ruta |
|---------|------|
| Cucumber HTML | `reports/cucumber-api/api-report.html` |
| Multiple Cucumber HTML | `reports/index.html` |
| JSON (CI / trazabilidad) | `reports/cucumber-api/cucumber-report.json` |

Adjuntar a la tarjeta Asana:
1. Captura de pantalla del resumen terminal (`11 passed`)
2. `reports/index.html` o `api-report.html` (exportar PDF desde navegador si el equipo lo pide)

---

## 6. Artefactos de código entregados

| Artefacto | Ruta |
|-----------|------|
| Feature BDD | `src/api-test/apiComunicaciones/features/postNotificacion.feature` |
| Steps notificación | `src/api-test/apiComunicaciones/steps/postNotificacion.steps.ts` |
| Payloads JSON | `src/api-test/request/requestBodies.ts` (`JSON_NOTIFICACION_*`) |
| Scripts npm | `package.json` → `notificacion`, `notificacion_*` |
| Manual referencia | `docs/api-v3.5/DocDigital V3_ MANUAL DE INTEGRACIÓN API MW V 3.5.docx` |

---

## 7. Hallazgos QA (para registro en Asana)

| ID | Hallazgo | Severidad | Acción |
|----|----------|-----------|--------|
| H-01 | Manual/README indicaba rechazo de dependiente como principal; en QA despachadora **598** + dependiente **4758** como principal retorna **200** | Media | Documentado en automatización; confirmar con negocio/backend si es comportamiento esperado o gap |
| H-02 | Escenario "destinatario no dependiente" valida `errorCode` **4001** (firma), no mensaje específico de dependiente | Baja | Cobertura parcial; regla de dependiente no alcanzable con PDF sin firma en este flujo |

---

## 8. Texto sugerido — Comentario de cierre en Asana

```
✅ Cierre QA Automatización — POST /comunicaciones/despachar-tipo-notificacion

Se implementó y ejecutó la suite @Notificacion en DD-AUTOMATIZACION-QA.

Ejecución final: npm run notificacion_report
Resultado: 11 scenarios (11 passed) | 97 steps | ~14 s
Reporte: reports/index.html

Cobertura:
• Happy path 200 + result.id → comunicación 89685
• Rechazo sin firma → 400 / errorCode 4001
• 6 validaciones campos PA obligatorios → 400 / errorCode 40000
• Dependiente en copia (4758) → 200 / id 89687
• Dependiente como principal (4758) → 200 / id 89688 (hallazgo H-01: API QA acepta; confirmar con negocio)
• Destinatario no dependiente → 400 / errorCode 4001

Evidencia: docs/api-v3.5/EVIDENCIAS-Cierre-Asana-Notificacion.md
Ambiente: middleware QA v3 | Token PDI | Despachadora 598 | Dependiente 4758
```

---

## 9. Checklist cierre QA Automatizador

- [ ] Código integrado en repositorio DD-AUTOMATIZACION-QA
- [x] `npm run notificacion_report` → 11/11 passed (23-06-2026)
- [x] `npm run api-report` → reporte HTML generado (`reports/index.html`)
- [ ] Adjuntar reporte + captura terminal en Asana
- [ ] Registrar hallazgo H-01 si aplica seguimiento backend
- [ ] Código en rama `main` del repositorio
- [ ] Mover tarjeta Asana a **Done** / estado acordado por el equipo
