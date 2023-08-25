// Get references to various elements in the HTML document
const searchInput = document.querySelector("#search-pokemon");
const container = document.getElementById("pokemonContainer");
const errorMessage = document.getElementById("error-message");
let allPokemonData = [];

// Fetch Pokemon data from the API
// Loop through Pokemon IDs from 1 to 120
const fetchPokemon = async () => {
  try {
    for (let i = 1; i <= 120; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const res = await fetch(url);
      const data = await res.json();

      renderPokemon(container, data);

      allPokemonData.push(data);
    }
  } catch (error) {
    console.error("error fetching pokemon data", error);
  }
};

// Render a Pokemon card with its data
async function renderPokemon(container, data) {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-card";

  const imageElement = document.createElement("img");
  imageElement.src = data.sprites.other["official-artwork"].front_default;
  imageElement.alt = `Image of ${data.name}`;

  const nameElement = document.createElement("p");
  nameElement.textContent = `Name: ${
    data.name.charAt(0).toUpperCase() + data.name.slice(1)
  }`;

  const idElement = document.createElement("p");
  idElement.textContent = `ID: ${data.id}`;

  const typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${data.types
    .map((type) => type.type.name)
    .join(", ")}`;

  const pokemonDetails = document.createElement("button");
  pokemonDetails.textContent = "Click for details";

  pokemonDetails.addEventListener("click", () => {
    showPokemonDetailsModal(data);
  });

  pokemonDiv.appendChild(imageElement);
  pokemonDiv.appendChild(nameElement);
  pokemonDiv.appendChild(idElement);
  pokemonDiv.appendChild(typeElement);
  pokemonDiv.appendChild(pokemonDetails);
  container.appendChild(pokemonDiv);
}

// Show a modal with detailed Pokemon information
function showPokemonDetailsModal(data) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const closeModalButton = document.createElement("button");
  closeModalButton.textContent = "Close";
  closeModalButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.removeChild(modal);
    }
  });

  // Create Pokemon details container
  const detailsElement = document.createElement("div");
  detailsElement.className = "pokemon-details";

  // Fill details with data
  detailsElement.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
      
        <img src="${
          data.sprites.other["official-artwork"].front_default
        }" alt="Image of ${data.name}">
      
        <p id="pokemon-id">ID: ${data.id}</p>
        
        <p id="pokemon-hp">HP: ${
          data.stats.find((stat) => stat.stat.name === "hp").base_stat
        }</p>

        <p id="pokemon-attack">Attack: ${
          data.stats.find((stat) => stat.stat.name === "attack").base_stat
        }</p>
      
        <p id="pokemon-special-attack">Special-attack: ${
          data.stats.find((stat) => stat.stat.name === "special-attack")
            .base_stat
        }</p>

        <p id="pokemon-defense">Defense: ${
          data.stats.find((stat) => stat.stat.name === "defense").base_stat
        }</p>
        
        <p id="pokemon-special-defense">Special-defense: ${
          data.stats.find((stat) => stat.stat.name === "special-defense")
            .base_stat
        }</p>

        <p id="pokemon-speed">Speed: ${
          data.stats.find((stat) => stat.stat.name === "speed").base_stat
        }</p>

        <p>Type: ${data.types.map((type) => type.type.name).join(", ")}</p>
        `;

  detailsElement.appendChild(closeModalButton);
  modal.appendChild(detailsElement);

  document.body.appendChild(modal);
}

// Search for Pokemon based on the query and render results
function searchPokemon(query, container) {
  const filteredPokemon = allPokemonData.filter((pokemon) =>
    pokemon.name.includes(query.toLowerCase())
  );
  renderFilteredPokemon(filteredPokemon, container);
}

// Render filtered Pokemon based on search results
function renderFilteredPokemon(filteredPokemon, container) {
  container.innerHTML = "";

  filteredPokemon.forEach((pokemon) => {
    renderPokemon(container, pokemon);
  });
}

// Handle form submission for search
// Search and render filtered Pokemon
// If no query, render all Pokemon
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  if (query) {
    searchPokemon(query, container);
  } else {
    renderFilteredPokemon(allPokemonData, container);
  }
});

// Handle form reset
// Clear search input and render all Pokemon
document.querySelector("form").addEventListener("reset", function () {
  document.getElementById("search-pokemon").value = "";
  renderFilteredPokemon(allPokemonData, container);
});

// Handle form submission for search with error message
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  if (query) {
    const filteredPokemon = allPokemonData.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    if (filteredPokemon.length > 0) {
      errorMessage.textContent = "";
      renderFilteredPokemon(filteredPokemon, container);
    } else {
      errorMessage.textContent = "No matching Pokemon found";
    }
  } else {
    errorMessage.textContent = "";
    renderFilteredPokemon(allPokemonData, container);
  }
});

// Function to generate and add sort buttons
function generateSortButtons() {
  const sortOptionsContainer = document.getElementById("sort-options");

  function sortPokemonByType(type) {
    const filteredPokemon = allPokemonData.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === type)
    );
    renderFilteredPokemon(filteredPokemon, container);
  }

  // Collect unique Pokémon types from the fetched data
  const pokemonTypes = new Set();
  allPokemonData.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      pokemonTypes.add(type.type.name);
    });
  });

  // Convert the set to an array and sort it
  const sortedTypes = Array.from(pokemonTypes).sort();

  sortedTypes.forEach((type) => {
    const sortButton = document.createElement("button");
    sortButton.textContent = `Sort by ${type}`;
    sortButton.addEventListener("click", () => {
      sortPokemonByType(type);
    });
    sortOptionsContainer.appendChild(sortButton);
  });
}

// Fetch Pokemon data and generate sort buttons after fetching
fetchPokemon().then(() => {
  generateSortButtons();
});
