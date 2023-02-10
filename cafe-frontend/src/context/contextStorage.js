import {useState, useEffect, createContext} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import header from "../components/layout/Header";
import {useHistory} from "react-router-dom";

const ContextStorage = createContext()

export default ContextStorage;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens')
        ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    const loginUser = async (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/api/v1/api/token/",
            {username: e.target.username.value, password: e.target.password.value},
            // {headers: {"Content-Type": "application/json"}}
        )
            .then(response => {
                let data = response.data
                if (response.status === 200) {
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    history.push('/')
                }
            })
            // .then( res => {  if (user) {history.push('/home/')}  } )
    }

     let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    const updateToken = async() => {
        console.log("Token updated")
        axios.post("http://127.0.0.1:8000/api/v1/api/token/refresh",
            {"refresh": authTokens?.refresh},
            // {headers: {"Content-Type": "application/json"}}
        )
            .then(response => {
                let data = response.data
                if (response.status === 200) {
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    history.push('/')
                } else{
                     logoutUser()
                }
            })
        if(loading){
            setLoading(false)
        }
    }

     useEffect(()=> {
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 5
        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])


    let contextData = {
            loginUser: loginUser,
            logoutUser: logoutUser,
            user:user
    }


    return (
        <ContextStorage.Provider value={contextData}>
            {children}
        </ContextStorage.Provider>
    )
}