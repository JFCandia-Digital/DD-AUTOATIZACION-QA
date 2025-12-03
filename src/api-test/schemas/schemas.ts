const baseErrorStructure = {
  "status": "number",
  "message": "string",
  "errorCode": "number",
  "error": "string",
  "count": "number",
  "timestamp": "string"
};

export const errorStructures = {
  "ERROR_401_Unauthorized": { ...baseErrorStructure },
  "ERROR_400_Bad_Request": { ...baseErrorStructure },
  "ERROR_400_Bad_Request_con_errorCause": { ...baseErrorStructure, "errorCause": "string" },
  "ERROR_404_Not_Found_con_errorCause": { ...baseErrorStructure, "errorCause": "string" }
};

// Estructuras base reutilizables
const baseResponse = {
  "status": "number",
  "message": "string",
  "count": "number",
  "timestamp": "string"
};

const baseEntidad = {
  "id": "number",
  "entidadCodificadorId": "number",
  "nombre": "string",
  "isPrincipal": "boolean",
  "entidadDependenciaId": "number",
  "entidadDependenciaCodificadorId": "number",
  "sigla": "string",
  "isActiva": "boolean"
};

const baseEntidadDetalle = {
  ...baseEntidad,
  "entidadDependenciaNombre": "string"
};

const baseBusqueda = {
  "id": "number",
  "nombre": "string",
  "isPrincipal": "boolean",
  "entidadDependenciaId?": "number",
  "entidadDependenciaCodificadorId?": "number",
  "entidadDependenciaNombre?": "string",
  "entidadCodificadorId?": "number",
  "sigla": "string",
  "isActiva": "boolean"
};

const baseInfoCreador = {
  "entidadId": "number",
  "entidadNombre": "string",
  "usuarioCargo": "string",
  "usuarioEmail": "string",
  "usuarioId": "number",
  "usuarioNombre": "string",
  "usuarioRun": "string"
};

const baseFirmante = {
  "entidadId": "number",
  "entidadNombre": "string",
  "usuarioCargo": "string",
  "usuarioId": "number",
  "usuarioNombre": "string",
  "usuarioRun": "string"
};

const baseFirmanteTipo2 = {
  "nombreAsignado": "string",
  "cargoAsignado": "string",
  "nombreEntidad": "string",
  "isSubrogado": "boolean",
  "estado": "string",
  "fechaRealizado": "string",
  "comentario": "string"
};

const genericResponse = {
  ...baseResponse,
  "result": baseEntidadDetalle
};

const baseUsuarioEntidad = {
  "run": "number",
  "dv": "string",
  "correoInstitucional": "string",
  "cargo": "string",
  "entidad": {
    "nombre": "string",
    "id": "number"
  },
  "nombreCompleto": "string",
  "roles": ["string"],
  "id": "number"
};

const baseTareaRecepcion = {
  "tareaId": "number",
  "fechaRecepcion": "string",
  "entidadDestinataria": "number",
  "entidadDestinatariaCodificadorId": "number",
  "entidadDestinatariaNombre": "string",
  "comunicacionId": "number",
  "comunicacionMateria": "string",
  "comunicacionFolio": "string",
  "tipoDocumentoOficial": "string",
  "estadoComunicacion": "string",
  "estadoComunicacionDescripcion": "string",
  "entidadDespachadora": "string",
  "entidadDespachadoraId": "number",
  "entidadDespachadoraCodificadorId": "number",
  "entidadCreadora": "string",
  "entidadCreadoraId": "number",
  "entidadCreadoraCodificadorId": "number",
};

const baseResultComunicacionDespachar = {
  "comunicacionId": "number",
  "folio": "string",
  "materia": "string",
  "tipoDocumento": "string",
  "estado": "string",
  "fechaActualizacion": "string",
  "entidadCreadora": "string",
  "entidadDespachadora": "string",
  "entidadCreadoraId": "number",
  "entidadDespachadoraId": "number",
  "entidadCreadoraCodificadorId": "number",
  "entidadDespachadoraCodificadorId": "number"
};

