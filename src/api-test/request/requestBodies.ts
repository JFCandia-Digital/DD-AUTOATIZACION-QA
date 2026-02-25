import _ from 'lodash';
import { crearVarianteSinCampo, crearVarianteValor, crearVarianteArchivo } from '../../common/utils/utils';

// Valores comunes para pruebas negativas de tipos
const VALORES_INVALIDOS = {
  STRING: "String",
  STRING_SPECIAL: "#//´¨",
  INTEGER: 12345,
  BOOLEAN: true,
  ARRAY_EMPTY: [],
  ARRAY_WITH_DATA: [12345],
  OBJECT_EMPTY: {},
  OBJECT_WITH_DATA: { data: 12345 }
};

// =============================================================================
// 2. DEFINICIÓN DE DATOS BASE (HAPPY PATHS)
// =============================================================================

const JSON_MINIMO_VALIDO = {
  "entidadDespachadoraCodificadorId": 598,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false },
      { "entidadDestinatariaCodificadorId": 27, "isEnCopia": false },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false },
      { "entidadDestinatariaCodificadorId": 55, "isEnCopia": false }
    ]
  },
  "materia": "AUT-materia-TEST",
  "idTipoDocumentoOficial": 1,
  "folio": "FOLIO-BASE-2025",
  "usuarioSolicitante": {
    "dv": "1",
    "run": 11111111
  }
};

const JSON_SWAGGER_MINIMUM = { ...JSON_MINIMO_VALIDO };

// Variaciones Happy Path Comunes
const JSON_CON_ARCHIVOS_ANEXOS = crearVarianteArchivo(JSON_MINIMO_VALIDO, "MINVU.pdf");

const JSON_CON_ARCHIVOS_ANEXOS_VACIOS = {
  ...JSON_MINIMO_VALIDO,
  "archivosAnexosInfo": []
};

// Variaciones de nombres de archivo (Reglas de negocio generales)
const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO = crearVarianteArchivo(JSON_MINIMO_VALIDO, "ab");
const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO = crearVarianteArchivo(JSON_MINIMO_VALIDO, "a".repeat(151) + ".pdf");


// =============================================================================
// 3. DEFINICIÓN BASE PARA REGISTRO EXTERNO
// =============================================================================

const JSON_SIN_MATERIA_BASE = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'materia');

const JSON_MINIMO_VALIDO_RE = {
  ...JSON_SIN_MATERIA_BASE,
  "materia": "AUT-materia-TEST-REGISTRO-EXTERNO",
  "fechaHoraDespachoExterno": null,
  "plataformaDespachoExterno": 598
};

// --- Variantes con fecha de despacho en días anteriores (Registro Externo) ---
const JSON_MINIMO_VALIDO_RE_FECHA_MENOS_1_DIA = {
  ...JSON_MINIMO_VALIDO_RE,
  "fechaHoraDespachoExterno": "OFFSET_1_DIA"
};

const JSON_MINIMO_VALIDO_RE_FECHA_MENOS_2_DIAS = {
  ...JSON_MINIMO_VALIDO_RE,
  "fechaHoraDespachoExterno": "OFFSET_2_DIAS"
};

// --- Variantes con fecha de despacho en días posteriores (Registro Externo) ---
const JSON_MINIMO_VALIDO_RE_FECHA_MAS_1_DIA = {
  ...JSON_MINIMO_VALIDO_RE,
  "fechaHoraDespachoExterno": "OFFSET_MAS_1_DIA"
};

const JSON_MINIMO_VALIDO_RE_FECHA_MAS_2_DIAS = {
  ...JSON_MINIMO_VALIDO_RE,
  "fechaHoraDespachoExterno": "OFFSET_MAS_2_DIAS"
};

const JSON_VALIDO_RE_CON_ANEXOS = crearVarianteArchivo(JSON_MINIMO_VALIDO_RE, "MINVU.pdf");

const JSON_VALIDO_RE_CON_ANEXOS_VACIOS = {
  ...JSON_MINIMO_VALIDO_RE,
  "archivosAnexosInfo": []
};

const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RE = crearVarianteArchivo(JSON_MINIMO_VALIDO_RE, "ab");
const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RE = crearVarianteArchivo(JSON_MINIMO_VALIDO_RE, "a".repeat(151) + ".pdf");

const JSON_MINIMO_VALIDO_RI = {
  ...JSON_SIN_MATERIA_BASE,
  "materia": "AUT-materia-TEST-REGISTRO-POR-INCIDENCIA",
  "medioDespacho": "EMAIL",
  "fechaHoraDespachoExterno": null,
  "plataformaDespachoExterno": 598
};

// --- Variantes con fecha de despacho en días anteriores (Registro por Incidencia) ---
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA = {
  ...JSON_MINIMO_VALIDO_RI,
  "fechaHoraDespachoExterno": "OFFSET_1_DIA"
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS = {
  ...JSON_MINIMO_VALIDO_RI,
  "fechaHoraDespachoExterno": "OFFSET_2_DIAS"
};

// --- Variantes con fecha de despacho en días posteriores (Registro por Incidencia) ---
const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA = {
  ...JSON_MINIMO_VALIDO_RI,
  "fechaHoraDespachoExterno": "OFFSET_MAS_1_DIA"
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS = {
  ...JSON_MINIMO_VALIDO_RI,
  "fechaHoraDespachoExterno": "OFFSET_MAS_2_DIAS"
};

const JSON_VALIDO_RI_CON_ANEXOS = crearVarianteArchivo(JSON_MINIMO_VALIDO_RI, "MINVU.pdf");

const JSON_VALIDO_RI_CON_ANEXOS_VACIOS = {
  ...JSON_MINIMO_VALIDO_RI,
  "archivosAnexosInfo": []
};

const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RI = crearVarianteArchivo(JSON_MINIMO_VALIDO_RI, "ab");
const JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RI = crearVarianteArchivo(JSON_MINIMO_VALIDO_RI, "a".repeat(151) + ".pdf");

// --- Variantes con fechaHoraRecepcion (Registro por Incidencia) ---
const JSON_MINIMO_VALIDO_RI_RECEPCION_IGUAL = {
  ...JSON_MINIMO_VALIDO_RI,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_IGUAL"
    }))
  }
};

// Variante con fechaHoraRecepcion > fechaHoraDespachoExterno (más reciente)
const JSON_MINIMO_VALIDO_RI_RECEPCION_MAYOR = {
  ...JSON_MINIMO_VALIDO_RI,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MAYOR"
    }))
  }
};

// Variante con fechaHoraRecepcion < fechaHoraDespachoExterno (más antigua)
const JSON_MINIMO_VALIDO_RI_RECEPCION_MENOR = {
  ...JSON_MINIMO_VALIDO_RI,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MENOR"
    }))
  }
};

// Combinaciones con offsets específicos y fechaHoraRecepcion
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_IGUAL = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_IGUAL"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MAYOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MAYOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MENOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MENOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_IGUAL = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_IGUAL"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MAYOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MAYOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MENOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MENOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_IGUAL = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_IGUAL"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MAYOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MAYOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MENOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MENOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_IGUAL = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_IGUAL"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MAYOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MAYOR"
    }))
  }
};

const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MENOR = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": JSON_MINIMO_VALIDO.configuracionDestinatarios.destinatarios.map(d => ({
      ...d,
      "fechaHoraRecepcion": "OFFSET_MENOR"
    }))
  }
};

// Variantes con fechaHoraRecepcion DISTINTAS por destinatario (Registro por Incidencia)

// -1 día: Mezcla válida (IGUAL y MAYOR)
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_VALIDAS = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" }
    ]
  }
};

// -1 día: Mezcla inválida (incluye OFFSET_MENOR en un destinatario)
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MENOR" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" }
    ]
  }
};

// -2 días: Mezcla válida (IGUAL y MAYOR)
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" }
    ]
  }
};

// -2 días: Mezcla inválida (incluye OFFSET_MENOR en un destinatario)
const JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MENOR" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" }
    ]
  }
};

// +1 día: Mezcla válida (IGUAL y MAYOR) — rechazada por fechaHoraDespachoExterno futura
const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_VALIDAS = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" }
    ]
  }
};

// +1 día: Mezcla inválida (incluye OFFSET_MENOR) — rechazada por fechaHoraDespachoExterno futura
const JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MENOR" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" }
    ]
  }
};

// +2 días: Mezcla válida (IGUAL y MAYOR) — rechazada por fechaHoraDespachoExterno futura
const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" }
    ]
  }
};

// +2 días: Mezcla inválida (incluye OFFSET_MENOR) — rechazada por fechaHoraDespachoExterno futura
const JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA = {
  ...JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,
  "configuracionDestinatarios": {
    "destinatarios": [
      { "entidadDestinatariaCodificadorId": 175, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 156, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" },
      { "entidadDestinatariaCodificadorId": 27,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MENOR" },
      { "entidadDestinatariaCodificadorId": 522, "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_IGUAL" },
      { "entidadDestinatariaCodificadorId": 55,  "isEnCopia": false, "fechaHoraRecepcion": "OFFSET_MAYOR" }
    ]
  }
};

// =============================================================================
// 4. VARIACIONES INVÁLIDAS (CAMPOS FALTANTES)
// =============================================================================

// --- Variantes Generales (Usadas en Comunicaciones) ---
const SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'entidadDespachadoraCodificadorId');
const SIN_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'configuracionDestinatarios');
const SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'configuracionDestinatarios.destinatarios');
const SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'configuracionDestinatarios.destinatarios.0.entidadDestinatariaCodificadorId');
const SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'configuracionDestinatarios.destinatarios.0.isEnCopia');
const SIN_FOLIO = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'folio');
const SIN_ID_TIPO_DOCUMENTO_OFICIAL = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'idTipoDocumentoOficial');
const SIN_MATERIA = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'materia');
const SIN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'usuarioSolicitante');
const SIN_RUN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'usuarioSolicitante.run');
const SIN_DV_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO, 'usuarioSolicitante.dv');

const INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteValor(JSON_MINIMO_VALIDO, 'configuracionDestinatarios.destinatarios', {});
const INFO_VACIO_CONFIGURACION_DESTINATARIOS = crearVarianteValor(JSON_MINIMO_VALIDO, 'configuracionDestinatarios', {});
const INFO_VACIO_USUARIO_SOLICITANTE = crearVarianteValor(JSON_MINIMO_VALIDO, 'usuarioSolicitante', {});


// --- Variantes Específicas Registro Externo ---
const RE_SIN_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios');
const RE_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios');
const RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios.0.entidadDestinatariaCodificadorId');
const RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios.*.entidadDestinatariaCodificadorId');
const RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios.0.isEnCopia');
const RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios.*.isEnCopia');
const RE_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'entidadDespachadoraCodificadorId');
const RE_SIN_FECHA_HORA_DESPACHO_EXTERNO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'fechaHoraDespachoExterno');
const RE_SIN_PLATAFORMA_DESPACHO_EXTERNO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'plataformaDespachoExterno');
const RE_SIN_MATERIA = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'materia');
const RE_SIN_ID_TIPO_DOCUMENTO_OFICIAL = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'idTipoDocumentoOficial');
const RE_SIN_FOLIO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'folio');
const RE_SIN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'usuarioSolicitante');
const RE_SIN_RUN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'usuarioSolicitante.run');
const RE_SIN_DV_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RE, 'usuarioSolicitante.dv');

const RE_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ = crearVarianteValor(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios', {});
const RE_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteValor(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios.destinatarios', []);
const RE_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteValor(JSON_MINIMO_VALIDO_RE, 'configuracionDestinatarios', []);
const RE_INFO_VACIO_USUARIO_SOLICITANTE_OBJ = crearVarianteValor(JSON_MINIMO_VALIDO_RE, 'usuarioSolicitante', {});

// --- Variantes Específicas Registro de Incidencias ---
const RI_SIN_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios');
const RI_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios');
const RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios.0.entidadDestinatariaCodificadorId');
const RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios.*.entidadDestinatariaCodificadorId');
const RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios.0.isEnCopia');
const RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios.*.isEnCopia');
const RI_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'entidadDespachadoraCodificadorId');
const RI_SIN_FECHA_HORA_DESPACHO_EXTERNO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'fechaHoraDespachoExterno');
const RI_SIN_PLATAFORMA_DESPACHO_EXTERNO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'plataformaDespachoExterno');
const RI_SIN_MATERIA = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'materia');
const RI_SIN_ID_TIPO_DOCUMENTO_OFICIAL = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'idTipoDocumentoOficial');
const RI_SIN_FOLIO = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'folio');
const RI_SIN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'usuarioSolicitante');
const RI_SIN_RUN_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'usuarioSolicitante.run');
const RI_SIN_DV_USUARIO_SOLICITANTE = crearVarianteSinCampo(JSON_MINIMO_VALIDO_RI, 'usuarioSolicitante.dv');

const RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ = crearVarianteValor(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios', {});
const RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteValor(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios.destinatarios', []);
const RI_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY = crearVarianteValor(JSON_MINIMO_VALIDO_RI, 'configuracionDestinatarios', []);
const RI_INFO_VACIO_USUARIO_SOLICITANTE_OBJ = crearVarianteValor(JSON_MINIMO_VALIDO_RI, 'usuarioSolicitante', {});

// =============================================================================
// 5. GENERACIÓN DINÁMICA DE VARIACIONES POR TIPO DE DATO (ERROR TESTING)
// =============================================================================

// --- Campo: entidadDespachadoraCodificadorId ---
const PATH_ENTIDAD_DESPACHADORA = 'entidadDespachadoraCodificadorId';
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, "598");
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.STRING_SPECIAL);
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.BOOLEAN);
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.ARRAY_EMPTY);
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, [598]);
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.OBJECT_EMPTY);
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, { entidadDespachadoraCodificadorId: 598 });
const JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DESPACHADORA, 0);

// --- Campo: configuracionDestinatarios ---
const PATH_CONFIG_DEST = 'configuracionDestinatarios';
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, 12);
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, "Dato String");
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, VALORES_INVALIDOS.STRING_SPECIAL);
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, false);
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, []);
const JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_CONFIG_DEST, [{ destinatarios: [], destinatariosReferenciados: [] }]);

// --- Campo: configuracionDestinatarios.destinatarios ---
const PATH_DESTINATARIOS = 'configuracionDestinatarios.destinatarios';
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, 12);
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, "Dato String");
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, VALORES_INVALIDOS.STRING_SPECIAL);
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, true);
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, []);
const JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DESTINATARIOS, [27]);

// --- Campo: configuracionDestinatarios.destinatarios.0.entidadDestinatariaCodificadorId ---
const PATH_ENTIDAD_DEST_ID = 'configuracionDestinatarios.destinatarios.0.entidadDestinatariaCodificadorId';
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, "27");
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, VALORES_INVALIDOS.STRING_SPECIAL);
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, true);
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, []);
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, [27]);
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, {});
const JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DEST_ID, { entidadDestinatariaCodificadorId: 27 });

// --- Campo: configuracionDestinatarios.destinatarios.0.isEnCopia ---
const PATH_IS_EN_COPIA = 'configuracionDestinatarios.destinatarios.*.isEnCopia';
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, "Dato String");
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, VALORES_INVALIDOS.STRING_SPECIAL);
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, 1);
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, []);
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, [false]);
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, {});
const JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_IS_EN_COPIA, { isEnCopia: false });

// --- Campo: configuracionDestinatarios.destinatariosReferenciados ---
const PATH_DEST_REF = 'configuracionDestinatarios.destinatariosReferenciados';
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, "Dato String");
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, VALORES_INVALIDOS.STRING_SPECIAL);
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, 2);
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, true);
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, [2]);
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, {});
// const JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_DEST_REF, { destinatariosReferenciados: 1 });

// --- Campo: folio ---
const PATH_FOLIO = 'folio';
const JSON_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, "#//´,¨.");
const JSON_FOLIO_STRING_A_INTEGER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, 12345);
const JSON_FOLIO_STRING_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, true);
const JSON_FOLIO_STRING_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, []);
const JSON_FOLIO_STRING_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, [12345]);
const JSON_FOLIO_STRING_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, {});
const JSON_FOLIO_STRING_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FOLIO, { folio: 12345 });

// --- Campo: idTipoDocumentoOficial ---
const PATH_TIPO_DOC = 'idTipoDocumentoOficial';
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, "1");
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, "#//´,¨.");
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, true);
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, []);
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, [12345]);
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, {});
const JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_TIPO_DOC, { idTipoDocumentoOficial: 12345 });

// --- Campo: materia ---
const PATH_MATERIA = 'materia';
const JSON_MATERIA_STRING_A_NUMBER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, 12345);
const JSON_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, "#//´,¨.");
const JSON_MATERIA_STRING_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, true);
const JSON_MATERIA_STRING_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, []);
const JSON_MATERIA_STRING_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, [12345]);
const JSON_MATERIA_STRING_A_OBJECT_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, {});
const JSON_MATERIA_STRING_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, { idTipoDocumentoOficial: 12345 });
const JSON_MATERIA_STRING_A_VACIA = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, "");
const JSON_MATERIA_STRING_A_EXCEDE_DATO_LARGO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_MATERIA, "a".repeat(151));

// --- Campo: usuarioSolicitante ---
const PATH_USUARIO = 'usuarioSolicitante';
const JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, "Dato String");
const JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, "#//´,¨.");
const JSON_USUARIO_SOLICITENTE_OBJECT_A_NUMBER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, 12345);
const JSON_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, true);
const JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, []);
const JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, [12345]);
const JSON_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO, { usuarioSolicitante: 12345 });

// --- Campo: usuarioSolicitante.dv ---
const PATH_USUARIO_DV = 'usuarioSolicitante.dv';
const JSON_DV_STRING_A_NUMBER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, 1);
const JSON_DV_STRING_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, "#//´,¨.");
const JSON_DV_STRING_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, true);
const JSON_DV_STRING_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, []);
const JSON_DV_STRING_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, [1]);
const JSON_DV_STRING_A_OBJECT = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, {});
const JSON_DV_STRING_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_DV, { dv: 1 });

// --- Campo: usuarioSolicitante.run ---
const PATH_USUARIO_RUN = 'usuarioSolicitante.run';
const JSON_RUN_INTEGER_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, "11111111");
const JSON_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, "#//´,¨.");
const JSON_RUN_INTEGER_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, true);
const JSON_RUN_INTEGER_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, []);
const JSON_RUN_INTEGER_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, [11111111]);
const JSON_RUN_INTEGER_A_OBJECT = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, {});
const JSON_RUN_INTEGER_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_USUARIO_RUN, { run: 11111111 });

