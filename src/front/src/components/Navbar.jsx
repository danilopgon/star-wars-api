import "./Navbar.css";
import logo from "../../public/Star-Wars-Logo.png";
import useAppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import useLoginContext from "../context/LoginContext";

export const Navbar = () => {
  const { store: appStore, actions: appActions } = useAppContext();
  const { store: loginStore, actions: loginActions } = useLoginContext();

  return (
    <header className="container-fluid bg-body-secondary">
      <div className="row-12 d-flex justify-content-between p-3 align-items-center">
        <Link to="/" className="col-auto">
          <img className="logo" src={logo} alt="logo_star_wars" />
        </Link>
        {loginStore.loggedIn ? (
          <nav className="dropdown col-auto">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites
              <span className="p-1 text-light">
                {appStore.favoritesList?.length}
              </span>
            </button>
            <ul className="dropdown-menu">
              {appStore.favoritesList?.map((item) => {
                const itemType = appActions.getItemType(item);

                return (
                  <li className="d-flex m-2" key={item.id}>
                    <Link
                      to={`/${itemType}s/${item.id}`}
                      className="dropdown-item"
                      href="#"
                      key={item.id}
                    >
                      {item.name}
                    </Link>
                    <button
                      className={`${item.name} btn btn-danger`}
                      id={item.id}
                      onClick={(e) => appActions.handleDeleteFavorites(e)}
                    >
                      <i
                        className={`${item.name} fa-regular fa-trash-can p-1`}
                        onClick={(e) => appActions.handleDeleteFavorites(e)}
                        id={item.id}
                      ></i>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className="ms-3 btn btn-danger"
              onClick={loginActions.handleLogout}
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="dropdown col-auto">
            <Link
              to="/login"
              className="btn btn-primary"
              type="button"
              aria-expanded="false"
            >
              Login{}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
