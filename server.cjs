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
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/clues", async (req, res) => {
    try {
      const { lat, lng, clueIndex } = req.body;
      if (typeof lat !== "number" || typeof lng !== "number") {
        res.status(400).json({ error: "Par\xE2metros lat e lng inv\xE1lidos." });
        return;
      }
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=5&addressdetails=1`;
      let countryCode = "";
      let countryNameFromOSM = "";
      let addressName = "";
      try {
        const osmRes = await fetch(nominatimUrl, {
          headers: {
            "User-Agent": "GeoGuessrMapillaryClone/1.0 (tl.andrade.2024@aluno.unila.edu.br)"
          }
        });
        if (osmRes.ok) {
          const osmData = await osmRes.json();
          countryCode = (osmData.address?.country_code || "").toLowerCase();
          countryNameFromOSM = osmData.address?.country || "";
          addressName = osmData.display_name || "";
        }
      } catch (osmErr) {
        console.error("Erro ao consultar Nominatim:", osmErr);
      }
      if (!countryCode) {
        countryCode = "br";
      }
      const countriesUrl = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,continents,subregion,car,idd,currencies,tld,languages`;
      let countryFacts = null;
      try {
        const rcRes = await fetch(countriesUrl);
        if (rcRes.ok) {
          const rcData = await rcRes.json();
          countryFacts = rcData;
        }
      } catch (rcErr) {
        console.error("Erro ao consultar REST Countries:", rcErr);
      }
      if (!countryFacts) {
        res.status(500).json({ error: "N\xE3o foi poss\xEDvel obter dados geogr\xE1ficos do pa\xEDs." });
        return;
      }
      const continent = (countryFacts.continents || []).join(", ") || "Desconhecido";
      const subregion = countryFacts.subregion || "Desconhecido";
      const driveSide = countryFacts.car?.side === "left" ? "lado esquerdo (m\xE3o inglesa)" : "lado direito (padr\xE3o)";
      const callingCodeRoot = countryFacts.idd?.root || "";
      const callingCodeSuffix = (countryFacts.idd?.suffixes || [])[0] || "";
      const callingCode = callingCodeRoot + callingCodeSuffix || "Desconhecido";
      const currencyKeys = Object.keys(countryFacts.currencies || {});
      const currencyObj = currencyKeys.length > 0 ? countryFacts.currencies[currencyKeys[0]] : null;
      const currencyName = currencyObj ? `${currencyObj.name} (${currencyObj.symbol || ""})` : "Desconhecida";
      const tld = (countryFacts.tld || []).join(", ") || "Desconhecido";
      const languages = Object.values(countryFacts.languages || {}).join(", ") || "Desconhecido";
      const countryOfficialName = countryFacts.name?.official || countryFacts.name?.common || "este local";
      let factPrompt = "";
      let categoryName = "";
      switch (clueIndex) {
        case 0:
          categoryName = "Geografia Geral";
          factPrompt = `Continente: ${continent}, Sub-regi\xE3o: ${subregion}.`;
          break;
        case 1:
          categoryName = "Tr\xE1fego e Telecomunica\xE7\xE3o";
          factPrompt = `Os carros trafegam pelo ${driveSide} da pista. O c\xF3digo de discagem direta internacional (DDI) come\xE7a com ${callingCode}.`;
          break;
        case 2:
          categoryName = "Economia e Web";
          factPrompt = `A moeda oficial \xE9 o ${currencyName}. O dom\xEDnio nacional de internet termina em ${tld}.`;
          break;
        case 3:
          categoryName = "Cultura e Lingu\xEDstica";
          factPrompt = `O principal idioma oficial ou nativo falado e escrito nesta regi\xE3o \xE9: ${languages}.`;
          break;
        default:
          res.status(400).json({ error: "C\xF3digo de dica inv\xE1lido." });
          return;
      }
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        let fallbackText = "";
        if (clueIndex === 0) fallbackText = `Este local est\xE1 situado no continente ${continent} (Sub-regi\xE3o: ${subregion}).`;
        if (clueIndex === 1) fallbackText = `Os carros trafegam pelo ${driveSide} da pista. O DDI telef\xF4nico come\xE7a com ${callingCode}.`;
        if (clueIndex === 2) fallbackText = `A moeda oficial \xE9 o ${currencyName}. O dom\xEDnio nacional de internet termina em ${tld}.`;
        if (clueIndex === 3) fallbackText = `Os idiomas oficiais ou nativos falados nesta localidade incluem: ${languages}.`;
        res.json({
          clueIndex,
          category: categoryName,
          text: fallbackText + " (Nota: Ative sua chave GEMINI_API_KEY para descri\xE7\xF5es narrativas din\xE2micas)",
          countryCode
        });
        return;
      }
      const systemInstruction = `Voc\xEA \xE9 o mestre de dicas din\xE2micas de um jogo clone de GeoGuessr. 
        Sua tarefa \xE9 ler alguns dados brutos sobre um pa\xEDs e escrever uma \xFAnica dica curta (1 ou 2 frases no m\xE1ximo) em portugu\xEAs do Brasil de maneira natural, narrativa e instigante.
        As dicas devem ser din\xE2micas, nada de frases prontas ou molde de frases (escreva como um humano contaria curiosidades).
        
        REQUISITO CR\xCDTICO DE SEGURAN\xC7A:
        Voc\xEA est\xE1 estritamente PROIBIDO de escrever o nome do pa\xEDs (${countryOfficialName}, ${countryNameFromOSM}), de sua capital ou de qualquer cidade do pa\xEDs no texto.
        Use termos neutros como "esta na\xE7\xE3o", "este territ\xF3rio", "esta parte do mundo", "por aqui", ou simplesmente descreva a infraestrutura.
        Nunca use a estrutura "[Pa\xEDs] \xE9..." ou revele o nome direto. Se violar esta regra, o jogo perde o sentido!`;
      const prompt = `Escreva uma dica narrativa de n\xEDvel mestre para a categoria "${categoryName}" baseando-se nestas informa\xE7\xF5es:
      ${factPrompt}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.8
        }
      });
      const generatedClue = response.text?.trim() || "";
      res.json({
        clueIndex,
        category: categoryName,
        text: generatedClue,
        countryCode
      });
    } catch (error) {
      console.error("Erro ao gerar pistas:", error);
      res.status(500).json({ error: error?.message || "Erro desconhecido ao processar dicas." });
    }
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
