import PokemonCard from "../pokemon-card/pokemon-card";


function PokemonList({ pokemonList, isLoading, className = "" }) {
  return (
    <>
      <div className="container">
        <div className={`row row-cols-2 row-cols-sm-4 row-cols-lg-5 g-2 ${className}`}>
          {pokemonList.map((pokemon) => {
            return (
                <div className="col" key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} isLoading={isLoading} />
                </div>
            )     
          })}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="input-group">
              
            </div>

          </div>
        </div>
      </div>
      
    </>
  );
}

export default PokemonList;