// --- Campo: fechaHoraDespachoExterno ---
const PATH_FECHA_HORA_DE = 'fechaHoraDespachoExterno';
// const JSON_FECHA_HORA_DE_STRING_A_NUMBER = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, 1);
// const JSON_FECHA_HORA_DE_STRING_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, "#//´,¨.");
// const JSON_FECHA_HORA_DE_STRING_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, true);
// const JSON_FECHA_HORA_DE_STRING_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, []);
// const JSON_FECHA_HORA_DE_STRING_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, [1]);
// const JSON_FECHA_HORA_DE_STRING_A_OBJECT = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, {});
// const JSON_FECHA_HORA_DE_STRING_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_FECHA_HORA_DE, { fechaHoraDespachoExterno: 1 });

// --- Campo: entidadDespachadoraCodificadorId ---
const PATH_ENTIDAD_DES_COD_ID = 'entidadDespachadoraCodificadorId';
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_STRING = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, "Dato String");
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_STRING_CARACTER_ESPECIAL = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, "#//´,¨.");
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_BOOLEAN = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, true);
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_VACIO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, []);
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, [11111111]);
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, {});
// const JSON_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT_CON_DATO = crearVarianteValor(JSON_MINIMO_VALIDO, PATH_ENTIDAD_DES_COD_ID, { entidadDespachadoraCodificadorId: 11111111 });

// --- Campo: medioDespacho ---
const PATH_MEDIO_DESPACHO = 'medioDespacho';


// =============================================================================
//  VARIACIONES INVÁLIDAS ESPECÍFICAS PARA REGISTRO EXTERNO
// =============================================================================
// Se utiliza JSON_MINIMO_VALIDO_RE como base para mantener los campos requeridos
// (plataformaDespachoExterno, fechaHoraDespachoExterno, etc.) y solo variar el campo de prueba.

const BASE_RE = JSON_MINIMO_VALIDO_RE;

// --- entidadDespachadoraCodificadorId ---
const RE_ENTIDAD_DESP_INT_A_STR = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, "598Stirng");
const RE_ENTIDAD_DESP_INT_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.STRING_SPECIAL);
const RE_ENTIDAD_DESP_INT_A_BOOL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.BOOLEAN);
const RE_ENTIDAD_DESP_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.ARRAY_EMPTY);
const RE_ENTIDAD_DESP_INT_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, [598]);
const RE_ENTIDAD_DESP_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.OBJECT_EMPTY);
const RE_ENTIDAD_DESP_INT_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, { id: 598 });
const RE_ENTIDAD_DESP_INT_A_ZERO = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DESPACHADORA, 0);

// --- configuracionDestinatarios ---
const RE_CONFIG_DEST_OBJ_A_INT = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, 12);
const RE_CONFIG_DEST_OBJ_A_STR = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, "Dato String");
const RE_CONFIG_DEST_OBJ_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, VALORES_INVALIDOS.STRING_SPECIAL);
const RE_CONFIG_DEST_OBJ_A_BOOL = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, false);
const RE_CONFIG_DEST_OBJ_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, []);
const RE_CONFIG_DEST_OBJ_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_CONFIG_DEST, [{ destinatarios: [] }]);

// --- configuracionDestinatarios.destinatarios ---
const RE_DEST_ARR_A_INT = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, 12);
const RE_DEST_ARR_A_STR = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, "Dato String");
const RE_DEST_ARR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, VALORES_INVALIDOS.STRING_SPECIAL);
const RE_DEST_ARR_A_BOOL = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, true);
const RE_DEST_ARR_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, []);
const RE_DEST_ARR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_DESTINATARIOS, [27]);

// --- entidadDestinatariaCodificadorId (en array) ---
const RE_ENTIDAD_DEST_ID_INT_A_STR = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, "27");
const RE_ENTIDAD_DEST_ID_INT_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, VALORES_INVALIDOS.STRING_SPECIAL);
const RE_ENTIDAD_DEST_ID_INT_A_BOOL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, true);
const RE_ENTIDAD_DEST_ID_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, []);
const RE_ENTIDAD_DEST_ID_INT_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, [27]);
const RE_ENTIDAD_DEST_ID_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, {});
const RE_ENTIDAD_DEST_ID_INT_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DEST_ID, { id: 27 });

// --- isEnCopia (en array) ---
const RE_IS_EN_COPIA_BOOL_A_STR = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, "Dato String");
const RE_IS_EN_COPIA_BOOL_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, VALORES_INVALIDOS.STRING_SPECIAL);
const RE_IS_EN_COPIA_BOOL_A_INT = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, 1);
const RE_IS_EN_COPIA_BOOL_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, []);
const RE_IS_EN_COPIA_BOOL_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, [false]);
const RE_IS_EN_COPIA_BOOL_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, {});
const RE_IS_EN_COPIA_BOOL_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_IS_EN_COPIA, { val: false });

// --- destinatariosReferenciados ---
// const RE_DEST_REF_ARR_A_STR = crearVarianteValor(BASE_RE, PATH_DEST_REF, "Dato String");
// const RE_DEST_REF_ARR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_DEST_REF, VALORES_INVALIDOS.STRING_SPECIAL);
// const RE_DEST_REF_ARR_A_INT = crearVarianteValor(BASE_RE, PATH_DEST_REF, 2);
// const RE_DEST_REF_ARR_A_BOOL = crearVarianteValor(BASE_RE, PATH_DEST_REF, true);
// const RE_DEST_REF_ARR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_DEST_REF, [2]);
// const RE_DEST_REF_ARR_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_DEST_REF, {});
// const RE_DEST_REF_ARR_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_DEST_REF, { val: 1 });

// --- folio ---
const RE_FOLIO_STR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_FOLIO, "#//´,¨.");
const RE_FOLIO_STR_A_INT = crearVarianteValor(BASE_RE, PATH_FOLIO, 12345);
const RE_FOLIO_STR_A_BOOL = crearVarianteValor(BASE_RE, PATH_FOLIO, true);
const RE_FOLIO_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_FOLIO, []);
const RE_FOLIO_STR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_FOLIO, [12345]);
const RE_FOLIO_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_FOLIO, {});
const RE_FOLIO_STR_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_FOLIO, { val: 12345 });

// --- idTipoDocumentoOficial ---
const RE_TIPO_DOC_INT_A_STR = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, "1");
const RE_TIPO_DOC_INT_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, "#//´,¨.");
const RE_TIPO_DOC_INT_A_BOOL = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, true);
const RE_TIPO_DOC_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, []);
const RE_TIPO_DOC_INT_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, [1]);
const RE_TIPO_DOC_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, {});
const RE_TIPO_DOC_INT_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_TIPO_DOC, { val: 1 });

// --- materia ---
const RE_MATERIA_STR_A_INT = crearVarianteValor(BASE_RE, PATH_MATERIA, 12345);
const RE_MATERIA_STR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_MATERIA, "#//´,¨.");
const RE_MATERIA_STR_A_BOOL = crearVarianteValor(BASE_RE, PATH_MATERIA, true);
const RE_MATERIA_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_MATERIA, []);
const RE_MATERIA_STR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_MATERIA, [12345]);
const RE_MATERIA_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_MATERIA, {});
const RE_MATERIA_STR_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_MATERIA, { val: 1 });
const RE_MATERIA_STR_A_EMPTY = crearVarianteValor(BASE_RE, PATH_MATERIA, "");
const RE_MATERIA_STR_A_LONG = crearVarianteValor(BASE_RE, PATH_MATERIA, "a".repeat(151));

// --- usuarioSolicitante ---
const RE_USUARIO_OBJ_A_STR = crearVarianteValor(BASE_RE, PATH_USUARIO, "Dato String");
const RE_USUARIO_OBJ_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_USUARIO, "#//´,¨.");
const RE_USUARIO_OBJ_A_INT = crearVarianteValor(BASE_RE, PATH_USUARIO, 12345);
const RE_USUARIO_OBJ_A_BOOL = crearVarianteValor(BASE_RE, PATH_USUARIO, true);
const RE_USUARIO_OBJ_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_USUARIO, []);
const RE_USUARIO_OBJ_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO, [12345]);
const RE_USUARIO_OBJ_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO, { val: 12345 });

// --- usuarioSolicitante.dv ---
const RE_DV_STR_A_INT = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, 1);
const RE_DV_STR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, "#//´,¨.");
const RE_DV_STR_A_BOOL = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, true);
const RE_DV_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, []);
const RE_DV_STR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, [1]);
const RE_DV_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, {});
const RE_DV_STR_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO_DV, { val: 1 });

// --- usuarioSolicitante.run ---
const RE_RUN_INT_A_STR = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, "11111111");
const RE_RUN_INT_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, "#//´,¨.");
const RE_RUN_INT_A_BOOL = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, true);
const RE_RUN_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, []);
const RE_RUN_INT_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, [11111111]);
const RE_RUN_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, {});
const RE_RUN_INT_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_USUARIO_RUN, { val: 1 });

// --- fechaHoraDespachoExterno ---
const RE_FECHA_HORA_DE_STR_A_INT = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, 1);
const RE_FECHA_HORA_DE_STR_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, "#//´,¨.");
const RE_FECHA_HORA_DE_STR_A_BOOL = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, true);
const RE_FECHA_HORA_DE_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, []);
const RE_FECHA_HORA_DE_STR_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, [1]);
const RE_FECHA_HORA_DE_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, {});
const RE_FECHA_HORA_DE_STR_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, { val: 1 });