// Estructuras optimizadas
export const successStructures = {
  "AUTH_TOKEN_EXITOSO": {
    "access_token": "string",
    "token_type": "string",
    "expires_in": "number",
    "scope": "string"
  },

  "JSON_RESPONSE_PENDIENTES_RECEPCION": {
    ...baseResponse,
    "result": [baseTareaRecepcion],
    "total_count": "number",
    "total_pages": "number",
    "page": "number"
  },

  "JSON_RESPONSE_RESULT_SIN_DATOS": {
    ...baseResponse,
    "result": [],
    "total_count": "number",
    "total_pages": "number",
    "page": "number"
  },

  "JSON_RESPONSE_ENTIDAD_TOKEN": {
    ...genericResponse
  },

  "JSON_RESPONSE_PADRE_FAMILIA": {
    ...genericResponse
  },

  "JSON_RESPONSE_ENTIDAD_ID": {
    ...baseResponse,
    "result": "number"
  },

  "JSON_RESPONSE_DEPENDIENTES": {
    ...baseResponse,
    "result": [baseEntidad]
  },

  "JSON_RESPONSE_IDENTIFICADORES_CODIFICADOR_IDS": {
    ...baseResponse,
    "result": "object"
  },

  "JSON_RESPONSE_ROL": {
    ...baseResponse,
    "result": [{
      "id": "number",
      "codigo": "string",
      "descripcion": "string"
    }]
  },

  "JSON_RESPONSE_TIPO_DOCUMENTO": {
    ...baseResponse,
    "result": [
      {
        "grupo": "string",
        "tiposDocumentoOficial": [
          {
            "id": "number",
            "descripcion": "string"
          }
        ]
      }
    ]
  },

  "JSON_RESPONSE_GET_DESPACHAR_ID": {
    ...baseResponse,
    "result": {
      "comunicacionId": "number",
      "destinatarios": {
        "usuariosDestinatarios": "object"
      },
      "documentoPrincipal": {
        "documentoId": "number",
        "fechaCreacion": "string",
        "id": "string",
        "materia": "string",
        "nombreArchivo": "string",
        "tipoDoc": "string",
        "tipoDocId": "number",
        "reservado": "boolean",
        "infoCertificados": "object"
      },
      "documentosAnexos": "object",
      "entidadCreadora": {
        "nombre": "string",
        "id": "number"
      },
      "infoCreador": baseInfoCreador,
      "infoFirmas": {
        "firmantes": [baseFirmante]
      },
      "infoVisaciones": {
        "tipo": "string",
        "visadores": "object"
      }
    }
  },

  "JSON_RESPONSE_GET_TRAZABILIDAD": {
    ...baseResponse,
    "result": {
      "idComunicacion": "number",
      "estadoTramitacionDescripcion": "string",
      "nombreEntidadDespachadora": "string",
      "idEntidadDespachadora": "number",
      "documento": {
        "materia": "string",
        "tipoDoc": "string",
        "reservado": "boolean",
        "isDatosSensibles": "boolean",
        "infoCertificados": "object",
        "codigoVerificacion": "string"
      },
      "infoVisaciones": "object",
      "infoFirmas": [
        {
          "nivelLista": "number",
          "firmantes": [baseFirmanteTipo2]
        }
      ],
      "entidadDestinatarias": "object",
      "infoCreacion": {
        "nombreUsuarioCreador": "string",
        "fechaCreacion": "string",
        "fechaInicio": "string",
        "nombreEntidadCreadora": "string",
        "idEntidadCreadora": "number",
        "entidadCreadoraCodificadorId": "object"
      },
      "destinatariosEmail": "object",
      "tipoTramitacionDescripcion": "string",
      "tipoVisacionDescripcion": "string",
      "anexos": "object",
      "infoFolioDespacho": "object"
    }
  },

  "JSON_RESPONSE_GET_DESPACHAR_ID_": {
    ...baseResponse,
    "result": {
      "idComunicacion": "number",
      "estadoTramitacionDescripcion": "string",
      "nombreEntidadDespachadora": "string",
      "idEntidadDespachadora": "number",
      "documento": {
        "materia": "string",
        "tipoDoc": "string",
        "reservado": "boolean",
        "isDatosSensibles": "boolean",
        "infoCertificados": "object",
        "codigoVerificacion": "string"
      },
      "infoVisaciones": "object",
      "infoFirmas": [
        {
          "nivelLista": "number",
          "firmantes": [baseFirmanteTipo2]
        }
      ],
      "entidadDestinatarias": "object",
      "infoCreacion": {
        "nombreUsuarioCreador": "string",
        "fechaCreacion": "string",
        "fechaInicio": "string",
        "nombreEntidadCreadora": "string",
        "idEntidadCreadora": "number",
        "entidadCreadoraCodificadorId": "object"
      },
      "destinatariosEmail": "object",
      "tipoTramitacionDescripcion": "string",
      "tipoVisacionDescripcion": "string",
      "anexos": "object",
      "infoFolioDespacho": "object"
    }
  },

  "COMUNICACION_DESPACHAR_EXITOSA": {
    ...baseResponse,
    "result": {
      "id": "number",
      "fechaDespacho": "string"
    }
  },

  "JSON_RESPONSE_BUSCAR_SALIENTES": {
    ...baseResponse,
    "result": [baseResultComunicacionDespachar],
    "total_count": "number",
    "total_pages": "number",
    "page": "number"
  },

  "JSON_RESPONSE_ENTIDADES": {
    ...baseResponse,
    "result": [baseBusqueda],
    "total_count": "number",
    "total_pages": "number",
    "page": "number"
  },

  "JSON_RESPONSE_USUARIOS": {
    ...baseResponse,
    "result": [baseUsuarioEntidad],
    "total_count": "number",
    "total_pages": "number",
    "page": "number"
  },

  "JSON_RESPONSE_REGISTRO_EXTERNO": {
    ...baseResponse,
    "result": {
      "id": "number",
      "fechaDespacho": "string"
    }
  },

  "JSON_RESPONSE_REGISTRO_INCIDENCIA": {
    ...baseResponse,
    "result": {
      "id": "number",
      "fechaDespacho": "string"
    }
  }
};