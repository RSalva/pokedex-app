

function PokemonCard({ pokemon, isLoading }) {
  if (isLoading) {
    return (
      <div className="card text-center shadow-sm h-100">
        <img
          className="card-img-top"
          src="../../../../src/assets/images/loading/loading-pokeball.gif"
          alt="loading"
          style={{ width: "100px", margin: "20px auto 0" }}
        />
      </div>
    );
  } else {
    return (
      <div className="card text-center shadow-sm h-100 d-flex flex-column justify-content-between p-2">
        <img
          className="card-img-top"
          src={pokemon.image}
          alt={pokemon.name}
          style={{ height: "100px"}}
        />
        <div className="card-body d-flex flex-column justify-content-end">
          <h5 className="card-title">{pokemon.name.toUpperCase()}</h5>
          <p className="card-text">
            <strong>ID:</strong> {pokemon.id}<br />
            <strong>Tipo:</strong> {pokemon.types.map((type, index) => {
              let comma = "";
              index < pokemon.types.length - 1 ? comma = ", " : comma = ".";
              return type.type.name + comma;
            })}
          </p>
        </div>
      </div>
    );
  }
  
}

export default PokemonCard;