// --- fechaHoraDespachoExterno - Formato incompleto (solo fecha o solo hora) ---
const RE_FECHA_HORA_DE_SOLO_FECHA = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, "19-02-2026");
const RE_FECHA_HORA_DE_SOLO_HORA = crearVarianteValor(BASE_RE, PATH_FECHA_HORA_DE, "10:30:00");

// --- entidadDespachadoraCodificadorId ---
const RE_ENTIDAD_DES_COD_ID_INT_A_STR = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, "11111111");
const RE_ENTIDAD_DES_COD_ID_INT_A_SPECIAL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, "#//´,¨.");
const RE_ENTIDAD_DES_COD_ID_INT_A_BOOL = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, true);
const RE_ENTIDAD_DES_COD_ID_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, []);
const RE_ENTIDAD_DES_COD_ID_INT_A_ARR_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, [11111111]);
const RE_ENTIDAD_DES_COD_ID_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, {});
const RE_ENTIDAD_DES_COD_ID_INT_A_OBJ_DATA = crearVarianteValor(BASE_RE, PATH_ENTIDAD_DES_COD_ID, { val: 1 });

// =============================================================================
//  VARIACIONES INVÁLIDAS ESPECÍFICAS PARA REGISTRO DE INCIDENCIAS
// =============================================================================
// Se utiliza JSON_MINIMO_VALIDO_RE como base para mantener los campos requeridos
// (plataformaDespachoExterno, fechaHoraDespachoExterno, etc.) y solo variar el campo de prueba.

const BASE_RI = JSON_MINIMO_VALIDO_RI;

// --- entidadDespachadoraCodificadorId ---
const RI_ENTIDAD_DESP_INT_A_STR = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, "598Stirng");
const RI_ENTIDAD_DESP_INT_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.STRING_SPECIAL);
const RI_ENTIDAD_DESP_INT_A_BOOL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.BOOLEAN);
const RI_ENTIDAD_DESP_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.ARRAY_EMPTY);
const RI_ENTIDAD_DESP_INT_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, [598]);
const RI_ENTIDAD_DESP_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, VALORES_INVALIDOS.OBJECT_EMPTY);
const RI_ENTIDAD_DESP_INT_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, { id: 598 });
const RI_ENTIDAD_DESP_INT_A_ZERO = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DESPACHADORA, 0);

// --- configuracionDestinatarios ---
const RI_CONFIG_DEST_OBJ_A_INT = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, 12);
const RI_CONFIG_DEST_OBJ_A_STR = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, "Dato String");
const RI_CONFIG_DEST_OBJ_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, VALORES_INVALIDOS.STRING_SPECIAL);
const RI_CONFIG_DEST_OBJ_A_BOOL = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, false);
const RI_CONFIG_DEST_OBJ_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, []);
const RI_CONFIG_DEST_OBJ_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_CONFIG_DEST, [{ destinatarios: [] }]);

// --- configuracionDestinatarios.destinatarios ---
const RI_DEST_ARR_A_INT = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, 12);
const RI_DEST_ARR_A_STR = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, "Dato String");
const RI_DEST_ARR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, VALORES_INVALIDOS.STRING_SPECIAL);
const RI_DEST_ARR_A_BOOL = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, true);
const RI_DEST_ARR_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, []);
const RI_DEST_ARR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_DESTINATARIOS, [27]);

// --- entidadDestinatariaCodificadorId (en array) ---
const RI_ENTIDAD_DEST_ID_INT_A_STR = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, "27");
const RI_ENTIDAD_DEST_ID_INT_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, VALORES_INVALIDOS.STRING_SPECIAL);
const RI_ENTIDAD_DEST_ID_INT_A_BOOL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, true);
const RI_ENTIDAD_DEST_ID_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, []);
const RI_ENTIDAD_DEST_ID_INT_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, [27]);
const RI_ENTIDAD_DEST_ID_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, {});
const RI_ENTIDAD_DEST_ID_INT_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DEST_ID, { id: 27 });

// --- isEnCopia (en array) ---
const RI_IS_EN_COPIA_BOOL_A_STR = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, "Dato String");
const RI_IS_EN_COPIA_BOOL_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, VALORES_INVALIDOS.STRING_SPECIAL);
const RI_IS_EN_COPIA_BOOL_A_INT = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, 1);
const RI_IS_EN_COPIA_BOOL_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, []);
const RI_IS_EN_COPIA_BOOL_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, [false]);
const RI_IS_EN_COPIA_BOOL_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, {});
const RI_IS_EN_COPIA_BOOL_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_IS_EN_COPIA, { val: false });

// --- destinatariosReferenciados ---
// const RI_DEST_REF_ARR_A_STR = crearVarianteValor(BASE_RI, PATH_DEST_REF, "Dato String");
// const RI_DEST_REF_ARR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_DEST_REF, VALORES_INVALIDOS.STRING_SPECIAL);
// const RI_DEST_REF_ARR_A_INT = crearVarianteValor(BASE_RI, PATH_DEST_REF, 2);
// const RI_DEST_REF_ARR_A_BOOL = crearVarianteValor(BASE_RI, PATH_DEST_REF, true);
// const RI_DEST_REF_ARR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_DEST_REF, [2]);
// const RI_DEST_REF_ARR_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_DEST_REF, {});
// const RI_DEST_REF_ARR_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_DEST_REF, { val: 1 });

// --- folio ---
const RI_FOLIO_STR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_FOLIO, "#//´,¨.");
const RI_FOLIO_STR_A_INT = crearVarianteValor(BASE_RI, PATH_FOLIO, 12345);
const RI_FOLIO_STR_A_BOOL = crearVarianteValor(BASE_RI, PATH_FOLIO, true);
const RI_FOLIO_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_FOLIO, []);
const RI_FOLIO_STR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_FOLIO, [12345]);
const RI_FOLIO_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_FOLIO, {});
const RI_FOLIO_STR_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_FOLIO, { val: 12345 })

// --- idTipoDocumentoOficial ---
const RI_TIPO_DOC_INT_A_STR = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, "1");
const RI_TIPO_DOC_INT_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, "#//´,¨.");
const RI_TIPO_DOC_INT_A_BOOL = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, true);
const RI_TIPO_DOC_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, []);
const RI_TIPO_DOC_INT_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, [1]);
const RI_TIPO_DOC_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, {});
const RI_TIPO_DOC_INT_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_TIPO_DOC, { val: 1 });

// --- materia ---
const RI_MATERIA_STR_A_INT = crearVarianteValor(BASE_RI, PATH_MATERIA, 12345);
const RI_MATERIA_STR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_MATERIA, "#//´,¨.");
const RI_MATERIA_STR_A_BOOL = crearVarianteValor(BASE_RI, PATH_MATERIA, true);
const RI_MATERIA_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_MATERIA, []);
const RI_MATERIA_STR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_MATERIA, [12345]);
const RI_MATERIA_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_MATERIA, {});
const RI_MATERIA_STR_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_MATERIA, { val: 1 });
const RI_MATERIA_STR_A_EMPTY = crearVarianteValor(BASE_RI, PATH_MATERIA, "");
const RI_MATERIA_STR_A_LONG = crearVarianteValor(BASE_RI, PATH_MATERIA, "a".repeat(151));

// --- usuarioSolicitante ---
const RI_USUARIO_OBJ_A_STR = crearVarianteValor(BASE_RI, PATH_USUARIO, "Dato String");
const RI_USUARIO_OBJ_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_USUARIO, "#//´,¨.");
const RI_USUARIO_OBJ_A_INT = crearVarianteValor(BASE_RI, PATH_USUARIO, 12345);
const RI_USUARIO_OBJ_A_BOOL = crearVarianteValor(BASE_RI, PATH_USUARIO, true);
const RI_USUARIO_OBJ_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_USUARIO, []);
const RI_USUARIO_OBJ_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO, [12345]);
const RI_USUARIO_OBJ_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO, { val: 12345 });

// --- usuarioSolicitante.dv ---
const RI_DV_STR_A_INT = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, 1);
const RI_DV_STR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, "#//´,¨.");
const RI_DV_STR_A_BOOL = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, true);
const RI_DV_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, []);
const RI_DV_STR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, [1]);
const RI_DV_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, {});
const RI_DV_STR_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO_DV, { val: 1 });

// --- usuarioSolicitante.run ---
const RI_RUN_INT_A_STR = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, "11111111");
const RI_RUN_INT_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, "#//´,¨.");
const RI_RUN_INT_A_BOOL = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, true);
const RI_RUN_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, []);
const RI_RUN_INT_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, [11111111]);
const RI_RUN_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, {});
const RI_RUN_INT_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_USUARIO_RUN, { val: 1 });

// --- fechaHoraDespachoExterno ---
const RI_FECHA_HORA_DE_STR_A_INT = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, 1);
const RI_FECHA_HORA_DE_STR_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, "#//´,¨.");
const RI_FECHA_HORA_DE_STR_A_BOOL = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, true);
const RI_FECHA_HORA_DE_STR_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, []);
const RI_FECHA_HORA_DE_STR_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, [1]);
const RI_FECHA_HORA_DE_STR_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, {});
const RI_FECHA_HORA_DE_STR_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, { val: 1 });

