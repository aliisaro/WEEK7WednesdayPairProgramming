import { Link } from "react-router-dom";

const Navbar = () => {
  const flag = false;
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {flag && (
            <div>
              <span>my.email@email.com</span>
              <button>Log out</button>
            </div>
          )}
          {!flag && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
