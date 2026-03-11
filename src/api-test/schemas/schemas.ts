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
  "entidadId": "number",
  "entidadCodificadorId": "number",
  "entidadNombre": "string",
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
  "entidadId": "number",
  "entidadNombre": "string",
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
  "correoInstitucional": "string",
  "usuarioId": "number",
  "nombreCompleto": "string",
  "usuarioRun": "string"
};

const baseFirmante = {
  "entidadId": "number",
  "entidadNombre": "string",
  "usuarioCargo": "string",
  "usuarioId": "number",
  "nombreCompleto": "string",
  "usuarioRun": "string"
};

const baseUsuarioResumen = {
  "usuarioId": "number",
  "entidadId": "number",
  "entidadNombre": "string",
  "usuarioRun?": "string",
  "nombreCompleto?": "string",
  "correoInstitucional?": "string",
  "usuarioCargo?": "string"
};

const baseDocumentoPrincipal = {
  "documentoId": "number",
  "fechaCreacion": "string",
  "id": "string",
  "materia": "string",
  "nombreArchivo": "string",
  "tipoDoc": "string",
  "tipoDocId": "number",
  "reservado": "boolean",
  "infoCertificados": [
    {
      "runFirmante": "string",
      "nombreFirmante": "string",
      "fechaFirma": "string"
    }
  ]
};

const baseAnexo = {
  "id": "string",
  "nombreArchivo": "string",
  "reservado": "boolean"
};

const baseEntidadResumen = {
  "entidadId": "number",
  "entidadNombre": "string"
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
  "dv": "string",
  "entidad": {
    "entidadId": "number",
    "entidadNombre": "string",
    "entidadCodificadorId?": "number"
  },
  "roles": ["string"],
  "usuarioId": "number",
  "usuarioRun": "string",
  "nombreCompleto": "string",
  "correoInstitucional": "string",
  "usuarioCargo": "string"
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

const baseItemCodigoDescripcion = {
  "codigo": "string",
  "descripcion": "string",
  "id": "number"
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
    "status": "number",
    "message": "string",
    "count": "number",
    "timestamp": "string",
    "result": {
      "comunicacionId": "number",
      "destinatarios": {
        "correos": "string",
        "usuariosDestinatarios": [] // Cambiado de "object" a [] para mayor precisión
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
        "infoCertificados": []
      },
      "documentosAnexos": [],
      "entidadCreadora": {
        "entidadId": "number",
        "entidadNombre": "string"
      },
      "infoCreador": baseUsuarioResumen,
      "infoFirmas": {
        "firmantes": [baseFirmante]
      },
      "infoVisaciones": {
        "tipo": "string",
        "visadores": []
      },
      "tipoPlataformaOrigen": "string",
      "tipoTramitacion": "string",
      "tipoTramitacionDescripcion": "string",
      "estadoTramitacion": "string",
      "estadoTramitacionDescripcion": "string"
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
  },

  "JSON_RESPONSE_TIPOS_PROCEDIMIENTO": {
    ...baseResponse,
    "result": [baseItemCodigoDescripcion]
  },
};