// --- fechaHoraDespachoExterno - Formato incompleto (solo fecha o solo hora) ---
const RI_FECHA_HORA_DE_SOLO_FECHA = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, "19-02-2026");
const RI_FECHA_HORA_DE_SOLO_HORA = crearVarianteValor(BASE_RI, PATH_FECHA_HORA_DE, "10:30:00");

// --- entidadDespachadoraCodificadorId ---
const RI_ENTIDAD_DES_COD_ID_INT_A_STR = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, "11111111");
const RI_ENTIDAD_DES_COD_ID_INT_A_SPECIAL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, "#//´,¨.");
const RI_ENTIDAD_DES_COD_ID_INT_A_BOOL = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, true);
const RI_ENTIDAD_DES_COD_ID_INT_A_ARR_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, []);
const RI_ENTIDAD_DES_COD_ID_INT_A_ARR_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, [11111111]);
const RI_ENTIDAD_DES_COD_ID_INT_A_OBJ_EMPTY = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, {});
const RI_ENTIDAD_DES_COD_ID_INT_A_OBJ_DATA = crearVarianteValor(BASE_RI, PATH_ENTIDAD_DES_COD_ID, { val: 1 });

// =============================================================================
// 6. EXPORTACIONES (CON LOS MISMOS NOMBRES PARA COMPATIBILIDAD)
// =============================================================================

