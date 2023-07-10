import React from "react";
import useLoginContext from "../context/LoginContext";

const LoginForm = () => {
  const { actions, store } = useLoginContext();

  console.log(store.userInput);

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="row w-75">
        <form className="d-flex flex-column">
          {store.signupMode && (
            <div className="form-outline mb-4 ">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={actions.handleUserInput}
                value={store.userInput.email}
              />
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
            </div>
          )}

          <div className="form-outline mb-4 ">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              onChange={actions.handleUserInput}
              value={store.userInput.username}
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={actions.handleUserInput}
              value={store.userInput.password}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <button type="button" className="btn btn-primary mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                {store.signupMode ? (
                  <span>
                    Already registered?{" "}
                    <a
                      onClick={() => {
                        actions.setSignupMode(false);
                      }}
                      href="#"
                    >
                      Login
                    </a>
                  </span>
                ) : (
                  <span>
                    Not a member?{" "}
                    <a
                      onClick={() => {
                        actions.setSignupMode(true);
                      }}
                      href="#"
                    >
                      Register
                    </a>
                  </span>
                )}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;