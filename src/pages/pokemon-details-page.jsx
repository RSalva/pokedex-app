import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPokemonById } from "../services/poke-api";
import { PokemonDetails } from "../components/pokemon";

function PokemonDetailsPage() {
  const { pokemonId } = useParams();
  const [ pokemon, setPokemon ] = useState();

  useEffect(() => {
    async function getPokemon() {
      try {
        const resultPokemon = await getPokemonById(pokemonId);
        setPokemon(resultPokemon);
      } catch (error) {
        console.error(error);
      }
    }
    getPokemon();
  }, [pokemonId]);

  return (
    <PokemonDetails pokemon={pokemon} />
  );
}

export default PokemonDetailsPage;