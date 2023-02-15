import {useContext} from "react";
import ContextStorage from "../context/contextStorage";

const LogInPage= () => {
    const {loginUser} = useContext(ContextStorage)


    return (<div>
        <p>This is Log In Page</p>
        <div>
            <form onSubmit={loginUser} >
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" />
            </form>
        </div>

    </div>);
}

export default LogInPage
