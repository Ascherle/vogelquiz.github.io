import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import QuizPage from "./pages/QuizPage";
import EditPageOverview from "./pages/EditPageOverview";
import EditLevel from "./pages/EditLevel";
import AddEntry from "./pages/AddEntry";



function App()  {

  


    return(

      <div className="col-xl-6 col-lg-8 col-md-10 mx-auto">
        <Switch>
          <Route path='/' exact>
            <QuizPage/>
          </Route>

          <Route path='/editlvl' exact>
            <EditLevel/>
          </Route>

          <Route path='/add-entry' exact>
            <AddEntry/>
          </Route>

          <Route>
            <EditPageOverview path='/edit' exact/>
          </Route>
        </Switch>
      </div>

    );


};
export default App;
