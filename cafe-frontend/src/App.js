import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MealsList from "./pages/MealsList";
import MealDetails from "./pages/MealDetails";
import Layout from "./components/layout/Layout";
import Stat from "./pages/Stat";


function App() {
    return (
        <Layout>
            <Switch>
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
                </div>
            </Switch>
        </Layout>
    );
}

export default App;
