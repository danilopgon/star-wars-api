import "./Navbar.css";
import logo from "../../public/Star-Wars-Logo.png";
import useAppContext from "../context/AppContext";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const { store, actions } = useAppContext();
  return (
    <header className="container-fluid bg-body-secondary">
      <div className="row-12 d-flex justify-content-between p-3 align-items-center">
        <Link to='/' className="col-auto">
          <img className="logo" src={logo} alt="logo_star_wars" />
        </Link>
        <nav className="dropdown col-auto">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites{" "}
            <span className="p-1 text-light">
              {store.favoritesList?.length}
            </span>
          </button>
          <ul className="dropdown-menu">
            {store.favoritesList?.map((item) => {
              const itemList = store.allData.find((itemList)=> itemList.name === item);
              const switchUrl = store.characters.includes(itemList)?'characters':'planets';
              return (
                <li className="d-flex m-2" key={item.name}>
                  <Link to={`/${switchUrl}/${itemList.uid}`} className="dropdown-item" href="#" key={item.id}>
                    {item}
                  </Link>
                  <button
                    className="btn btn-danger"
                    id={item}
                    key={item.id}
                    onClick={actions.handleDeleteFavorites}
                  >
                    <i
                      className="fa-regular fa-trash-can p-1"
                      onClick={actions.handleDeleteFavorites}
                      id={item}
                    ></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
