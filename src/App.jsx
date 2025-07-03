import { Route, Routes } from "react-router";
import { HomePage, PokemonDetailsPage } from "./pages/index.js"
import { Navbar } from "./components/ui/index.js";


function App() {
  
  return (
    <div className="main-container">
      <Navbar />
      <div  className="container shadow bg-black bg-gradient mt-1 pt-3 pb-2 px-1 rounded">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetailsPage />} />
        </Routes>
      </div>
      
    </div>
    
  );
}

export default App;
