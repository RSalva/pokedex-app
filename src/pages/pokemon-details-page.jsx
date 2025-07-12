import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPokemonById } from "../services/poke-api";
import { PokemonDetails } from "../components/pokemon";

function PokemonDetailsPage() {
  const { pokemonId } = useParams();
  const [ pokemon, setPokemon ] = useState();
  useEffect(() => {
    async function getPokemon() {
      const resultPokemon = await getPokemonById(pokemonId);
      setPokemon(resultPokemon);
    }
    getPokemon();
  }, [pokemonId]);

  return (
    <>
      {pokemon ? <PokemonDetails pokemon={pokemon} /> : null}
    </>
  );
}

export default PokemonDetailsPage;