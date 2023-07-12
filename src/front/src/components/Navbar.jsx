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
              Favorites{" "}
              <span className="p-1 text-light">
                {appStore.favoritesList?.length}
              </span>
            </button>
            <ul className="dropdown-menu">
              {appStore.favoritesList?.map((item) => {
                const itemList = appStore.allData.find(
                  (itemList) => itemList.name === item
                );
                const switchUrl = appStore.characters.includes(itemList)
                  ? "characters"
                  : "planets";
                return (
                  <li className="d-flex m-2" key={item.name}>
                    <Link
                      to={`/${switchUrl}/${itemList.uid}`}
                      className="dropdown-item"
                      href="#"
                      key={item.id}
                    >
                      {item}
                    </Link>
                    <button
                      className="btn btn-danger"
                      id={item}
                      key={item.id}
                      onClick={appActions.handleDeleteFavorites}
                    >
                      <i
                        className="fa-regular fa-trash-can p-1"
                        onClick={appActions.handleDeleteFavorites}
                        id={item}
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
