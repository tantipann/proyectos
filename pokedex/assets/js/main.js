const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

const URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonesCache = [];
let inicial = 0;


async function cargarTodosLosPokemones() {
  const promesas = [];

  for (let i = 1; i <= 151; i++) {
    promesas.push(fetch(URL + i).then((res) => res.json()));
  }

  const data = await Promise.all(promesas);

  // Garantizar orden por ID
  data.sort((a, b) => a.id - b.id);
  console.log("Cargando data");
  return data;
}


function renderPokemones(pokemones) {
  listaPokemon.innerHTML = "";
  pokemones.forEach((pokemon) => mostrarPokemon(pokemon));
}


function mostrarPokemon(poke) {
  const tipos = poke.types
    .map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    .join("");

  const pokeId = poke.id.toString().padStart(3, "0");

  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.classList.add("pokemon");

  card.innerHTML = `
    <div class="pokemon-imagen">
      <img
        src="${poke.sprites.other["official-artwork"].front_default}"
        alt="${poke.name}"
        class="img-fluid pokemon-img"
      >
    </div>

    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
      </div>

      <div class="pokemon-tipos">${tipos}</div>
    </div>
  `;

  // Modal solo en la imagen
  card.querySelector(".pokemon-img").addEventListener("click", (e) => {
    e.stopPropagation();
    abrirModal(poke);
  });

  col.append(card);
  listaPokemon.append(col);
}




async function filtrarPorTipo(tipo) {
  if (tipo === "ver-todos") {
    mostrarSpinner();
    pokemonesCache = await cargarTodosLosPokemones(); // vuelve a la API
    ocultarSpinner();
    renderPokemones(pokemonesCache);
    return;
  }

  const filtrados = pokemonesCache.filter((pokemon) =>
    pokemon.types.some((t) => t.type.name === tipo)
  );

  renderPokemones(filtrados);
}



function abrirModal(pokemon) {
  document.getElementById("modalTitle").textContent =
    `#${pokemon.id} - ` + pokemon.name.toUpperCase();

  document.getElementById("modalBody").innerHTML = `
    <img src="${pokemon.sprites.other["official-artwork"].front_default}"
     class="img-fluid mb-3 modal-pokemon-img">
    <p><strong>Altura:</strong> ${pokemon.height} m</p>
    <p><strong>Peso:</strong> ${pokemon.weight} kg</p>
  `;

  new bootstrap.Modal(document.getElementById("pokemonModal")).show();
}


botonesHeader.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    filtrarPorTipo(e.currentTarget.id);
  });
});


document.addEventListener("DOMContentLoaded", async () => {
  mostrarSpinner();
  pokemonesCache = await cargarTodosLosPokemones();
  ocultarSpinner();
  renderPokemones(pokemonesCache);
});


function mostrarSpinner() {
  listaPokemon.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-100 py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `;
}

function ocultarSpinner() {
  listaPokemon.innerHTML = "";
}



