var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var LOCATION_TO_COUNTRY_MAP = {
  tokyo: "jp",
  paris: "fr",
  new_york: "us",
  rio_de_janeiro: "br",
  reykjavik: "is",
  sydney: "au",
  rome: "it",
  lisbon: "pt",
  cape_town: "za",
  berlin: "de",
  buenos_aires: "ar",
  singapore: "sg",
  seoul: "kr",
  vienna: "at",
  istanbul: "tr",
  bangkok: "th",
  athens: "gr",
  stockholm: "se",
  oslo: "no",
  helsinki: "fi",
  copenhagen: "dk",
  amsterdam: "nl",
  dublin: "ie",
  prague: "cz",
  zurich: "ch",
  toronto: "ca",
  lima: "pe",
  santiago: "cl",
  mexico_city: "mx",
  auckland: "nz",
  helsinki_island: "fi",
  valparaiso: "cl"
};
var COUNTRY_FACTS_BASE = {
  jp: {
    name: "Jap\xE3o",
    officialName: "Jap\xE3o",
    continent: "\xC1sia",
    subregion: "\xC1sia Oriental",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+81",
    currencyName: "Iene Japon\xEAs (JPY, \xA5)",
    tld: ".jp",
    languages: "Japon\xEAs",
    funFacts: [
      "Famoso pelo contraste entre templos xinto\xEDstas milenares e arranha-c\xE9us iluminados por neon.",
      "As tampas de bueiro nas cal\xE7adas costumam ser verdadeiras obras de arte coloridas pintadas \xE0 m\xE3o.",
      "Vending machines (m\xE1quinas de venda autom\xE1tica) vendem de tudo, desde ch\xE1 quente a guarda-chuvas, a cada esquina."
    ]
  },
  fr: {
    name: "Fran\xE7a",
    officialName: "Rep\xFAblica Francesa",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+33",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".fr",
    languages: "Franc\xEAs",
    funFacts: [
      "Conhecido por sua arquitetura Hausmanniana cl\xE1ssica com fachadas de pedra calc\xE1ria e sacadas de ferro forjado.",
      "A culin\xE1ria local \xE9 mundialmente famosa, especialmente pela confeitaria fina, queijos artesanais e baguetes crocantes.",
      "Possui rotat\xF3rias floridas e charmosas em quase todas as interse\xE7\xF5es de tr\xE1fego urbano."
    ]
  },
  us: {
    name: "Estados Unidos",
    officialName: "Estados Unidos da Am\xE9rica",
    continent: "Am\xE9rica do Norte",
    subregion: "Am\xE9rica do Norte",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+1",
    currencyName: "D\xF3lar Americano (USD, $)",
    tld: ".us, .com",
    languages: "Ingl\xEAs",
    funFacts: [
      "Caracterizado pelo tra\xE7ado urbano ortogonal com avenidas largas e sistemas de ruas numeradas.",
      "Os ic\xF4nicos hidrantes vermelhos ou amarelos e escadas de inc\xEAndio externas de ferro nas fachadas de tijolo s\xE3o marcas registradas.",
      "Possui uma enorme diversidade de t\xE1xis de cores vivas e placas de tr\xE2nsito em formato retangular verde ou branco."
    ]
  },
  br: {
    name: "Brasil",
    officialName: "Rep\xFAblica Federativa do Brasil",
    continent: "Am\xE9rica do Sul",
    subregion: "Am\xE9rica do Sul",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+55",
    currencyName: "Real (BRL, R$)",
    tld: ".br",
    languages: "Portugu\xEAs",
    funFacts: [
      "Possui cal\xE7ad\xF5es ornamentados com mosaicos pretos e brancos em ondas de pedra portuguesa.",
      "Famoso pela alegria contagiante de seu povo, praias tropicais deslumbrantes e a paix\xE3o fervorosa pelo futebol.",
      "Orelh\xF5es telef\xF4nicos em formato de grandes conchas azuis eram comuns nas cal\xE7adas urbanas de suas metr\xF3poles."
    ]
  },
  is: {
    name: "Isl\xE2ndia",
    officialName: "Isl\xE2ndia",
    continent: "Europa",
    subregion: "Europa Setentrional (N\xF3rdica)",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+354",
    currencyName: "Coroa Islandesa (ISK, kr)",
    tld: ".is",
    languages: "Island\xEAs",
    funFacts: [
      "Casas com telhados coloridos de metal corrugado para resistir aos ventos fortes e invernos rigorosos do Atl\xE2ntico Norte.",
      "Terra dos vulc\xF5es, g\xEAiseres e fontes termais, onde o asfalto muitas vezes \xE9 cercado por lava solidificada e musgo.",
      "N\xE3o possui ferrovias p\xFAblicas e a popula\xE7\xE3o depende inteiramente de rodovias terrestres e ve\xEDculos robustos."
    ]
  },
  au: {
    name: "Austr\xE1lia",
    officialName: "Comunidade da Austr\xE1lia",
    continent: "Oceania",
    subregion: "Austr\xE1lia e Nova Zel\xE2ndia",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+61",
    currencyName: "D\xF3lar Australiano (AUD, $)",
    tld: ".au",
    languages: "Ingl\xEAs",
    funFacts: [
      "Placas de aviso de vida selvagem exclusivas alertando sobre cangurus, coalas ou wombats cruzando a pista.",
      "Uma costa bel\xEDssima com praias paradis\xEDacas e piscinas oce\xE2nicas constru\xEDdas diretamente nas rochas costeiras.",
      "As lixeiras residenciais possuem tampas padronizadas coloridas (amarelo para reciclagem e vermelho para res\xEDduos gerais)."
    ]
  },
  it: {
    name: "It\xE1lia",
    officialName: "Rep\xFAblica Italiana",
    continent: "Europa",
    subregion: "Europa Meridional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+39",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".it",
    languages: "Italiano",
    funFacts: [
      "Ruas hist\xF3ricas pavimentadas com paralelep\xEDpedos escuros denominados 'sanpietrini'.",
      "Fachadas pintadas em tons quentes de ocre, terracota e amarelo pastel, adornadas com floreiras nas janelas.",
      "Pequenos carros compactos e vespas \xE1geis estacionadas de maneira criativa nas cal\xE7adas estreitas das cidades medievais."
    ]
  },
  pt: {
    name: "Portugal",
    officialName: "Rep\xFAblica Portuguesa",
    continent: "Europa",
    subregion: "Europa Meridional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+351",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".pt",
    languages: "Portugu\xEAs",
    funFacts: [
      "Famoso pelas fachadas residenciais inteiramente revestidas por azulejos decorados geom\xE9tricos ou florais.",
      "Ladeiras \xEDngremes percorridas por charmosos bondinhos el\xE9tricos amarelos de madeira que sobem os bairros antigos.",
      "Cal\xE7adas art\xEDsticas feitas de cubos pequenos de calc\xE1rio branco e basalto preto formando desenhos geom\xE9tricos bel\xEDssimos."
    ]
  },
  za: {
    name: "\xC1frica do Sul",
    officialName: "Rep\xFAblica da \xC1frica do Sul",
    continent: "\xC1frica",
    subregion: "\xC1frica Austral",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+27",
    currencyName: "Rand Sul-Africano (ZAR, R)",
    tld: ".za",
    languages: "Zulu, Xhosa, Afric\xE2ner, Ingl\xEAs, Sotho e outras l\xEDnguas oficiais",
    funFacts: [
      "Possui estradas c\xEAnicas espetaculares contornando montanhas imponentes que despencam diretamente no oceano.",
      "Presen\xE7a constante de placas de tr\xE2nsito bil\xEDngues ou em ingl\xEAs, al\xE9m de placas amarelas nas bordas das estradas.",
      "Um dos poucos pa\xEDses do mundo a possuir tr\xEAs capitais oficiais divididas por suas fun\xE7\xF5es administrativas, legislativas e judiciais."
    ]
  },
  de: {
    name: "Alemanha",
    officialName: "Rep\xFAblica Federal da Alemanha",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+49",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".de",
    languages: "Alem\xE3o",
    funFacts: [
      "Arquitetura urbana imponente mesclando pr\xE9dios industriais reconstru\xEDdos, concreto modernista e grafites coloridos de vanguarda.",
      "Excelente infraestrutura para bicicletas com ciclovias largas pintadas em vermelho tijolo separadas dos pedestres.",
      "Placas de sinaliza\xE7\xE3o de tr\xE2nsito em fonte azul, amarela e branca de alta precis\xE3o e sem limites de velocidade em certas rodovias."
    ]
  },
  ar: {
    name: "Argentina",
    officialName: "Rep\xFAblica Argentina",
    continent: "Am\xE9rica do Sul",
    subregion: "Am\xE9rica do Sul",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+54",
    currencyName: "Peso Argentino (ARS, $)",
    tld: ".ar",
    languages: "Espanhol",
    funFacts: [
      "Arquitetura urbana majestosa inspirada na Belle \xC9poque parisiense, com edif\xEDcios neocl\xE1ssicos de linhas elegantes.",
      "Os t\xE1xis pretos com tetos pintados de amarelo vibrante s\xE3o um \xEDcone inconfund\xEDvel circulando por suas largas avenidas.",
      "Ruas arborizadas com imponentes \xE1rvores Jacarand\xE1 que florescem em um tom lil\xE1s espetacular durante a primavera."
    ]
  },
  sg: {
    name: "Singapura",
    officialName: "Rep\xFAblica de Singapura",
    continent: "\xC1sia",
    subregion: "Sudeste Asi\xE1tico",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+65",
    currencyName: "D\xF3lar de Singapura (SGD, $)",
    tld: ".sg",
    languages: "Ingl\xEAs, Malaio, Mandarim, T\xE2mil",
    funFacts: [
      "Cidade-estado com ruas impecavelmente limpas, cercadas por arranha-c\xE9us cobertos de jardins verticais e \xE1rvores tropicais gigantes.",
      "Faixas de pedestre duplas pintadas de maneira ultra-vis\xEDvel e sem\xE1foros digitais modernos com contagem regressiva.",
      "Leis extremamente r\xEDgidas sobre ordem urbana, incluindo a proibi\xE7\xE3o da importa\xE7\xE3o e venda de goma de mascar."
    ]
  },
  kr: {
    name: "Coreia do Sul",
    officialName: "Rep\xFAblica da Coreia",
    continent: "\xC1sia",
    subregion: "\xC1sia Oriental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+82",
    currencyName: "Won Sul-Coreano (KRW, \u20A9)",
    tld: ".kr",
    languages: "Coreano (escrita Hangul)",
    funFacts: [
      "Asfalto marcado com inscri\xE7\xF5es Hangul pintadas de amarelo ou branco brilhante regulando o tr\xE2nsito.",
      "Presen\xE7a massiva de c\xE2meras de monitoramento urbano em postes decorados e fia\xE7\xE3o a\xE9rea perfeitamente organizada.",
      "Mistura impressionante de portais tradicionais de madeira din\xE1stica com imensos complexos de apartamentos id\xEAnticos e numerados."
    ]
  },
  at: {
    name: "\xC1ustria",
    officialName: "Rep\xFAblica da \xC1ustria",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+43",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".at",
    languages: "Alem\xE3o",
    funFacts: [
      "Cercado por montanhas alpinas verdes de tirar o f\xF4lego e rios de \xE1gua de degelo extremamente limpa.",
      "Pr\xE9dios imperiais barrocos e neocl\xE1ssicos com fachadas pintadas em um tom amarelo p\xE1lido hist\xF3rico ('Amarelo de Sch\xF6nbrunn').",
      "As placas com nomes de ruas s\xE3o geralmente feitas de metal esmaltado azul-escuro com bordas e letras brancas ornamentadas."
    ]
  },
  tr: {
    name: "Turquia",
    officialName: "Rep\xFAblica da Turquia",
    continent: "\xC1sia/Europa",
    subregion: "\xC1sia Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+90",
    currencyName: "Lira Turca (TRY, \u20BA)",
    tld: ".tr",
    languages: "Turco",
    funFacts: [
      "Cidade transcontinental onde se avistam minaretes esbeltos e mesquitas grandiosas recortando o horizonte sobre colinas \xE0 beira-mar.",
      "Presen\xE7a de milhares de simp\xE1ticos gatos de rua comunit\xE1rios muito bem cuidados, que ganham casinhas e potinhos de comida dos moradores.",
      "Lojas de ch\xE1 tradicionais que servem a bebida em pequenos copos de vidro em formato de tulipa nas cal\xE7adas de paralelep\xEDpedo."
    ]
  },
  th: {
    name: "Tail\xE2ndia",
    officialName: "Reino da Tail\xE2ndia",
    continent: "\xC1sia",
    subregion: "Sudeste Asi\xE1tico",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+66",
    currencyName: "Baht Tailand\xEAs (THB, \u0E3F)",
    tld: ".th",
    languages: "Tailand\xEAs",
    funFacts: [
      "Ruas movimentadas onde transitam os famosos triciclos motorizados abertos conhecidos como Tuk-tuks.",
      "Fia\xE7\xE3o el\xE9trica incrivelmente densa e emaranhada que forma verdadeiras esculturas a\xE9reas sobre os postes de concreto.",
      "Alta frequ\xEAncia de altares e templos budistas dourados brilhantes ('casas de esp\xEDritos') nas esquinas e cal\xE7adas residenciais."
    ]
  },
  gr: {
    name: "Gr\xE9cia",
    officialName: "Rep\xFAblica Hel\xEAnica",
    continent: "Europa",
    subregion: "Europa Meridional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+30",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".gr",
    languages: "Grego",
    funFacts: [
      "Pr\xE9dios residenciais modernos pintados de branco ou ocre claro, com varandas cont\xEDnuas protegidas por toldos de lona listrada verde ou azul.",
      "O asfalto frequentemente revela colinas rochosas e ru\xEDnas de colunas de m\xE1rmore antigas integradas de forma natural \xE0 vida urbana.",
      "Placas de sinaliza\xE7\xE3o de tr\xE2nsito escritas no alfabeto grego cl\xE1ssico com tradu\xE7\xE3o em letras latinas logo abaixo."
    ]
  },
  se: {
    name: "Su\xE9cia",
    officialName: "Reino da Su\xE9cia",
    continent: "Europa",
    subregion: "Europa Setentrional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+46",
    currencyName: "Coroa Sueca (SEK, kr)",
    tld: ".se",
    languages: "Sueco",
    funFacts: [
      "Pr\xE9dios urbanos cl\xE1ssicos pintados em tons past\xE9is aconchegantes de terracota, vermelho falun e mostarda.",
      "Excelente ilumina\xE7\xE3o p\xFAblica e sem\xE1foros integrados de forma limpa em postes pretos finos com marca\xE7\xF5es de faixa de pedestre muito largas.",
      "Abundante presen\xE7a de lagos, ilhas urbanas e florestas de pinheiros que cercam as estradas e os bairros residenciais."
    ]
  },
  no: {
    name: "Noruega",
    officialName: "Reino da Noruega",
    continent: "Europa",
    subregion: "Europa Setentrional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+47",
    currencyName: "Coroa Norueguesa (NOK, kr)",
    tld: ".no",
    languages: "Noruegu\xEAs",
    funFacts: [
      "Metr\xF3poles modernas constru\xEDdas \xE0 beira de fiordes profundos de \xE1guas escuras, cercadas por montanhas rochosas espetaculares.",
      "L\xEDder absoluta em mobilidade el\xE9trica, com um volume inacredit\xE1vel de ve\xEDculos el\xE9tricos e h\xEDbridos circulando silenciosamente pelas vias.",
      "Casas de madeira pintadas de cores tradicionais (principalmente vermelho, amarelo e branco) integradas com design moderno de vidro."
    ]
  },
  fi: {
    name: "Finl\xE2ndia",
    officialName: "Rep\xFAblica da Finl\xE2ndia",
    continent: "Europa",
    subregion: "Europa Setentrional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+358",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".fi",
    languages: "Finland\xEAs, Sueco",
    funFacts: [
      "Cidade costeira b\xE1ltica com pra\xE7as e cal\xE7adas pavimentadas de granito cinza e ciclovias bem estruturadas.",
      "Presen\xE7a de bondes el\xE9tricos articulados pintados em cores verde floresta e laranja brilhante cruzando os trilhos urbanos.",
      "Cercada por b\xE9tulas e con\xEDferas exuberantes, onde a arquitetura funcionalista escandinava preza pela simplicidade e materiais naturais."
    ]
  },
  dk: {
    name: "Dinamarca",
    officialName: "Reino da Dinamarca",
    continent: "Europa",
    subregion: "Europa Setentrional",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+45",
    currencyName: "Coroa Dinamarquesa (DKK, kr)",
    tld: ".dk",
    languages: "Dinamarqu\xEAs",
    funFacts: [
      "Metr\xF3pole famosa por possuir mais bicicletas do que carros, com faixas elevadas exclusivas para ciclistas separadas do tr\xE1fego.",
      "Casas portu\xE1rias de tijolo aparente marrom ou vermelho, ao lado de canais hist\xF3ricos repletos de veleiros e barcos de madeira.",
      "Design minimalista elegante em toda a infraestrutura p\xFAblica, desde os pontos de \xF4nibus at\xE9 as lixeiras de a\xE7o inoxid\xE1vel."
    ]
  },
  nl: {
    name: "Pa\xEDses Baixos",
    officialName: "Reino dos Pa\xEDses Baixos",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+31",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".nl",
    languages: "Holand\xEAs",
    funFacts: [
      "Pr\xE9dios hist\xF3ricos estreitos e inclinados para a frente com ganchos de i\xE7amento de carga proeminentes no topo de seus front\xF5es.",
      "Canais circulares pitorescos ladeados por fileiras de \xE1rvores frondosas e pontes de arco de tijolo iluminadas por lanternas cl\xE1ssicas.",
      "Pistas de ciclovia pavimentadas em asfalto vermelho tijolo liso com sinais luminosos e sem\xE1foros dedicados para bicicletas."
    ]
  },
  ie: {
    name: "Irlanda",
    officialName: "Irlanda",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+353",
    currencyName: "Euro (EUR, \u20AC)",
    tld: ".ie",
    languages: "Irland\xEAs, Ingl\xEAs",
    funFacts: [
      "Famosa pelas tradicionais portas georgianas pintadas em cores vibrantes \xFAnicas (vermelho, amarelo, azul, verde) contrastando com tijolos escuros.",
      "Pubs irlandeses ic\xF4nicos com fachadas de madeira entalhada \xE0 m\xE3o, pintadas em cores escuras e decoradas com vasos suspensos de flores.",
      "Placas de sinaliza\xE7\xE3o de ruas e tr\xE2nsito que trazem o nome das localidades de forma bil\xEDngue: em irland\xEAs ga\xE9lico e em ingl\xEAs."
    ]
  },
  cz: {
    name: "Rep\xFAblica Tcheca",
    officialName: "Rep\xFAblica Tcheca",
    continent: "Europa",
    subregion: "Europa Oriental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+420",
    currencyName: "Coroa Tcheca (CZK, K\u010D)",
    tld: ".cz",
    languages: "Tcheco",
    funFacts: [
      "Conhecida pelo horizonte de contos de fadas pontilhado de telhados de telha vermelha cl\xE1ssica e imponentes torres g\xF3ticas de pedra escura.",
      "Lojas de vidro bo\xEAmio cintilante e padarias tradicionais vendendo 'Trdeln\xEDk' (doce em espiral assado em espetos rotativos).",
      "As placas com o n\xFAmero das casas costumam ser duplas: uma vermelha indicando o n\xFAmero cadastral e outra azul indicando o n\xFAmero da rua."
    ]
  },
  ch: {
    name: "Su\xED\xE7a",
    officialName: "Confedera\xE7\xE3o Su\xED\xE7a",
    continent: "Europa",
    subregion: "Europa Ocidental",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+41",
    currencyName: "Franco Su\xED\xE7o (CHF, CHF)",
    tld: ".ch",
    languages: "Alem\xE3o, Franc\xEAs, Italiano, Romanche",
    funFacts: [
      "Ruas incrivelmente organizadas margeando lagos l\xEDmpidos de \xE1guas azul-turquesa de origem alpina com cisnes brancos nadando.",
      "Grandes rel\xF3gios elegantes com n\xFAmeros romanos ou ponteiros dourados instalados em quase todas as torres de igrejas medievais.",
      "Fontes p\xFAblicas ornamentadas com est\xE1tuas pintadas onde corre \xE1gua pot\xE1vel gelada e cristalina diretamente das fontes subterr\xE2neas."
    ]
  },
  ca: {
    name: "Canad\xE1",
    officialName: "Canad\xE1",
    continent: "Am\xE9rica do Norte",
    subregion: "Am\xE9rica do Norte",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+1",
    currencyName: "D\xF3lar Canadense (CAD, $)",
    tld: ".ca",
    languages: "Ingl\xEAs, Franc\xEAs",
    funFacts: [
      "Infraestrutura rodovi\xE1ria ampla com pistas de concreto claro, sem\xE1foros instalados horizontalmente em vigas amarelas e placas bil\xEDngues.",
      "S\xEDmbolo ic\xF4nico da folha de bordo (maple leaf) estampada de forma sutil em logos de lojas locais, lixeiras e caixas de correio vermelhas.",
      "Bondes el\xE9tricos urbanos pintados de vermelho e branco que operam compartilhando os trilhos centrais com as vias de tr\xE1fego de ve\xEDculos."
    ]
  },
  pe: {
    name: "Peru",
    officialName: "Rep\xFAblica do Peru",
    continent: "Am\xE9rica do Sul",
    subregion: "Am\xE9rica do Sul",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+51",
    currencyName: "Sol (PEN, S/.)",
    tld: ".pe",
    languages: "Espanhol, Qu\xEDchua, Aimar\xE1",
    funFacts: [
      "Fal\xE9sias argilosas gigantescas denominadas 'Costa Verde' que despencam diretamente em praias de pedras redondas no oceano Pac\xEDfico.",
      "Constante presen\xE7a de n\xE9voa mar\xEDtima suave ('gar\xFAa') que cobre o c\xE9u da metr\xF3pole na maior parte do ano.",
      "Fachadas coloniais imponentes pintadas em amarelo mostarda vibrante com balc\xF5es de madeira escura esculpida suspensos nas cal\xE7adas."
    ]
  },
  cl: {
    name: "Chile",
    officialName: "Rep\xFAblica do Chile",
    continent: "Am\xE9rica do Sul",
    subregion: "Am\xE9rica do Sul",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+56",
    currencyName: "Peso Chileno (CLP, $)",
    tld: ".cl",
    languages: "Espanhol",
    funFacts: [
      "Sua geografia \xE9 dominada pela presen\xE7a onipresente da Cordilheira dos Andes com picos nevados vis\xEDveis ao fundo de quase toda a cidade.",
      "O asfalto frequentemente exibe faixas pintadas em amarelo para rotas de \xF4nibus e cal\xE7adas decoradas com azulejos antiderrapantes.",
      "Metr\xF3pole moderna com arranha-c\xE9us espelhados imponentes que contrastam com morros residenciais e cabos a\xE9reos organizados."
    ]
  },
  mx: {
    name: "M\xE9xico",
    officialName: "Estados Unidos Mexicanos",
    continent: "Am\xE9rica do Norte",
    subregion: "Am\xE9rica Central/Am\xE9rica do Norte",
    driveSide: "lado direito (padr\xE3o)",
    callingCode: "+52",
    currencyName: "Peso Mexicano (MXN, $)",
    tld: ".mx",
    languages: "Espanhol",
    funFacts: [
      "Avenidas extremamente largas margeadas por canteiros arborizados gigantescos e monumentos hist\xF3ricos de bronze ou pedra esculpida.",
      "Presen\xE7a constante de t\xE1xis p\xFAblicos pintados de branco e rosa f\xFAcsia circulando intensamente pelo tr\xE1fego das avenidas.",
      "Grande riqueza cultural expressa em mercados ao ar livre coloridos com artesanato t\xEDpico e m\xFAsica tradicional ressoando das cal\xE7adas."
    ]
  },
  nz: {
    name: "Nova Zel\xE2ndia",
    officialName: "Nova Zel\xE2ndia",
    continent: "Oceania",
    subregion: "Austr\xE1lia e Nova Zel\xE2ndia",
    driveSide: "lado esquerdo (m\xE3o inglesa)",
    callingCode: "+64",
    currencyName: "D\xF3lar da Nova Zel\xE2ndia (NZD, $)",
    tld: ".nz",
    languages: "Ingl\xEAs, Maori",
    funFacts: [
      "Vegeta\xE7\xE3o nativa \xFAnica com samambaias arb\xF3reas gigantescas de folhas prateadas crescendo exuberantemente em encostas vulc\xE2nicas urbanas.",
      "As marca\xE7\xF5es no asfalto incluem linhas tracejadas verdes e brancas especiais para ciclistas e faixas de pedestre com marca\xE7\xF5es em chevron.",
      "Excelente infraestrutura portu\xE1ria com marinas repletas de iates de luxo e veleiros de corrida, justificando seu apelido de 'Cidade das Velas'."
    ]
  }
};
var GAME_LOCATIONS_COORDS = [
  { id: "tokyo", lat: 35.6762, lng: 139.6503, country: "jp" },
  { id: "paris", lat: 48.8566, lng: 2.3522, country: "fr" },
  { id: "new_york", lat: 40.7128, lng: -74.006, country: "us" },
  { id: "rio_de_janeiro", lat: -22.9068, lng: -43.1729, country: "br" },
  { id: "reykjavik", lat: 64.1466, lng: -21.9426, country: "is" },
  { id: "sydney", lat: -33.8688, lng: 151.2093, country: "au" },
  { id: "rome", lat: 41.9028, lng: 12.4964, country: "it" },
  { id: "lisbon", lat: 38.7223, lng: -9.1393, country: "pt" },
  { id: "cape_town", lat: -33.9249, lng: 18.4241, country: "za" },
  { id: "berlin", lat: 52.52, lng: 13.405, country: "de" },
  { id: "buenos_aires", lat: -34.6037, lng: -58.3816, country: "ar" },
  { id: "singapore", lat: 1.3521, lng: 103.8198, country: "sg" },
  { id: "seoul", lat: 37.5665, lng: 126.978, country: "kr" },
  { id: "vienna", lat: 48.2082, lng: 16.3738, country: "at" },
  { id: "istanbul", lat: 41.0082, lng: 28.9784, country: "tr" },
  { id: "bangkok", lat: 13.7563, lng: 100.5018, country: "th" },
  { id: "athens", lat: 37.9838, lng: 23.7275, country: "gr" },
  { id: "stockholm", lat: 59.3293, lng: 18.0686, country: "se" },
  { id: "oslo", lat: 59.9139, lng: 10.7522, country: "no" },
  { id: "helsinki", lat: 60.1699, lng: 24.9384, country: "fi" },
  { id: "copenhagen", lat: 55.6761, lng: 12.5683, country: "dk" },
  { id: "amsterdam", lat: 52.3676, lng: 4.9041, country: "nl" },
  { id: "dublin", lat: 53.3498, lng: -6.2603, country: "ie" },
  { id: "prague", lat: 50.0755, lng: 14.4378, country: "cz" },
  { id: "zurich", lat: 47.3769, lng: 8.5417, country: "ch" },
  { id: "toronto", lat: 43.6532, lng: -79.3832, country: "ca" },
  { id: "lima", lat: -12.0464, lng: -77.0428, country: "pe" },
  { id: "santiago", lat: -33.4489, lng: -70.6693, country: "cl" },
  { id: "mexico_city", lat: 19.4326, lng: -99.1332, country: "mx" },
  { id: "auckland", lat: -36.8485, lng: 174.7633, country: "nz" },
  { id: "helsinki_island", lat: 60.15, lng: 24.9, country: "fi" },
  { id: "valparaiso", lat: -33.0472, lng: -71.6127, country: "cl" }
];
var MODELOS_DE_GUIA_BASE = [
  {
    estilo: "Enigm\xE1tico e Atmosf\xE9rico",
    instrucoes: "Foque no clima, na atmosfera visual, nas cores locais e nos elementos geogr\xE1ficos de forma po\xE9tica e misteriosa. Evite dados puramente t\xE9cnicos e prefira criar uma pintura mental e sensorial do local."
  },
  {
    estilo: "An\xE1lise de Detetive de Mapas (Estilo GeoGuessr)",
    instrucoes: "Foque na infraestrutura urbana, tipo de asfalto, presen\xE7a ou aus\xEAncia de fia\xE7\xE3o el\xE9trica a\xE9rea, cor dos postes, formato das cal\xE7adas, sinaliza\xE7\xF5es t\xEDpicas e infraestrutura vi\xE1ria de forma investigativa."
  },
  {
    estilo: "Narrativa de Viagem / Hist\xF3rico-Cultural",
    instrucoes: "Descreva uma breve experi\xEAncia sensorial ou hist\xF3rica do lugar, como a sonoridade dos idiomas falados, os aromas tradicionais, a arquitetura t\xEDpica ou os costumes locais, instigando a imagina\xE7\xE3o do jogador."
  },
  {
    estilo: "Desafio Geopol\xEDtico Estrat\xE9gico",
    instrucoes: "Apresente charadas sobre o posicionamento geogr\xE1fico do territ\xF3rio, vizinhos e oceanos de forma inteligente, e como as moedas locais ou telecomunica\xE7\xF5es refletem sua posi\xE7\xE3o no globo."
  }
];
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/clues", async (req, res) => {
    try {
      const { lat, lng, locationId, clueIndex } = req.body;
      if (typeof lat !== "number" || typeof lng !== "number") {
        res.status(400).json({ error: "Par\xE2metros lat e lng inv\xE1lidos." });
        return;
      }
      let countryProfile = null;
      let countryCode = "br";
      if (locationId && typeof locationId === "string") {
        const code = LOCATION_TO_COUNTRY_MAP[locationId];
        if (code && COUNTRY_FACTS_BASE[code]) {
          countryCode = code;
          countryProfile = COUNTRY_FACTS_BASE[code];
        }
      }
      if (!countryProfile) {
        let minDistance = Infinity;
        let bestMatch = GAME_LOCATIONS_COORDS[0];
        for (const loc of GAME_LOCATIONS_COORDS) {
          const dist = Math.hypot(loc.lat - lat, loc.lng - lng);
          if (dist < minDistance) {
            minDistance = dist;
            bestMatch = loc;
          }
        }
        if (minDistance < 3 && COUNTRY_FACTS_BASE[bestMatch.country]) {
          countryCode = bestMatch.country;
          countryProfile = COUNTRY_FACTS_BASE[bestMatch.country];
        }
      }
      if (!countryProfile) {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=5&addressdetails=1`;
        let countryNameFromOSM = "";
        try {
          const osmRes = await fetch(nominatimUrl, {
            headers: {
              "User-Agent": "GeoGuessrMapillaryClone/1.0 (tl.andrade.2024@aluno.unila.edu.br)"
            }
          });
          if (osmRes.ok) {
            const osmData = await osmRes.json();
            const extractedCode = (osmData.address?.country_code || "").toLowerCase();
            if (extractedCode) {
              countryCode = extractedCode;
            }
            countryNameFromOSM = osmData.address?.country || "";
          }
        } catch (osmErr) {
          console.error("Erro ao consultar Nominatim:", osmErr);
        }
        if (COUNTRY_FACTS_BASE[countryCode]) {
          countryProfile = COUNTRY_FACTS_BASE[countryCode];
        } else {
          const countriesUrl = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,continents,subregion,car,idd,currencies,tld,languages`;
          let apiFacts = null;
          try {
            const rcRes = await fetch(countriesUrl);
            if (rcRes.ok) {
              const rcData = await rcRes.json();
              apiFacts = Array.isArray(rcData) ? rcData[0] : rcData;
            }
          } catch (rcErr) {
            console.error("Erro ao consultar REST Countries:", rcErr);
          }
          if (apiFacts) {
            const continent = (apiFacts.continents || []).join(", ") || "Desconhecido";
            const subregion = apiFacts.subregion || "Desconhecido";
            const driveSide = apiFacts.car?.side === "left" ? "lado esquerdo (m\xE3o inglesa)" : "lado direito (padr\xE3o)";
            const callingCodeRoot = apiFacts.idd?.root || "";
            const callingCodeSuffix = (apiFacts.idd?.suffixes || [])[0] || "";
            const callingCode = callingCodeRoot + callingCodeSuffix || "Desconhecido";
            const currencyKeys = Object.keys(apiFacts.currencies || {});
            const currencyObj = currencyKeys.length > 0 ? apiFacts.currencies[currencyKeys[0]] : null;
            const currencyName = currencyObj ? `${currencyObj.name} (${currencyObj.symbol || ""})` : "Desconhecida";
            const tld = (apiFacts.tld || []).join(", ") || "Desconhecido";
            const languages = Object.values(apiFacts.languages || {}).join(", ") || "Desconhecido";
            const countryOfficialName = apiFacts.name?.official || apiFacts.name?.common || countryNameFromOSM || "este local";
            countryProfile = {
              name: countryNameFromOSM || countryOfficialName,
              officialName: countryOfficialName,
              continent,
              subregion,
              driveSide,
              callingCode,
              currencyName,
              tld,
              languages,
              funFacts: [
                `Este local est\xE1 no continente ${continent}, mais especificamente na sub-regi\xE3o de ${subregion}.`,
                `O tr\xE1fego de ve\xEDculos flui pelo ${driveSide}, e o c\xF3digo de discagem direta internacional \xE9 ${callingCode}.`,
                `A economia utiliza a moeda ${currencyName}, e o sufixo nacional de dom\xEDnio virtual \xE9 ${tld}.`
              ]
            };
          }
        }
      }
      if (!countryProfile) {
        countryProfile = {
          name: "este local",
          officialName: "este local",
          continent: "\xC1sia/Europa",
          subregion: "Regi\xE3o Central",
          driveSide: "lado direito (padr\xE3o)",
          callingCode: "Desconhecido",
          currencyName: "Moeda Local",
          tld: ".org",
          languages: "Idioma Regional",
          funFacts: [
            "Um belo destino cercado por arquiteturas t\xEDpicas e paisagens inconfund\xEDveis.",
            "Uma regi\xE3o vibrante repleta de caracter\xEDsticas culturais singulares e ricas.",
            "Um ponto estrat\xE9gico importante com infraestrutura de transporte e conectividade din\xE2mica."
          ]
        };
      }
      let targetFactForBackup = countryProfile.funFacts[clueIndex % countryProfile.funFacts.length];
      if (clueIndex < 0 || clueIndex > 3) {
        res.status(400).json({ error: "C\xF3digo de dica inv\xE1lido." });
        return;
      }
      const getFallbackClueText = () => {
        if (clueIndex === 0) return `Este canto do mundo fica localizado no continente ${countryProfile.continent} (na sub-regi\xE3o de ${countryProfile.subregion}). ${targetFactForBackup}`;
        if (clueIndex === 1) return `Observando a movimenta\xE7\xE3o urbana por aqui, os autom\xF3veis circulam pelo ${countryProfile.driveSide} da pista. ${targetFactForBackup}`;
        if (clueIndex === 2) return `A n\xEDvel comercial, as transa\xE7\xF5es locais s\xE3o mediadas por uma moeda espec\xEDfica desta parte do globo, enquanto sua soberania digital na rede \xE9 representada por um dom\xEDnio nacional exclusivo de internet. ${targetFactForBackup}`;
        if (clueIndex === 3) return `Entre a popula\xE7\xE3o nativa, as tradi\xE7\xF5es locais e a heran\xE7a lingu\xEDstica expressam a identidade singular desta na\xE7\xE3o. ${targetFactForBackup}`;
        return "Informa\xE7\xF5es sobre este local n\xE3o est\xE3o dispon\xEDveis no momento.";
      };
      const selectedStyleModel = MODELOS_DE_GUIA_BASE[clueIndex % MODELOS_DE_GUIA_BASE.length];
      let generatedClue = "";
      let isFallback = false;
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        generatedClue = getFallbackClueText();
        isFallback = true;
      } else {
        try {
          const systemInstruction = `Voc\xEA \xE9 uma Intelig\xEAncia Artificial especializada em criar pistas enigm\xE1ticas, envolventes e altamente precisas para um jogo de adivinha\xE7\xE3o geogr\xE1fica em portugu\xEAs do Brasil.
            
            Sua tarefa \xE9 ler dados reais de um pa\xEDs e redigir uma pista instigante com base em um estilo de guia estruturado, respondendo \xE0 solicita\xE7\xE3o do usu\xE1rio.
            
            DIRETRIZ CR\xCDTICA DE PREVEN\xC7\xC3O DE ALUCINA\xC7\xD5ES (EVITAR ERROS):
            - Baseie sua pista estritamente nos dados f\xE1ticos fornecidos no prompt.
            - Nunca invente fatos, climas fict\xEDcios, caracter\xEDsticas geogr\xE1ficas falsas, pratos t\xEDpicos falsos, ou informa\xE7\xF5es de tr\xE1fego que n\xE3o estejam contidas nos dados f\xE1ticos ou nas curiosidades fornecidas.
            - Se um dado estiver marcado como "Desconhecido" ou "n\xE3o dispon\xEDvel", voc\xEA N\xC3O deve us\xE1-lo na pista de forma alguma.
            
            DIRETRIZ DE N\xC3O-REVELA\xC7\xC3O E SIGILO EXTREMO (SEM SPOILERS DIRETOS):
            1. \xC9 terminantemente PROIBIDO revelar ou mencionar o nome do pa\xEDs (${countryProfile.name} ou ${countryProfile.officialName}), capitais ou cidades do pa\xEDs no texto final da pista.
            2. \xC9 expressamente PROIBIDO citar qualquer c\xF3digo telef\xF4nico de pa\xEDs/DDI (como por exemplo "+358", "+45", "+31", ou "prefixo de telefone 35"). Nunca insira esses n\xFAmeros!
            3. \xC9 expressamente PROIBIDO citar o dom\xEDnio nacional de internet de n\xEDvel superior (TLD, como por exemplo ".fi", ".dk", ".nl", ".ie"). Nunca insira estas siglas!
            4. \xC9 expressamente PROIBIDO citar o nome literal de moedas ou idiomas que contenham o pr\xF3prio nome do pa\xEDs ou que sejam extremamente \xF3bvios (por exemplo: em vez de "Coroa Dinamarquesa", use "a coroa local"; em vez de "Peso Chileno", use "a moeda pr\xF3pria chilena" ou "o peso local"; em vez de "Iene Japon\xEAs", use "a moeda asi\xE1tica tradicional").
            5. Nunca escreva o nome de idiomas derivados diretamente do nome do pa\xEDs (por exemplo: n\xE3o use "dinamarqu\xEAs", "holand\xEAs", "irland\xEAs", "japon\xEAs", "franc\xEAs", "alem\xE3o", "espanhol", "italiano"). Em vez disso, use descri\xE7\xF5es liter\xE1rias elegantes como "o idioma oficial falado localmente", "a expressiva l\xEDngua germ\xE2nica da regi\xE3o", "um idioma de origem eslava/latina", etc.
            6. Use express\xF5es neutras para referir-se \xE0 localidade, como: "este territ\xF3rio", "esta na\xE7\xE3o", "este canto do globo", "este lugar", "por aqui", etc.`;
          const focusAspect = clueIndex === 0 ? "Geografia F\xEDsica, Clima ou Relevo" : clueIndex === 1 ? "Cultura, H\xE1bitos locais ou Curiosidades tradicionais" : clueIndex === 2 ? "Gastronomia t\xEDpica, Culin\xE1ria local, Pratos tradicionais ou Sabores regionais" : "Conhecimentos Gerais, Hist\xF3ria ou Arquitetura caracter\xEDstica";
          const promptText = `### DIRETRIZ DE ENTRADA DO USU\xC1RIO:
            "Escreva em poucas palavras uma pista geogr\xE1fica, gastron\xF4mica, de conhecimentos gerais ou cultural desse lugar, sem revelar o lugar em si."

            ### DADOS F\xC1TICOS REAIS DO PA\xCDS REVELADO DO JOGO (USE APENAS ESTES FATOS PARA CONSTRUIR A PISTA, N\xC3O INVENTE NADA):
            - Nome: ${countryProfile.name}
            - Nome Oficial: ${countryProfile.officialName}
            - Continente: ${countryProfile.continent}
            - Sub-regi\xE3o: ${countryProfile.subregion}
            - M\xE3o de Dire\xE7\xE3o (Lado da pista): ${countryProfile.driveSide}
            - DDI Telef\xF4nico: ${countryProfile.callingCode}
            - Moeda Oficial: ${countryProfile.currencyName}
            - Dom\xEDnio de Internet (TLD): ${countryProfile.tld}
            - Idiomas Oficiais/Falados: ${countryProfile.languages}
            - Fatos de Apoio Adicionais:
              ${countryProfile.funFacts.map((fact, i) => `  * Fato ${i + 1}: ${fact}`).join("\n")}
            
            ### MODELO DE GUIA BASE ESTIL\xCDSTICO SELECIONADO:
            - Estilo de Guia: ${selectedStyleModel.estilo}
            - Instru\xE7\xF5es de Reda\xE7\xE3o: ${selectedStyleModel.instrucoes}
            
            ### FOCO DESTA PISTA ESPEC\xCDFICA (Para garantir variedade entre as dicas sem repetir informa\xE7\xF5es):
            - Tente destacar principalmente aspectos relacionados a: **${focusAspect}**.
            
            ### TAREFA DA IA:
            Escreva em poucas palavras (m\xE1ximo de 1 a 2 frases curtas) uma pista enigm\xE1tica e inteligente em portugu\xEAs do Brasil com base nas informa\xE7\xF5es f\xE1ticas fornecidas acima, seguindo o Estilo de Guia e o Foco sugeridos.
            N\xE3o inclua cabe\xE7alhos, t\xEDtulos ou prefixos (n\xE3o escreva "Dica 1:" ou "Gastronomia:"). V\xE1 direto ao texto da pista.
            Lembre-se: NUNCA mencione o nome do pa\xEDs nem de suas cidades!`;
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: promptText,
            config: {
              systemInstruction,
              temperature: 0.85
            }
          });
          generatedClue = response.text?.trim() || getFallbackClueText();
        } catch (geminiError) {
          console.error("Gemini API call failed (using robust local profile fallback):", geminiError);
          generatedClue = getFallbackClueText();
          isFallback = true;
        }
      }
      res.json({
        clueIndex,
        category: "Dica",
        text: generatedClue,
        countryCode,
        isFallback
      });
    } catch (error) {
      console.error("Erro ao gerar pistas:", error);
      res.status(500).json({ error: error?.message || "Erro desconhecido ao processar dicas." });
    }
  });
  app.get("/api/config", (req, res) => {
    res.json({
      mapillaryToken: process.env.VITE_MAPILLARY_TOKEN || process.env.MAPILLARY_TOKEN || ""
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] GeoGuessr Mapillary rodando na porta ${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
