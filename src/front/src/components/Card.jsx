import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import useAppContext from "../context/AppContext";
import useLoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";

export const Card = ({ item, children }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const { actions: appActions } = useAppContext();
  const { store: loginStore } = useLoginContext();

  const itemType = appActions.getItemType(item);

  const switchStatus = (e) => {
    setLikeStatus((prev) => {
      return !prev;
    });
    return appActions.handleAddFavoritesList(e);
  };

  const color = useMemo(() => {
    return likeStatus ? "text-danger" : "text-warning";
  }, [likeStatus]);

  return (
    <div className="card col-10 col-md-6 col-lg-2 mx-3 p-0">
      <img
        className="object-fit-contain"
        src={`https://starwars-visualguide.com/assets/img/${itemType}s/${item.id}.jpg`}
        alt="img-default"
      />

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        {children}
      </div>
      <div className="card-footer d-flex justify-content-around">
        <Link
          className="btn btn-outline-primary"
          to={`/${itemType}s/${item.id}`}
        >
          Learn More!
        </Link>
        {loginStore.loggedIn ? (
          <button
            id={item.id}
            className={`btn btn-outline-warning ${color} p-0`}
          >
            <i
              id={item.id}
              className={` fa-solid fa-heart ${color} px-2 py-2 ${item.name}`}
              onClick={switchStatus}
            ></i>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
