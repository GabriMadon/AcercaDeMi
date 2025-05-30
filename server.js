const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

console.log("Iniciando servidor..."); // Confirmación de inicio

app.get("/besoccer", async (req, res) => {
  try {
    console.log("Llamando a la API BeSoccer...");
    const response = await fetch(
      "https://apiclient.besoccerapps.com/scripts/api/api.php?key=67f48327f77bd33bfe952cefadb003c9&tz=Europe/Madrid&req=categories&filter=my_leagues&format=json"
    );

    console.log("Código de respuesta:", response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.text(); // Ver la respuesta original sin procesar
    console.log("Respuesta sin procesar:", data);

    try {
      const jsonData = JSON.parse(data); // Intentamos convertirlo a JSON
      console.log("Datos procesados correctamente:", JSON.stringify(jsonData, null, 2));
      res.json(jsonData);
    } catch (jsonError) {
      throw new Error("Error al convertir respuesta a JSON");
    }

  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
