import React from "react";
import useLoginContext from "../context/LoginContext";

const LoginForm = () => {
  const { actions, store } = useLoginContext();

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="row w-75 ">
        <h1 className="text-center my-3">
          {store.signupMode ? "Sign up" : "Login"}
        </h1>
        <form
          className="d-flex flex-column"
          onSubmit={
            store.signupMode ? actions.handleSignup : actions.handleLogin
          }
        >
          {store.signupMode && (
            <div className="form-outline mb-4 ">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={actions.handleUserInput}
                value={store.userInput.email}
                required
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
              required
              minLength="4"
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
              required
              minLength="4"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <input
              type="submit"
              className="btn btn-primary mb-4"
              value={store.signupMode ? "Sign up" : "Login"}
            />

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
