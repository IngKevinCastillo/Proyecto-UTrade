// opcionesReporte.ts
export interface OpcionReporte {
    id: string;
    texto: string;
    tieneSubopciones: boolean;
    idPadre?: string;
  }
  
  export interface OpcionesReporte {
    [key: string]: OpcionReporte[];
  }
  
  export const opcionesReporte: OpcionesReporte = {
    principal: [
      { id: 'violento', texto: 'Contenido violento, perturbador o que incita al odio', tieneSubopciones: true },
      { id: 'spam', texto: 'Spam', tieneSubopciones: true },
      { id: 'info_falsa', texto: 'Información falsa', tieneSubopciones: true },
      { id: 'restringido', texto: 'Venta o promoción de artículos restringidos', tieneSubopciones: true },
      { id: 'adultos', texto: 'Contenido para adultos', tieneSubopciones: true },
      { id: 'fraude', texto: 'Estafa, fraude o suplantación de identidad', tieneSubopciones: true },
      { id: 'no_ver', texto: 'No quiero ver esto', tieneSubopciones: true }
    ],
    fraude: [
      { id: 'fraude_estafa', texto: 'Fraude o estafa', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'producto_sospechoso', texto: 'Productos o servicios sospechosos', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'contacto_sospechoso', texto: 'Contacto sospechoso o molesto', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'enlaces_sospechosos', texto: 'Enlaces sospechosos', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'contenido_molesto', texto: 'Contenido molesto', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'suplantacion_negocio', texto: 'Se hace pasar por un negocio', tieneSubopciones: false, idPadre: 'fraude' },
      { id: 'suplantacion_persona', texto: 'Se hace pasar por una persona', tieneSubopciones: false, idPadre: 'fraude' }
    ],
    adultos: [
      { id: 'amenaza_imagenes', texto: 'Amenaza con compartir imágenes mías sin ropa', tieneSubopciones: false, idPadre: 'adultos' },
      { id: 'prostitucion', texto: 'Parece prostitución', tieneSubopciones: false, idPadre: 'adultos' },
      { id: 'imagenes_compartidas', texto: 'Se compartieron imágenes mías sin ropa', tieneSubopciones: false, idPadre: 'adultos' },
      { id: 'explotacion_sexual', texto: 'Parece explotación sexual', tieneSubopciones: false, idPadre: 'adultos' },
      { id: 'desnudos', texto: 'Desnudos o actividad sexual', tieneSubopciones: false, idPadre: 'adultos' }
    ],
    restringido: [
      { id: 'drogas', texto: 'Drogas', tieneSubopciones: false, idPadre: 'restringido' },
      { id: 'armas', texto: 'Armas', tieneSubopciones: false, idPadre: 'restringido' },
      { id: 'animales', texto: 'Animales', tieneSubopciones: false, idPadre: 'restringido' }
    ]
    // Puedes agregar más categorías aquí
  };
  