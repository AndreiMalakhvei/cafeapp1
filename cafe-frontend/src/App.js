import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MealsList from "./pages/MealsList";
import MealDetails from "./pages/MealDetails";
import Layout from "./components/layout/Layout";
import Stat from "./pages/Stat";
import React from "react";
import AdminPage from "./pages/AdminPage";
import FeaturePage from "./pages/FeaturePage";


function App() {
    return (
        <Layout>
            <Switch>
                <React.Fragment>
                <div>
                    <Route path='/' exact>
                        <Redirect to='/home'/>
                    </Route>
                    <Route path='/home'>
                        <Home/>
                    </Route>
                    <Route path='/menu' exact>
                        <Menu/>
                    </Route>
                    <Route path='/menu/:typeId'>
                        <MealsList/>
                    </Route>
                    <Route path='/meals/:mealId'>
                        <MealDetails/>
                    </Route>
                    <Route path='/stat'>
                        <Stat/>
                    </Route>
                    <Route path='/adminpage'>
                        <AdminPage/>
                    </Route>
                    <Route path='/features'>
                        <FeaturePage/>
                    </Route>
                </div>
                </React.Fragment>
            </Switch>
        </Layout>
    );
}

export default App;
