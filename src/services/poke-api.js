import axios from "axios";
import { setupCache } from "axios-cache-interceptor/dev";
import fireicon from "../assets/images/pokemon-types/fireicon.png";
import bugicon from "../assets/images/pokemon-types/bugicon.png";
import darkicon from "../assets/images/pokemon-types/darkicon.png";
import dragonicon from "../assets/images/pokemon-types/dragonicon.png";
import electricicon from "../assets/images/pokemon-types/electricicon.png";
import fairyicon from "../assets/images/pokemon-types/fairyicon.png";
import fightingicon from "../assets/images/pokemon-types/fightingicon.png";
import flyingicon from "../assets/images/pokemon-types/flyingicon.png";
import ghosticon from "../assets/images/pokemon-types/ghosticon.png";
import grassicon from "../assets/images/pokemon-types/grassicon.png";
import groundicon from "../assets/images/pokemon-types/groundicon.png";
import iceicon from "../assets/images/pokemon-types/iceicon.png";
import normalicon from "../assets/images/pokemon-types/normalicon.png";
import poisonicon from "../assets/images/pokemon-types/poisonicon.png";
import psychicicon from "../assets/images/pokemon-types/psychicicon.png";
import rockicon from "../assets/images/pokemon-types/rockicon.png";
import steelicon from "../assets/images/pokemon-types/steelicon.png";
import watericon from "../assets/images/pokemon-types/watericon.png";
import loadingicon from "../assets/images/loading/loading-pokeball.gif";

const baseApiUrl = "https://pokeapi.co/api/v2";
const instance = axios.create();
const http = setupCache(instance, {
});

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function parsePokemon(pokemon) {
  const extraInfo = await getPokemonExtraInfo(pokemon);
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default
      ? pokemon.sprites.other.dream_world.front_default
      : pokemon.sprites.front_shiny,
    types: pokemon.types.map(parseType),
    abilities: pokemon.abilities.map(parseAbility),
    cries: pokemon.cries.latest ? pokemon.cries.latest : pokemon.cries.legacy,
    height: pokemon.height,
    weight: pokemon.weight,
    evolutions: extraInfo.evolutions,
    habitat: extraInfo.habitat,
    description: extraInfo.description,
    statistics: {
      labels: [
        capitalize(pokemon.stats[0].stat.name),
        capitalize(pokemon.stats[1].stat.name),
        capitalize(pokemon.stats[2].stat.name),
        capitalize(pokemon.stats[3].stat.name),
        capitalize(pokemon.stats[4].stat.name),
        capitalize(pokemon.stats[5].stat.name),
      ],
      datasets: [
        {
          label: "Stats",
          data: [
            pokemon.stats[0].base_stat,
            pokemon.stats[1].base_stat,
            pokemon.stats[2].base_stat,
            pokemon.stats[3].base_stat,
            pokemon.stats[4].base_stat,
            pokemon.stats[5].base_stat,
          ],
          fill: true,
          backgroundColor: "rgba(0, 0, 255, 0.6)",
          borderColor: "rgba(0, 0, 255, 0.8)"
        },
      ],
    },
  };
}

function parseAbility(ability) {
  return { name: ability.ability.name, url: ability.ability.url};
}

function parseType({ type: { name } }) {
  switch (name) {
    case "fire":
      return {
        name,
        icon: fireicon,
      };
    case "bug":
      return {
        name,
        icon: bugicon,
      };
    case "dark":
      return {
        name,
        icon: darkicon,
      };
    case "dragon":
      return {
        name,
        icon: dragonicon,
      };
    case "electric":
      return {
        name,
        icon: electricicon,
      };
    case "fairy":
      return {
        name,
        icon: fairyicon,
      };
    case "fighting":
      return {
        name,
        icon: fightingicon,
      };
    case "flying":
      return {
        name,
        icon: flyingicon,
      };
    case "ghost":
      return {
        name,
        icon: ghosticon,
      };
    case "grass":
      return {
        name,
        icon: grassicon,
      };
    case "ground":
      return {
        name,
        icon: groundicon,
      };
    case "ice":
      return {
        name,
        icon: iceicon,
      };
    case "normal":
      return {
        name,
        icon: normalicon,
      };
    case "poison":
      return {
        name,
        icon: poisonicon,
      };
    case "psychic":
      return {
        name,
        icon: psychicicon,
      };
    case "rock":
      return {
        name,
        icon: rockicon,
      };
    case "steel":
      return {
        name,
        icon: steelicon,
      };
    case "water":
      return {
        name,
        icon: watericon,
      };
    default:
      return {
        name,
        icon: loadingicon,
      };
  }
}

export async function listPokemon(offset, limit, search) {
  const response = await (search === ""
    ? http.get(`${baseApiUrl}/pokemon?limit=${limit}&offset=${offset}`)
    : http.get(`${baseApiUrl}/pokemon?limit=1302&offset=0`));

  const pokemonList = response.data.results;
  return search === ""
    ? pokemonList
    : pokemonList.filter((pokemon) =>
        pokemon.name.includes(search.toLowerCase())
      );
}

export async function getPokemonListData(pokemonList) {
  const pokemons = await Promise.all(
    pokemonList.map((pokemon) => http.get(pokemon.url).then(({ data }) => parsePokemon(data)))
  );
  return pokemons;
}

export async function getPokemonById(pokemonId) {
  const { data: pokemon } = await http.get(
    `${baseApiUrl}/pokemon/${pokemonId}`
  );
  return parsePokemon(pokemon);
}

export async function filterPokemon(search, pokemonsList) {
  return getPokemonListData(
    pokemonsList.filter((pokemon) => pokemon.name.includes(search))
  );
}

export async function getPokemonExtraInfo(pokemon) {
  const response = await http.get(pokemon.species.url);
  const description = response.data.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;
  const habitat = response.data.habitat?.name;
  const evolutions = await getPokemonChainEvolutions(response.data.evolution_chain.url);
  return { description: description.replace(/[\n\f\r\t\v]/g, ' '), habitat: habitat ? habitat : "Unknown", evolutions: evolutions};
  
}

export async function getPokemonChainEvolutions(evolutionsURL) {
  try {
    const response = await http.get(evolutionsURL);
    let evo = response.data.chain;
    let evolutions = [];

    while (evo) {
      evolutions.push(evo.species.name);
      evo = evo.evolves_to[0];
    }

    return evolutions;
  } catch (error) {
    return [];
  }  
}