export const registroExternoRequest = {
  // Happy Paths
  "JSON_MINIMO_VALIDO_RE": JSON_MINIMO_VALIDO_RE,
  "JSON_VALIDO_RE_CON_ANEXOS": JSON_VALIDO_RE_CON_ANEXOS,
  "JSON_VALIDO_RE_CON_ANEXOS_VACIOS": JSON_VALIDO_RE_CON_ANEXOS_VACIOS,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RE": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RE,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RE": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RE,
  "JSON_MINIMO_VALIDO_RI": JSON_MINIMO_VALIDO_RI,
  "JSON_VALIDO_RI_CON_ANEXOS": JSON_VALIDO_RI_CON_ANEXOS,
  "JSON_VALIDO_RI_CON_ANEXOS_VACIOS": JSON_VALIDO_RI_CON_ANEXOS_VACIOS,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RI": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO_RI,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RI": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO_RI,

  // Variantes con fecha de despacho en días anteriores (Registro Externo)
  "JSON_MINIMO_VALIDO_RE_FECHA_MENOS_1_DIA": JSON_MINIMO_VALIDO_RE_FECHA_MENOS_1_DIA,
  "JSON_MINIMO_VALIDO_RE_FECHA_MENOS_2_DIAS": JSON_MINIMO_VALIDO_RE_FECHA_MENOS_2_DIAS,

  // Variantes con fecha de despacho en días anteriores (Registro por Incidencia)
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS,

  // Variantes con fecha de despacho en días posteriores (Registro Externo)
  "JSON_MINIMO_VALIDO_RE_FECHA_MAS_1_DIA": JSON_MINIMO_VALIDO_RE_FECHA_MAS_1_DIA,
  "JSON_MINIMO_VALIDO_RE_FECHA_MAS_2_DIAS": JSON_MINIMO_VALIDO_RE_FECHA_MAS_2_DIAS,

  // Variantes con fecha de despacho en días posteriores (Registro por Incidencia)
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS,

  // Variantes con fechaHoraRecepcion (Registro por Incidencia)
  "JSON_MINIMO_VALIDO_RI_RECEPCION_IGUAL": JSON_MINIMO_VALIDO_RI_RECEPCION_IGUAL,
  "JSON_MINIMO_VALIDO_RI_RECEPCION_MAYOR": JSON_MINIMO_VALIDO_RI_RECEPCION_MAYOR,
  "JSON_MINIMO_VALIDO_RI_RECEPCION_MENOR": JSON_MINIMO_VALIDO_RI_RECEPCION_MENOR,

  // Combinaciones de fecha despacho con fechaHoraRecepcion (1 día anterior)
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_IGUAL": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_IGUAL,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MAYOR": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MAYOR,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MENOR": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_MENOR,

  // Combinaciones de fecha despacho con fechaHoraRecepcion (2 días anteriores)
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_IGUAL": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_IGUAL,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MAYOR": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MAYOR,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MENOR": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_MENOR,

  // Combinaciones de fecha despacho con fechaHoraRecepcion (1 día posterior)
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_IGUAL": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_IGUAL,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MAYOR": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MAYOR,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MENOR": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_MENOR,

  // Combinaciones de fecha despacho con fechaHoraRecepcion (2 días posteriores)
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_IGUAL": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_IGUAL,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MAYOR": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MAYOR,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MENOR": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_MENOR,

  // fechaHoraRecepcion distintas por destinatario (Registro por Incidencia)
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_VALIDAS": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_VALIDAS,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS,
  "JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA": JSON_MINIMO_VALIDO_RI_FECHA_MENOS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_VALIDAS": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_VALIDAS,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA": JSON_MINIMO_VALIDO_RI_FECHA_MAS_1_DIA_RECEPCION_DISTINTAS_CON_INVALIDA,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_VALIDAS,
  "JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA": JSON_MINIMO_VALIDO_RI_FECHA_MAS_2_DIAS_RECEPCION_DISTINTAS_CON_INVALIDA,

  // Campos Faltantes (específicos de registro externo)
  "JSON_RE_SIN_CONFIGURACION_DESTINATARIOS": RE_SIN_CONFIGURACION_DESTINATARIOS,
  "JSON_RE_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RE_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RE_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RE_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RE_SIN_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ": RE_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ,
  "JSON_RE_SIN_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RE_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RE_SIN_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY": RE_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RE_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID": RE_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID,
  "JSON_RE_SIN_FECHA_HORA_DESPACHO_EXTERNO": RE_SIN_FECHA_HORA_DESPACHO_EXTERNO,
  "JSON_RE_SIN_PLATAFORMA_DESPACHO_EXTERNO": RE_SIN_PLATAFORMA_DESPACHO_EXTERNO,
  "JSON_RE_SIN_MATERIA": RE_SIN_MATERIA,
  "JSON_RE_SIN_ID_TIPO_DOCUMENTO_OFICIAL": RE_SIN_ID_TIPO_DOCUMENTO_OFICIAL,
  "JSON_RE_SIN_FOLIO": RE_SIN_FOLIO,
  "JSON_RE_SIN_USUARIO_SOLICITANTE": RE_SIN_USUARIO_SOLICITANTE,
  "JSON_RE_SIN_RUN_USUARIO_SOLICITANTE": RE_SIN_RUN_USUARIO_SOLICITANTE,
  "JSON_RE_SIN_DV_USUARIO_SOLICITANTE": RE_SIN_DV_USUARIO_SOLICITANTE,
  "JSON_RE_INFO_VACIO_USUARIO_SOLICITANTE_OBJ": RE_INFO_VACIO_USUARIO_SOLICITANTE_OBJ,

  "JSON_RI_SIN_CONFIGURACION_DESTINATARIOS": RI_SIN_CONFIGURACION_DESTINATARIOS,
  "JSON_RI_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RI_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RI_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RI_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RI_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID": RI_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID,
  "JSON_RI_SIN_FECHA_HORA_DESPACHO_EXTERNO": RI_SIN_FECHA_HORA_DESPACHO_EXTERNO,
  "JSON_RI_SIN_PLATAFORMA_DESPACHO_EXTERNO": RI_SIN_PLATAFORMA_DESPACHO_EXTERNO,
  "JSON_RI_SIN_MATERIA": RI_SIN_MATERIA,
  "JSON_RI_SIN_ID_TIPO_DOCUMENTO_OFICIAL": RI_SIN_ID_TIPO_DOCUMENTO_OFICIAL,
  "JSON_RI_SIN_FOLIO": RI_SIN_FOLIO,
  "JSON_RI_SIN_USUARIO_SOLICITANTE": RI_SIN_USUARIO_SOLICITANTE,
  "JSON_RI_SIN_RUN_USUARIO_SOLICITANTE": RI_SIN_RUN_USUARIO_SOLICITANTE,
  "JSON_RI_SIN_DV_USUARIO_SOLICITANTE": RI_SIN_DV_USUARIO_SOLICITANTE,
  "JSON_RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ": RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_OBJ,
  "JSON_RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY": RI_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RI_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY": RI_INFO_VACIO_CONFIGURACION_DESTINATARIOS_ARRAY,
  "JSON_RI_INFO_VACIO_USUARIO_SOLICITANTE_OBJ": RI_INFO_VACIO_USUARIO_SOLICITANTE_OBJ,

  // --- NUEVAS VARIANTES TIPOS INCORRECTOS (Mapeadas a los mismos nombres que usa tu Feature) ---
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING": RE_ENTIDAD_DESP_INT_A_STR,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_ENTIDAD_DESP_INT_A_SPECIAL,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN": RE_ENTIDAD_DESP_INT_A_BOOL,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO": RE_ENTIDAD_DESP_INT_A_ARR_EMPTY,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO": RE_ENTIDAD_DESP_INT_A_ARR_DATA,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO": RE_ENTIDAD_DESP_INT_A_OBJ_EMPTY,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO": RE_ENTIDAD_DESP_INT_A_OBJ_DATA,
  "JSON_RE_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO": RE_ENTIDAD_DESP_INT_A_ZERO,

  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER": RE_CONFIG_DEST_OBJ_A_INT,
  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING": RE_CONFIG_DEST_OBJ_A_STR,
  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL": RE_CONFIG_DEST_OBJ_A_SPECIAL,
  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN": RE_CONFIG_DEST_OBJ_A_BOOL,
  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO": RE_CONFIG_DEST_OBJ_A_ARR_EMPTY,
  "JSON_RE_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO": RE_CONFIG_DEST_OBJ_A_ARR_DATA,

  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER": RE_DEST_ARR_A_INT,
  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING": RE_DEST_ARR_A_STR,
  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL": RE_DEST_ARR_A_SPECIAL,
  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN": RE_DEST_ARR_A_BOOL,
  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO": RE_DEST_ARR_A_ARR_EMPTY,
  "JSON_RE_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO": RE_DEST_ARR_A_ARR_DATA,

  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING": RE_ENTIDAD_DEST_ID_INT_A_STR,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_ENTIDAD_DEST_ID_INT_A_SPECIAL,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN": RE_ENTIDAD_DEST_ID_INT_A_BOOL,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO": RE_ENTIDAD_DEST_ID_INT_A_ARR_EMPTY,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO": RE_ENTIDAD_DEST_ID_INT_A_ARR_DATA,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO": RE_ENTIDAD_DEST_ID_INT_A_OBJ_EMPTY,
  "JSON_RE_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO": RE_ENTIDAD_DEST_ID_INT_A_OBJ_DATA,

  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING": RE_IS_EN_COPIA_BOOL_A_STR,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL": RE_IS_EN_COPIA_BOOL_A_SPECIAL,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER": RE_IS_EN_COPIA_BOOL_A_INT,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO": RE_IS_EN_COPIA_BOOL_A_ARR_EMPTY,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO": RE_IS_EN_COPIA_BOOL_A_ARR_DATA,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO": RE_IS_EN_COPIA_BOOL_A_OBJ_EMPTY,
  "JSON_RE_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO": RE_IS_EN_COPIA_BOOL_A_OBJ_DATA,

  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING": RE_DEST_REF_ARR_A_STR,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL": RE_DEST_REF_ARR_A_SPECIAL,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER": RE_DEST_REF_ARR_A_INT,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN": RE_DEST_REF_ARR_A_BOOL,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO": RE_DEST_REF_ARR_A_ARR_DATA,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO": RE_DEST_REF_ARR_A_OBJ_EMPTY,
  // "JSON_RE_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO": RE_DEST_REF_ARR_A_OBJ_DATA,

  "JSON_RE_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL": RE_FOLIO_STR_A_SPECIAL,
  "JSON_RE_FOLIO_STRING_A_INTEGER": RE_FOLIO_STR_A_INT,
  "JSON_RE_FOLIO_STRING_A_BOOLEAN": RE_FOLIO_STR_A_BOOL,
  "JSON_RE_FOLIO_STRING_A_ARRAY_VACIO": RE_FOLIO_STR_A_ARR_EMPTY,
  "JSON_RE_FOLIO_STRING_A_ARRAY_CON_DATO": RE_FOLIO_STR_A_ARR_DATA,
  "JSON_RE_FOLIO_STRING_A_OBJECT_VACIO": RE_FOLIO_STR_A_OBJ_EMPTY,
  "JSON_RE_FOLIO_STRING_A_OBJECT_CON_DATO": RE_FOLIO_STR_A_OBJ_DATA,

  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING": RE_TIPO_DOC_INT_A_STR,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_TIPO_DOC_INT_A_SPECIAL,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN": RE_TIPO_DOC_INT_A_BOOL,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO": RE_TIPO_DOC_INT_A_ARR_EMPTY,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO": RE_TIPO_DOC_INT_A_ARR_DATA,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO": RE_TIPO_DOC_INT_A_OBJ_EMPTY,
  "JSON_RE_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO": RE_TIPO_DOC_INT_A_OBJ_DATA,

  "JSON_RE_MATERIA_STRING_A_NUMBER": RE_MATERIA_STR_A_INT,
  "JSON_RE_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL": RE_MATERIA_STR_A_SPECIAL,
  "JSON_RE_MATERIA_STRING_A_BOOLEAN": RE_MATERIA_STR_A_BOOL,
  "JSON_RE_MATERIA_STRING_A_ARRAY_VACIO": RE_MATERIA_STR_A_ARR_EMPTY,
  "JSON_RE_MATERIA_STRING_A_ARRAY_CON_DATO": RE_MATERIA_STR_A_ARR_DATA,
  "JSON_RE_MATERIA_STRING_A_OBJECT_VACIO": RE_MATERIA_STR_A_OBJ_EMPTY,
  "JSON_RE_MATERIA_STRING_A_OBJECT_CON_DATO": RE_MATERIA_STR_A_OBJ_DATA,
  "JSON_RE_MATERIA_STRING_A_VACIA": RE_MATERIA_STR_A_EMPTY,
  "JSON_RE_MATERIA_STRING_A_EXCEDE_DATO_LARGO": RE_MATERIA_STR_A_LONG,

  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_STRING": RE_USUARIO_OBJ_A_STR,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL": RE_USUARIO_OBJ_A_SPECIAL,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_NUMBER": RE_USUARIO_OBJ_A_INT,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN": RE_USUARIO_OBJ_A_BOOL,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO": RE_USUARIO_OBJ_A_ARR_EMPTY,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO": RE_USUARIO_OBJ_A_ARR_DATA,
  "JSON_RE_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO": RE_USUARIO_OBJ_A_OBJ_DATA,

  "JSON_RE_DV_STRING_A_NUMBER": RE_DV_STR_A_INT,
  "JSON_RE_DV_STRING_A_STRING_CARACTER_ESPECIAL": RE_DV_STR_A_SPECIAL,
  "JSON_RE_DV_STRING_A_BOOLEAN": RE_DV_STR_A_BOOL,
  "JSON_RE_DV_STRING_A_ARRAY_VACIO": RE_DV_STR_A_ARR_EMPTY,
  "JSON_RE_DV_STRING_A_ARRAY_CON_DATO": RE_DV_STR_A_ARR_DATA,
  "JSON_RE_DV_STRING_A_OBJECT": RE_DV_STR_A_OBJ_EMPTY,
  "JSON_RE_DV_STRING_A_OBJECT_CON_DATO": RE_DV_STR_A_OBJ_DATA,

  "JSON_RE_RUN_INTEGER_A_STRING": RE_RUN_INT_A_STR,
  "JSON_RE_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_RUN_INT_A_SPECIAL,
  "JSON_RE_RUN_INTEGER_A_BOOLEAN": RE_RUN_INT_A_BOOL,
  "JSON_RE_RUN_INTEGER_A_ARRAY_VACIO": RE_RUN_INT_A_ARR_EMPTY,
  "JSON_RE_RUN_INTEGER_A_ARRAY_CON_DATO": RE_RUN_INT_A_ARR_DATA,
  "JSON_RE_RUN_INTEGER_A_OBJECT": RE_RUN_INT_A_OBJ_EMPTY,
  "JSON_RE_RUN_INTEGER_A_OBJECT_CON_DATO": RE_RUN_INT_A_OBJ_DATA,

  "JSON_RE_FECHA_HORA_DE_STRING_A_NUMBER": RE_FECHA_HORA_DE_STR_A_INT,
  "JSON_RE_FECHA_HORA_DE_STRING_A_STRING_CARACTER_ESPECIAL": RE_FECHA_HORA_DE_STR_A_SPECIAL,
  "JSON_RE_FECHA_HORA_DE_STRING_A_BOOLEAN": RE_FECHA_HORA_DE_STR_A_BOOL,
  "JSON_RE_FECHA_HORA_DE_STRING_A_ARRAY_VACIO": RE_FECHA_HORA_DE_STR_A_ARR_EMPTY,
  "JSON_RE_FECHA_HORA_DE_STRING_A_ARRAY_CON_DATO": RE_FECHA_HORA_DE_STR_A_ARR_DATA,
  "JSON_RE_FECHA_HORA_DE_STRING_A_OBJECT": RE_FECHA_HORA_DE_STR_A_OBJ_EMPTY,
  "JSON_RE_FECHA_HORA_DE_STRING_A_OBJECT_CON_DATO": RE_FECHA_HORA_DE_STR_A_OBJ_DATA,
  "JSON_RE_FECHA_HORA_DE_SOLO_FECHA": RE_FECHA_HORA_DE_SOLO_FECHA,
  "JSON_RE_FECHA_HORA_DE_SOLO_HORA": RE_FECHA_HORA_DE_SOLO_HORA,

  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_STRING": RE_ENTIDAD_DES_COD_ID_INT_A_STR,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_ENTIDAD_DES_COD_ID_INT_A_SPECIAL,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_BOOLEAN": RE_ENTIDAD_DES_COD_ID_INT_A_BOOL,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_VACIO": RE_ENTIDAD_DES_COD_ID_INT_A_ARR_EMPTY,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_CON_DATO": RE_ENTIDAD_DES_COD_ID_INT_A_ARR_DATA,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT": RE_ENTIDAD_DES_COD_ID_INT_A_OBJ_EMPTY,
  "JSON_RE_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT_CON_DATO": RE_ENTIDAD_DES_COD_ID_INT_A_OBJ_DATA,

  //---------------------------

  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING": RI_ENTIDAD_DESP_INT_A_STR,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL": RI_ENTIDAD_DESP_INT_A_SPECIAL,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN": RI_ENTIDAD_DESP_INT_A_BOOL,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO": RI_ENTIDAD_DESP_INT_A_ARR_EMPTY,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO": RI_ENTIDAD_DESP_INT_A_ARR_DATA,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO": RI_ENTIDAD_DESP_INT_A_OBJ_EMPTY,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO": RI_ENTIDAD_DESP_INT_A_OBJ_DATA,
  "JSON_RI_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO": RI_ENTIDAD_DESP_INT_A_ZERO,

  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER": RI_CONFIG_DEST_OBJ_A_INT,
  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING": RI_CONFIG_DEST_OBJ_A_STR,
  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL": RI_CONFIG_DEST_OBJ_A_SPECIAL,
  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN": RI_CONFIG_DEST_OBJ_A_BOOL,
  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO": RI_CONFIG_DEST_OBJ_A_ARR_EMPTY,
  "JSON_RI_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO": RI_CONFIG_DEST_OBJ_A_ARR_DATA,

  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER": RI_DEST_ARR_A_INT,
  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING": RI_DEST_ARR_A_STR,
  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL": RI_DEST_ARR_A_SPECIAL,
  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN": RI_DEST_ARR_A_BOOL,
  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO": RI_DEST_ARR_A_ARR_EMPTY,
  "JSON_RI_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO": RI_DEST_ARR_A_ARR_DATA,

  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING": RI_ENTIDAD_DEST_ID_INT_A_STR,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL": RI_ENTIDAD_DEST_ID_INT_A_SPECIAL,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN": RI_ENTIDAD_DEST_ID_INT_A_BOOL,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO": RI_ENTIDAD_DEST_ID_INT_A_ARR_EMPTY,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO": RI_ENTIDAD_DEST_ID_INT_A_ARR_DATA,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO": RI_ENTIDAD_DEST_ID_INT_A_OBJ_EMPTY,
  "JSON_RI_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO": RI_ENTIDAD_DEST_ID_INT_A_OBJ_DATA,

  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING": RI_IS_EN_COPIA_BOOL_A_STR,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL": RI_IS_EN_COPIA_BOOL_A_SPECIAL,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER": RI_IS_EN_COPIA_BOOL_A_INT,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO": RI_IS_EN_COPIA_BOOL_A_ARR_EMPTY,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO": RI_IS_EN_COPIA_BOOL_A_ARR_DATA,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO": RI_IS_EN_COPIA_BOOL_A_OBJ_EMPTY,
  "JSON_RI_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO": RI_IS_EN_COPIA_BOOL_A_OBJ_DATA,

  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING": RI_DEST_REF_ARR_A_STR,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL": RI_DEST_REF_ARR_A_SPECIAL,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER": RI_DEST_REF_ARR_A_INT,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN": RI_DEST_REF_ARR_A_BOOL,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO": RI_DEST_REF_ARR_A_ARR_DATA,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO": RI_DEST_REF_ARR_A_OBJ_EMPTY,
  // "JSON_RI_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO": RI_DEST_REF_ARR_A_OBJ_DATA,

  "JSON_RI_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL": RI_FOLIO_STR_A_SPECIAL,
  "JSON_RI_FOLIO_STRING_A_INTEGER": RI_FOLIO_STR_A_INT,
  "JSON_RI_FOLIO_STRING_A_BOOLEAN": RI_FOLIO_STR_A_BOOL,
  "JSON_RI_FOLIO_STRING_A_ARRAY_VACIO": RI_FOLIO_STR_A_ARR_EMPTY,
  "JSON_RI_FOLIO_STRING_A_ARRAY_CON_DATO": RI_FOLIO_STR_A_ARR_DATA,
  "JSON_RI_FOLIO_STRING_A_OBJECT_VACIO": RI_FOLIO_STR_A_OBJ_EMPTY,
  "JSON_RI_FOLIO_STRING_A_OBJECT_CON_DATO": RI_FOLIO_STR_A_OBJ_DATA,

  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING": RI_TIPO_DOC_INT_A_STR,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL": RI_TIPO_DOC_INT_A_SPECIAL,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN": RI_TIPO_DOC_INT_A_BOOL,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO": RI_TIPO_DOC_INT_A_ARR_EMPTY,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO": RI_TIPO_DOC_INT_A_ARR_DATA,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO": RI_TIPO_DOC_INT_A_OBJ_EMPTY,
  "JSON_RI_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO": RI_TIPO_DOC_INT_A_OBJ_DATA,

  "JSON_RI_MATERIA_STRING_A_NUMBER": RI_MATERIA_STR_A_INT,
  "JSON_RI_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL": RI_MATERIA_STR_A_SPECIAL,
  "JSON_RI_MATERIA_STRING_A_BOOLEAN": RI_MATERIA_STR_A_BOOL,
  "JSON_RI_MATERIA_STRING_A_ARRAY_VACIO": RI_MATERIA_STR_A_ARR_EMPTY,
  "JSON_RI_MATERIA_STRING_A_ARRAY_CON_DATO": RI_MATERIA_STR_A_ARR_DATA,
  "JSON_RI_MATERIA_STRING_A_OBJECT_VACIO": RI_MATERIA_STR_A_OBJ_EMPTY,
  "JSON_RI_MATERIA_STRING_A_OBJECT_CON_DATO": RI_MATERIA_STR_A_OBJ_DATA,
  "JSON_RI_MATERIA_STRING_A_VACIA": RI_MATERIA_STR_A_EMPTY,
  "JSON_RI_MATERIA_STRING_A_EXCEDE_DATO_LARGO": RI_MATERIA_STR_A_LONG,

  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_STRING": RI_USUARIO_OBJ_A_STR,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL": RI_USUARIO_OBJ_A_SPECIAL,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_NUMBER": RI_USUARIO_OBJ_A_INT,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN": RI_USUARIO_OBJ_A_BOOL,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO": RI_USUARIO_OBJ_A_ARR_EMPTY,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO": RI_USUARIO_OBJ_A_ARR_DATA,
  "JSON_RI_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO": RI_USUARIO_OBJ_A_OBJ_DATA,

  "JSON_RI_DV_STRING_A_NUMBER": RI_DV_STR_A_INT,
  "JSON_RI_DV_STRING_A_STRING_CARACTER_ESPECIAL": RI_DV_STR_A_SPECIAL,
  "JSON_RI_DV_STRING_A_BOOLEAN": RI_DV_STR_A_BOOL,
  "JSON_RI_DV_STRING_A_ARRAY_VACIO": RI_DV_STR_A_ARR_EMPTY,
  "JSON_RI_DV_STRING_A_ARRAY_CON_DATO": RI_DV_STR_A_ARR_DATA,
  "JSON_RI_DV_STRING_A_OBJECT": RI_DV_STR_A_OBJ_EMPTY,
  "JSON_RI_DV_STRING_A_OBJECT_CON_DATO": RI_DV_STR_A_OBJ_DATA,

  "JSON_RI_RUN_INTEGER_A_STRING": RI_RUN_INT_A_STR,
  "JSON_RI_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL": RE_RUN_INT_A_SPECIAL,
  "JSON_RI_RUN_INTEGER_A_BOOLEAN": RI_RUN_INT_A_BOOL,
  "JSON_RI_RUN_INTEGER_A_ARRAY_VACIO": RI_RUN_INT_A_ARR_EMPTY,
  "JSON_RI_RUN_INTEGER_A_ARRAY_CON_DATO": RI_RUN_INT_A_ARR_DATA,
  "JSON_RI_RUN_INTEGER_A_OBJECT": RI_RUN_INT_A_OBJ_EMPTY,
  "JSON_RI_RUN_INTEGER_A_OBJECT_CON_DATO": RI_RUN_INT_A_OBJ_DATA,

  "JSON_RI_FECHA_HORA_DE_STRING_A_NUMBER": RI_FECHA_HORA_DE_STR_A_INT,
  "JSON_RI_FECHA_HORA_DE_STRING_A_STRING_CARACTER_ESPECIAL": RI_FECHA_HORA_DE_STR_A_SPECIAL,
  "JSON_RI_FECHA_HORA_DE_STRING_A_BOOLEAN": RI_FECHA_HORA_DE_STR_A_BOOL,
  "JSON_RI_FECHA_HORA_DE_STRING_A_ARRAY_VACIO": RI_FECHA_HORA_DE_STR_A_ARR_EMPTY,
  "JSON_RI_FECHA_HORA_DE_STRING_A_ARRAY_CON_DATO": RI_FECHA_HORA_DE_STR_A_ARR_DATA,
  "JSON_RI_FECHA_HORA_DE_STRING_A_OBJECT": RI_FECHA_HORA_DE_STR_A_OBJ_EMPTY,
  "JSON_RI_FECHA_HORA_DE_STRING_A_OBJECT_CON_DATO": RI_FECHA_HORA_DE_STR_A_OBJ_DATA,
  "JSON_RI_FECHA_HORA_DE_SOLO_FECHA": RI_FECHA_HORA_DE_SOLO_FECHA,
  "JSON_RI_FECHA_HORA_DE_SOLO_HORA": RI_FECHA_HORA_DE_SOLO_HORA,

  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_STRING": RI_ENTIDAD_DES_COD_ID_INT_A_STR,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_STRING_CARACTER_ESPECIAL": RI_ENTIDAD_DES_COD_ID_INT_A_SPECIAL,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_BOOLEAN": RI_ENTIDAD_DES_COD_ID_INT_A_BOOL,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_VACIO": RI_ENTIDAD_DES_COD_ID_INT_A_ARR_EMPTY,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_ARRAY_CON_DATO": RI_ENTIDAD_DES_COD_ID_INT_A_ARR_DATA,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT": RI_ENTIDAD_DES_COD_ID_INT_A_OBJ_EMPTY,
  "JSON_RI_ENTIDAD_DES_COD_ID_INTEGER_A_OBJECT_CON_DATO": RI_ENTIDAD_DES_COD_ID_INT_A_OBJ_DATA,
};

