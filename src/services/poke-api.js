import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const baseApiUrl = "https://pokeapi.co/api/v2";
const instance = axios.create();
const http = setupCache(instance);

function parsePokemon(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
    types: pokemon.types, 
    abilities: pokemon.abilities, 
    baseExperience: pokemon.baseExperience, 
    cries: (pokemon.cries.latest) ? pokemon.cries.latest : pokemon.cries.legacy,
    height: pokemon.height, 
    moves: pokemon.moves,
    weight: pokemon.weight
  }
}

export async function listPokemon(offset, limit, setIsLoading) {
  const response = await http.get(`${baseApiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  //console.log(response);
  const pokemonList = response.data.results;
  //console.log(pokemonList);
  const pokemons = await Promise.all(pokemonList.map((pokemon) => http.get(pokemon.url)));
  //console.log(pokemons);
  return pokemons.map(({ data }) => {
    console.log(data);
    setIsLoading(false);
    return parsePokemon(data);
  })
}