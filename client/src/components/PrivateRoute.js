import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../AppContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(Context);

  // useEffect(() => {
  //   console.log("Rendering private route");
  //   console.log(isLoggedIn);
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