export const comunicacionRequest = {
  // Happy Paths
  "JSON_MINIMO_VALIDO": JSON_MINIMO_VALIDO,
  "JSON_CON_ARCHIVOS_ANEXOS": JSON_CON_ARCHIVOS_ANEXOS,
  "JSON_SWAGGER_MINIMUM": JSON_SWAGGER_MINIMUM,
  "JSON_CON_ARCHIVOS_ANEXOS_VACIOS": JSON_CON_ARCHIVOS_ANEXOS_VACIOS,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_CORTO,
  "JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO": JSON_CON_ARCHIVOS_ANEXOS_FILENAME_LARGO,

  // --- VARIACIONES INVÁLIDAS (CAMPOS ELIMINADOS) ---
  "JSON_SIN_CONFIGURACION_DESTINATARIOS": SIN_CONFIGURACION_DESTINATARIOS,
  "JSON_SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": SIN_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": SIN_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": SIN_IS_EN_COPIA_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS": INFO_VACIO_DESTINATARIOS_CONFIGURACION_DESTINATARIOS,
  "JSON_INFO_VACIO_CONFIGURACION_DESTINATARIOS": INFO_VACIO_CONFIGURACION_DESTINATARIOS,
  "JSON_SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID": SIN_ENTIDAD_DESPACHADORA_CODIFICADOR_ID,
  "JSON_SIN_FOLIO": SIN_FOLIO,
  "JSON_SIN_ID_TIPO_DOCUMENTO_OFICIAL": SIN_ID_TIPO_DOCUMENTO_OFICIAL,
  "JSON_SIN_MATERIA": SIN_MATERIA,
  "JSON_SIN_USUARIO_SOLICITANTE": SIN_USUARIO_SOLICITANTE,
  "JSON_SIN_RUN_USUARIO_SOLICITANTE": SIN_RUN_USUARIO_SOLICITANTE,
  "JSON_SIN_DV_USUARIO_SOLICITANTE": SIN_DV_USUARIO_SOLICITANTE,
  "JSON_INFO_VACIO_USUARIO_SOLICITANTE": INFO_VACIO_USUARIO_SOLICITANTE,

  // --- VARIACIONES INVÁLIDAS (TIPOS DE DATO) ---
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_STRING_CARACTER_ESPECIAL,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_BOOLEAN,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_VACIO,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_ARRAY_CON_DATO,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_VACIO,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_OBJECT_CON_DATO,
  "JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO": JSON_ENTIDAD_DESPACHADORA_CODIFICADOR_ID_INTEGER_A_SIN_DATO,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_INTEGER,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_STRING_CARACTER_ESPECIAL,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_BOOLEAN,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_VACIO,
  "JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO": JSON_CONFIGURACION_DESTINATARIOS_OBJECT_A_ARRAY_CON_DATO,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_INTEGER,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_STRING_CARACTER_ESPECIAL,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_BOOLEAN,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_VACIO,
  "JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO": JSON_DESTINATARIOS_CONFIGURACION_DESTINATARIOS_ARRAY_OBJ_A_ARRAY_CON_DATO,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_STRING_CARACTER_ESPECIAL,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_BOOLEAN,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_VACIO,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_ARRAY_CON_DATO,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_VACIO,
  "JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO": JSON_ENTIDAD_DESTINATARIA_CODIFICADOR_ID_DESTINATARIOS_INTEGER_A_OBJECT_CON_DATO,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_STRING_CARACTER_ESPECIAL,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_INTEGER,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_VACIO,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_ARRAY_CON_DATO,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_VACIO,
  "JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO": JSON_IS_EN_COPIA_DESTINATARIOS_BOOLEAN_A_OBJECT_CON_DATO,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_STRING_CARACTER_ESPECIAL,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_INTEGER,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_BOOLEAN,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_ARRAY_CON_DATO,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_VACIO,
  // "JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO": JSON_DESTINATARIOS_REFERENCIADOS_ARRAY_A_OBJECT_CON_DATO,
  "JSON_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL": JSON_FOLIO_STRING_A_STRING_CARACTER_ESPECIAL,
  "JSON_FOLIO_STRING_A_INTEGER": JSON_FOLIO_STRING_A_INTEGER,
  "JSON_FOLIO_STRING_A_BOOLEAN": JSON_FOLIO_STRING_A_BOOLEAN,
  "JSON_FOLIO_STRING_A_ARRAY_VACIO": JSON_FOLIO_STRING_A_ARRAY_VACIO,
  "JSON_FOLIO_STRING_A_ARRAY_CON_DATO": JSON_FOLIO_STRING_A_ARRAY_CON_DATO,
  "JSON_FOLIO_STRING_A_OBJECT_VACIO": JSON_FOLIO_STRING_A_OBJECT_VACIO,
  "JSON_FOLIO_STRING_A_OBJECT_CON_DATO": JSON_FOLIO_STRING_A_OBJECT_CON_DATO,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_STRING_CARACTER_ESPECIAL,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_BOOLEAN,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_VACIO,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_ARRAY_CON_DATO,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_VACIO,
  "JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO": JSON_ID_TIPO_DOCUMENTO_OFICIAL_INTEGER_A_OBJECT_CON_DATO,
  "JSON_MATERIA_STRING_A_NUMBER": JSON_MATERIA_STRING_A_NUMBER,
  "JSON_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL": JSON_MATERIA_STRING_A_STRING_CARACTER_ESPECIAL,
  "JSON_MATERIA_STRING_A_BOOLEAN": JSON_MATERIA_STRING_A_BOOLEAN,
  "JSON_MATERIA_STRING_A_ARRAY_VACIO": JSON_MATERIA_STRING_A_ARRAY_VACIO,
  "JSON_MATERIA_STRING_A_ARRAY_CON_DATO": JSON_MATERIA_STRING_A_ARRAY_CON_DATO,
  "JSON_MATERIA_STRING_A_OBJECT_VACIO": JSON_MATERIA_STRING_A_OBJECT_VACIO,
  "JSON_MATERIA_STRING_A_OBJECT_CON_DATO": JSON_MATERIA_STRING_A_OBJECT_CON_DATO,
  "JSON_MATERIA_STRING_A_VACIA": JSON_MATERIA_STRING_A_VACIA,
  "JSON_MATERIA_STRING_A_EXCEDE_DATO_LARGO": JSON_MATERIA_STRING_A_EXCEDE_DATO_LARGO,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING": JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL": JSON_USUARIO_SOLICITENTE_OBJECT_A_STRING_CARACTER_ESPECIAL,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_NUMBER": JSON_USUARIO_SOLICITENTE_OBJECT_A_NUMBER,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN": JSON_USUARIO_SOLICITENTE_OBJECT_A_BOOLEAN,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO": JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_VACIO,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO": JSON_USUARIO_SOLICITENTE_OBJECT_A_ARRAY_CON_DATO,
  "JSON_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO": JSON_USUARIO_SOLICITENTE_OBJECT_A_OBJECT_CON_DATO,
  "JSON_DV_STRING_A_NUMBER": JSON_DV_STRING_A_NUMBER,
  "JSON_DV_STRING_A_STRING_CARACTER_ESPECIAL": JSON_DV_STRING_A_STRING_CARACTER_ESPECIAL,
  "JSON_DV_STRING_A_BOOLEAN": JSON_DV_STRING_A_BOOLEAN,
  "JSON_DV_STRING_A_ARRAY_VACIO": JSON_DV_STRING_A_ARRAY_VACIO,
  "JSON_DV_STRING_A_ARRAY_CON_DATO": JSON_DV_STRING_A_ARRAY_CON_DATO,
  "JSON_DV_STRING_A_OBJECT": JSON_DV_STRING_A_OBJECT,
  "JSON_DV_STRING_A_OBJECT_CON_DATO": JSON_DV_STRING_A_OBJECT_CON_DATO,
  "JSON_RUN_INTEGER_A_STRING": JSON_RUN_INTEGER_A_STRING,
  "JSON_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL": JSON_RUN_INTEGER_A_STRING_CARACTER_ESPECIAL,
  "JSON_RUN_INTEGER_A_BOOLEAN": JSON_RUN_INTEGER_A_BOOLEAN,
  "JSON_RUN_INTEGER_A_ARRAY_VACIO": JSON_RUN_INTEGER_A_ARRAY_VACIO,
  "JSON_RUN_INTEGER_A_ARRAY_CON_DATO": JSON_RUN_INTEGER_A_ARRAY_CON_DATO,
  "JSON_RUN_INTEGER_A_OBJECT": JSON_RUN_INTEGER_A_OBJECT,
  "JSON_RUN_INTEGER_A_OBJECT_CON_DATO": JSON_RUN_INTEGER_A_OBJECT_CON_DATO,
};