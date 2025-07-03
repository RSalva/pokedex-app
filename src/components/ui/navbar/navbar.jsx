import { Link, NavLink } from "react-router";
//import { useAuth } from "../../../contexts/auth-context";
//import { useTime } from "../../../hooks/use-time";

function Navbar() {
  //const user = useAuth();

  //const time = useTime();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Pokedex App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
            </NavLink>
          </div>
          <div>
            <div className="navbar-nav">
              {/*!user && (
                <>
                  <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                  <NavLink className="nav-link" aria-current="page" to="/register">Register</NavLink>

                </>
              )*/}
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
