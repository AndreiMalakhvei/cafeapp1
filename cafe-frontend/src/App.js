import {Route} from 'react-router-dom';
import Home from "./components/Home";

function App() {
    return (
        <div>
            <Route path='/home/'>
                <Home/>
            </Route>
        </div>
    );
}

export default App;
