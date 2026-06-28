import SeccionPrincipal from "./blocks/SeccionPrincipal";
import Cuerpo from "./blocks/Cuerpo";
import TarjetasMetricas from "./blocks/TarjetasMetricas";
import Tarjetas from "./blocks/Tarjetas";
import TarjetasContenido from "./blocks/TarjetasContenido";
import TarjetasPrecios from "./blocks/TarjetasPrecios";
import TituloPrincipal from "./blocks/TituloPrincipal";
import PreguntasFrecuentes from "./blocks/PreguntasFrecuentes";
import HeroEditorial from "./blocks/HeroEditorial";
import Carrusel from "./blocks/Carrusel";
import YoutubeVideo from "./blocks/YoutubeVideo";
import MapaBloque from "./blocks/MapaBloque";
import FormularioContacto from "./blocks/FormularioContacto";
import Boton from "./blocks/independientes/Boton";
import Enlace from "./blocks/independientes/Link";

const componentMap = {
  "presentacion-pagina.seccion-principal": SeccionPrincipal,
  "presentacion-pagina.heroeditorial": HeroEditorial,
  "contenido.cuerpo": Cuerpo,
  "contenido.tarjetas-metricas": TarjetasMetricas,
  "contenido.tarjetas": Tarjetas,
  "contenido.tarjetascontenido": TarjetasContenido,
  "precios.tarjetas-precios": TarjetasPrecios,
  "contenido.titulo-principal": TituloPrincipal,
  "contenido.preguntas-frecuentes": PreguntasFrecuentes,
  "medios-visuales.carrusel": Carrusel,
  "servicios-externos.youtube": YoutubeVideo,
  "servicios-externos.mapa": MapaBloque,
  "servicios-externos.correo": FormularioContacto,
  "independientes.boton": ({ block }) => <Boton {...block} />,
  "independientes.link": ({ block }) => <Enlace {...block} />,
};

export default componentMap;
