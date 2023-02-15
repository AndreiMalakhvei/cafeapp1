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
import LogInPage from "./pages/LogInPage";
import ChartPage from "./pages/ChartPage";


function App() {
    return (
        <Layout>
            <Switch>
                <React.Fragment>
                <div>
                    <Route path='/' exact>
                        <Redirect to='/home'/>
                    </Route>
                    <Route component={Home} path='/home/' />
                    <Route component={Menu} path='/menu' exact />
                    <Route component={MealsList} path='/menu/:typeId'/>
                    <Route component={MealDetails} path='/meals/:mealId'/>
                    <Route component={Stat} path='/stat'/>
                    <Route component={AdminPage}  path='/adminpage'/>
                    <Route component={FeaturePage}  path='/features'/>
                    <Route component={LogInPage} path='/login'/>
                    <Route component={ChartPage} path='/chart'/>
                </div>
                </React.Fragment>
            </Switch>
        </Layout>
    );
}

export default App;
