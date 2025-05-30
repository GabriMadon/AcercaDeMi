fetch("https://apiclient.besoccerapps.com/scripts/api/api.php?key=67f48327f77bd33bfe952cefadb003c9&tz=Europe/Madrid&req=categories&format=json")

  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector("#besoccerCards");
    container.innerHTML = ""; // Limpia antes de insertar datos

    data.category.forEach((league) => {

      const card = document.createElement("div");

      card.classList.add("card");

      //Estructura HTML
      card.innerHTML = `
        <h3>${league.shortName}</h3>
        <h3>${league.country}</h3>
        <p> Inicio: ${league.start_date}</p>
        <p> Final:  ${league.end_date}</p>
        <img src="${league.logo_png}" alt="${league.shortName}" width="100">`;
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error al obtener datos:", error));