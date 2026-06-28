import type { Schema, Struct } from '@strapi/strapi';

export interface BloquesPiePaginaColumnafooter extends Struct.ComponentSchema {
  collectionName: 'components_bloques-pie-pagina_columna_footers';
  info: {
    displayName: 'Columna Footer';
    icon: 'bulletList';
  };
  attributes: {
    enlaces: Schema.Attribute.Component<'independientes.link', true>;
    tituloColumna: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Productos'>;
  };
}

export interface ContenidoCuerpo extends Struct.ComponentSchema {
  collectionName: 'components_bloque_inicio_cuerpos';
  info: {
    displayName: 'cuerpo';
  };
  attributes: {
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Este texto es un ejemplo dise\u00F1ado exclusivamente para rellenar espacios en blanco evaluar el impacto visual de la tipograf\u00EDa, el interlineado y la estructura del dise\u00F1o. Al leer estas l\u00EDneas, notar\u00E1s que este texto es un ejemplo sin un fin literario real. El objetivo principal es ver c\u00F3mo fluyen los p\u00E1rrafos en la pantalla o en el papel. Mientras observas la distribuci\u00F3n de las palabras, recuerda que este texto es un ejemplo y que ser\u00E1 sustituido por el contenido definitivo una vez que el proyecto est\u00E9 aprobado.'>;
    imagenDerecha: Schema.Attribute.Boolean;
    Media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Subtitulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subtitulo de ejemplo'>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo de ejemplo'>;
  };
}

