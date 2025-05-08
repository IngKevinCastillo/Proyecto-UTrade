export class Productos {
  nombre?: string;
  correo?: string;
  precio?: number;
  fecha?: string;
  tiempoTranscurrido?: string;
  ubicacion?: string;
  userAvatar?: string;
  title?: string;
  category?: string;
  description?: string;
  fotos?: string[];

  constructor(
    nombre?: string,
    precio?: number,
    correo?: string,
    fecha?: string,
    tiempoTranscurrido?: string,
    ubicacion?: string,
    userAvatar?: string,
    title?: string,
    category?: string,
    description?: string,
    fotos?: string[]
  ) {
    this.nombre = nombre;
    this.correo = correo;
    this.precio = precio;
    this.fecha = fecha;
    this.tiempoTranscurrido = tiempoTranscurrido;
    this.ubicacion = ubicacion;
    this.userAvatar = userAvatar;
    this.title = title;
    this.category = category;
    this.description = description;
    this.fotos = fotos;
  }
}

export const productosLista: Productos[] = [
  new Productos(
    "Rosa Manjarrez",
    300000,
    "@rosamanjarrez",
    "17/04/2025",
    "2h",
    "Universidad Popular del Cesar",
    "icons/oceana.png",
    "APARTAESTUDIO",
    "renta",
    "Acogedor apartaestudio ideal para estudiantes o parejas jóvenes. Diseño moderno con ambiente tipo loft.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Alberto Pérez",
    45000,
    "@albertoperez",
    "16/04/2025",
    "5h",
    "Centro Comercial Las Flores",
    "icons/oceana.png",
    "Chaqueta de Jean",
    "compras",
    "Chaqueta de jean unisex, disponible en todas las tallas. Calidad garantizada.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Camila Gómez",
    900000,
    "@camila",
    "15/04/2025",
    "1d",
    "Barrio San Jorge",
    "icons/oceana.png",
    "Sofá en L de 3 puestos",
    "compras",
    "Sofá cómodo y moderno en tela gris. Perfecto para sala o estudio.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Rosario López",
    350000,
    "@rosariolopez",
    "14/04/2025",
    "3d",
    "Avenida Simón Bolívar",
    "icons/oceana.png",
    "Habitación amplia con baño",
    "renta",
    "Habitación amplia con cama doble, baño privado, internet y aire acondicionado.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Aurelio Martínez",
    60000,
    "@aureliomartinez",
    "14/04/2025",
    "12h",
    "Centro Comercial Guatapurí",
    "icons/oceana.png",
    "Vestido floral talla M",
    "compras",
    "Vestido casual con estampado floral, ideal para clima cálido.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Aristocracia",
    550000,
    "@aristocracia45",
    "13/04/2025",
    "2d",
    "Zona Industrial Norte",
    "icons/oceana.png",
    "Comedor de madera 4 puestos",
    "compras",
    "Comedor rústico artesanal en madera de roble. Incluye mesa y 4 sillas.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Juan Estrada",
    280000,
    "@juanestrada",
    "13/04/2025",
    "1d",
    "Frente a la UPC Sabanas",
    "icons/oceana.png",
    "Cuarto individual para estudiantes",
    "renta",
    "Cuarto con cama sencilla, closet, ventilador y escritorio. Baño compartido.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Rosalva",
    40000,
    "@rosalva",
    "12/04/2025",
    "6h",
    "Calle 10 #5-30",
    "icons/oceana.png",
    "Camisa estampada hombre",
    "compras",
    "Camisa de algodón con diseño estampado. Tallas S a XL.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Stiwart",
    750000,
    "@stiwart",
    "11/04/2025",
    "5d",
    "Av. Fundadores",
    "icons/oceana.png",
    "Cama doble con colchón",
    "compras",
    "Cama de madera con respaldo tapizado. Incluye colchón ortopédico.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  ),
  new Productos(
    "Don José",
    320000,
    "@donjose",
    "10/04/2025",
    "1sem",
    "Cra 12 con Calle 15",
    "icons/oceana.png",
    "Habitación para señoritas",
    "renta",
    "Cuarto individual en ambiente familiar. Baño privado, incluye servicios.",
    ["icons/cuarto1.png", "icons/cuarto2.jpg", "icons/cuarto3.jpg"]
  )
];
