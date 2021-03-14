import React, { useState } from "react";
import {
  BrowserRouter as Router,


  Redirect, Route, Switch
} from "react-router-dom";
import Drawer from "../components/Drawer";
import AddArt from "../pages/AddArt";
import AddBill from "../pages/AddBill";
import Arts from "../pages/Arts";
import Bill from "../pages/Bill";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Report from "../pages/Report";


const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(
    localStorage.getItem("userAuthenticated")
  );

  window.addEventListener("storage", () => {
    setUserAuthenticated(localStorage.getItem("userAuthenticated"));
  });

  return (
    <Router>
      <Switch>
        <Route path={`/Login`}>
          <Login />
        </Route>

        <Drawer>
          <Route path={`/Home`}>
            <Home />
          </Route>

          <Route path={`/Relatorios/:id`}>
            <Report />
          </Route>

          <Route path={`/Faturas/:id`}>
            <Bill />
          </Route>

          <Route path={`/NovaFatura/:id`}>
            <AddBill />
          </Route>

          <Route path={`/Artes/:id`}>
            <Arts />
          </Route>

          <Route path={`/NovaArte/:id`}>
            <AddArt />
          </Route>

          <Route>
            {userAuthenticated === "true" ? (
              <Redirect to="/Home" />
            ) : (
              <Redirect to="/Login" />
            )}
          </Route>
        </Drawer>
      </Switch>
    </Router>
  );
};

export default App;