export interface ContenidoPregunta extends Struct.ComponentSchema {
  collectionName: 'components_contenido';
  info: {
    description: 'pregunta con t\u00EDtulo y descripci\u00F3n';
    displayName: 'Pregunta';
  };
  attributes: {
    descripcion: Schema.Attribute.RichText & Schema.Attribute.Required;
    titulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface ContenidoPreguntasFrecuentes extends Struct.ComponentSchema {
  collectionName: 'contenido_preguntas_frecuentes';
  info: {
    description: 'Secci\u00F3n de FAQ con t\u00EDtulo general y lista de preguntas';
    displayName: 'Preguntas Frecuentes';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    preguntas: Schema.Attribute.Component<'contenido.pregunta', true>;
    titulo_general: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface ContenidoTarjetaIndividual extends Struct.ComponentSchema {
  collectionName: 'components_contenido_tarjeta-individual';
  info: {
    description: 'Tarjeta individual';
    displayName: 'Tarjeta individual';
    icon: 'microchip';
  };
  attributes: {
    Imagen: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface ContenidoTarjetas extends Struct.ComponentSchema {
  collectionName: 'components_contenido_tarjetas';
  info: {
    description: 'Componente de tarjetas';
    displayName: 'Tarjetas';
    icon: 'gridOn';
  };
  attributes: {
    Tarjetas: Schema.Attribute.Component<'contenido.tarjeta-individual', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 1;
        },
        number
      >;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Tecnolog\u00EDas y Herramientas'>;
  };
}

export interface ContenidoTarjetasMetricas extends Struct.ComponentSchema {
  collectionName: 'components_bloque_inicio_tarjetas_metricas';
  info: {
    displayName: 'tarjetasMetricas';
  };
  attributes: {
    descripcionMetrica: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Descripcion de metrica de ejemplo'>;
    Metrica: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Metrica de ejemplo'>;
  };
}

export interface ContenidoTarjetascontenido extends Struct.ComponentSchema {
  collectionName: 'Tarjetas de Contenido';
  info: {
    description: 'Tarjetas para mostrar contenido';
    displayName: 'Tarjetas de Contenido';
  };
  attributes: {
    boton: Schema.Attribute.Component<'independientes.boton', true>;
    caracteristicas: Schema.Attribute.Component<
      'contenido.tarjeta-individual',
      true
    >;
    categoria: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Categoria ejemplo'>;
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Descripcion de ejemplo'>;
    destacado: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    enlacesExternos: Schema.Attribute.Component<
      'servicios-externos.redes-sociales',
      true
    >;
    fecha: Schema.Attribute.Date;
    imagen: Schema.Attribute.Media<'images'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo de ejemplo'>;
  };
}

export interface ContenidoTituloPrincipal extends Struct.ComponentSchema {
  collectionName: 'components_contenido_titulo_principals';
  info: {
    displayName: 'Titulo Principal';
  };
  attributes: {
    descripcion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Descripcion de ejemplo'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo de ejemplo'>;
  };
}

export interface IndependientesBoton extends Struct.ComponentSchema {
  collectionName: 'components_independientes_botons';
  info: {
    displayName: 'boton';
    icon: 'discuss';
  };
  attributes: {
    abrirNuevaPestana: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    texto: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/ejemplo'>;
  };
}

export interface IndependientesLink extends Struct.ComponentSchema {
  collectionName: 'components_componentes_links';
  info: {
    description: 'Enlace reutilizable para men\u00FAs';
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    abrirNuevaPestana: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    texto: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Texto de ejemplo'>;
    url: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://ejemplo.com'>;
  };
}

export interface MediosVisualesCarrusel extends Struct.ComponentSchema {
  collectionName: 'components_carrusel_carrusels';
  info: {
    description: 'carrusel de im\u00E1genes';
    displayName: 'Carrusel';
    icon: 'stack';
  };
  attributes: {
    autoReproductor: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Cartas: Schema.Attribute.Component<'medios-visuales.slide', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo de ejemplo'>;
    velocidad: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
  };
}

export interface MediosVisualesGaleria extends Struct.ComponentSchema {
  collectionName: 'components_galerias';
  info: {
    description: 'Galer\u00EDa de im\u00E1genes con dise\u00F1o configurable';
    displayName: 'Galer\u00EDa';
    icon: 'grid';
  };
  attributes: {
    Cartas: Schema.Attribute.Component<'medios-visuales.imagen-galeria', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 1;
        },
        number
      >;
    Columnas: Schema.Attribute.Enumeration<['2', '3', '4']> &
      Schema.Attribute.DefaultTo<'3'>;
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }> &
      Schema.Attribute.DefaultTo<'Descripcion de galeria de ejemplo'>;
    Efecto: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    MostrarTitulos: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Este es un titulo de ejemplo'>;
  };
}

export interface MediosVisualesImagenGaleria extends Struct.ComponentSchema {
  collectionName: 'components_imagen_galeria';
  info: {
    description: 'imagen y metadatos';
    displayName: 'Imagen de galer\u00EDa';
    icon: 'picture';
  };
  attributes: {
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 250;
      }> &
      Schema.Attribute.DefaultTo<'Descripcion de imagen de ejemplo'>;
    Imagen: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Carta galeria'>;
  };
}

export interface MediosVisualesSlide extends Struct.ComponentSchema {
  collectionName: 'components_carrusel_slides';
  info: {
    description: 'Componente para diapositivas de carrusel';
    displayName: 'Slide';
    icon: 'picture';
  };
  attributes: {
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'Descripcion de slide de ejemplo'>;
    Imagen: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://ejemplo.com'>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Carta carrusel'>;
  };
}

export interface PreciosCaracteristica extends Struct.ComponentSchema {
  collectionName: 'components_componentes_caracteristica';
  info: {
    displayName: 'Caracter\u00EDstica';
  };
  attributes: {
    texto: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }> &
      Schema.Attribute.DefaultTo<'Ventaja del plan'>;
  };
}

export interface PreciosTarjetasPrecios extends Struct.ComponentSchema {
  collectionName: 'components_precio_tarjetas';
  info: {
    description: 'Tarjeta con un precio \u00FAnico y fijo';
    displayName: 'Tarjeta de Precio';
  };
  attributes: {
    boton: Schema.Attribute.Component<'independientes.boton', false>;
    caracteristicas: Schema.Attribute.Component<
      'precios.caracteristica',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 15;
          min: 1;
        },
        number
      >;
    descripcion: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Esta es una descripci\u00F3n de ejemplo para la tarjeta de precio.'>;
    insignia: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'Oferta'>;
    logo: Schema.Attribute.Media<'images'>;
    moneda: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }> &
      Schema.Attribute.DefaultTo<'MXN'>;
    nota_precio: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }> &
      Schema.Attribute.DefaultTo<'Nota sobre el precio (ej. IVA incluido)'>;
    precio: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    subtitulo: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }> &
      Schema.Attribute.DefaultTo<'Subt\u00EDtulo de ejemplo'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }> &
      Schema.Attribute.DefaultTo<'T\u00EDtulo de ejemplo'>;
  };
}

export interface PresentacionPaginaHeroeditorial
  extends Struct.ComponentSchema {
  collectionName: 'components_secciones_hero_asimetricos';
  info: {
    description: 'Hero premium con rejilla rota, texto flotante e imagen de gran escala descentrada.';
    displayName: 'Hero Editorial Asim\u00E9trico';
    icon: 'layout';
  };
  attributes: {
    boton: Schema.Attribute.Component<'independientes.boton', false>;
    conceptoClave: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CREATIVIDAD'>;
    imagenProtagonista: Schema.Attribute.Media<
      'images' | 'videos' | 'audios',
      true
    >;
    parrafoDescriptivo: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'No seguimos tendencias; dise\u00F1amos la ingenier\u00EDa que las provoca. Una mirada cruda a nuestra obsesi\u00F3n por la perfecci\u00F3n estructural.'>;
    tituloPrincipal: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo principal de ejemplo'>;
  };
}

export interface PresentacionPaginaSeccionPrincipal
  extends Struct.ComponentSchema {
  collectionName: 'components_bloque_inicio_seccion_principals';
  info: {
    displayName: 'seccionPrincipal';
  };
  attributes: {
    Descripcion: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Descripcion de ejemplo para la seccion principal'>;
    Media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Titulo de ejemplo'>;
  };
}

export interface ServiciosExternosCorreo extends Struct.ComponentSchema {
  collectionName: 'components_formularios_contactos';
  info: {
    displayName: 'Formulario Contacto';
    icon: 'envelope';
  };
  attributes: {
    boton: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Enviar'>;
    correo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'tucorreo@ejemplo.com'>;
    correo_destino: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'tucorreopersonal@gmail.com'>;
    mensaje: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Escribe tu mensaje...'>;
    mensaje_exito: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'\u00A1Mensaje enviado exitosamente! Me pondr\u00E9 en contacto contigo pronto.'>;
    nombre: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Tu nombre'>;
    telefono: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Tu tel\u00E9fono'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Cont\u00E1ctanos'>;
  };
}

export interface ServiciosExternosMapa extends Struct.ComponentSchema {
  collectionName: 'components_secciones_mapas';
  info: {
    displayName: 'Maps Google';
    icon: 'pin';
  };
  attributes: {
    anchoCompleto: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mapUrl: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://maps.app.goo.gl/Tc8LMY9imtVUvCPi7'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Nuestra Ubicaci\u00F3n'>;
  };
}

export interface ServiciosExternosRedesSociales extends Struct.ComponentSchema {
  collectionName: 'components_bloques-pie-pagina_redes_sociales';
  info: {
    displayName: 'redesSociales';
  };
  attributes: {
    icono: Schema.Attribute.Media<'images' | 'files'>;
    url: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://ejemplo.com'>;
  };
}

export interface ServiciosExternosWhatsappFlotante
  extends Struct.ComponentSchema {
  collectionName: 'components_config_whatsapp_flotantes';
  info: {
    displayName: 'WhatsApp Flotante';
    icon: 'message';
  };
  attributes: {
    activo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    mensajePredeterminado: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hola, me gustar\u00EDa conocer m\u00E1s informaci\u00F3n :)'>;
    telefono: Schema.Attribute.String;
  };
}

export interface ServiciosExternosYoutube extends Struct.ComponentSchema {
  collectionName: 'components_secciones_video_youtubes';
  info: {
    description: 'Inserta un video de YouTube mediante URL con controles completos y sin l\u00EDmites de peso.';
    displayName: 'Video de YouTube';
    icon: 'play';
  };
  attributes: {
    anchoCompleto: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    tituloSeccion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mira nuestro \u00FAltimo metraje'>;
    youtubeUrl: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://www.youtube.com/watch?v=BAAhEWbnOak'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'bloques-pie-pagina.columnafooter': BloquesPiePaginaColumnafooter;
      'contenido.cuerpo': ContenidoCuerpo;
      'contenido.pregunta': ContenidoPregunta;
      'contenido.preguntas-frecuentes': ContenidoPreguntasFrecuentes;
      'contenido.tarjeta-individual': ContenidoTarjetaIndividual;
      'contenido.tarjetas': ContenidoTarjetas;
      'contenido.tarjetas-metricas': ContenidoTarjetasMetricas;
      'contenido.tarjetascontenido': ContenidoTarjetascontenido;
      'contenido.titulo-principal': ContenidoTituloPrincipal;
      'independientes.boton': IndependientesBoton;
      'independientes.link': IndependientesLink;
      'medios-visuales.carrusel': MediosVisualesCarrusel;
      'medios-visuales.galeria': MediosVisualesGaleria;
      'medios-visuales.imagen-galeria': MediosVisualesImagenGaleria;
      'medios-visuales.slide': MediosVisualesSlide;
      'precios.caracteristica': PreciosCaracteristica;
      'precios.tarjetas-precios': PreciosTarjetasPrecios;
      'presentacion-pagina.heroeditorial': PresentacionPaginaHeroeditorial;
      'presentacion-pagina.seccion-principal': PresentacionPaginaSeccionPrincipal;
      'servicios-externos.correo': ServiciosExternosCorreo;
      'servicios-externos.mapa': ServiciosExternosMapa;
      'servicios-externos.redes-sociales': ServiciosExternosRedesSociales;
      'servicios-externos.whatsapp-flotante': ServiciosExternosWhatsappFlotante;
      'servicios-externos.youtube': ServiciosExternosYoutube;
    }
  }
}
