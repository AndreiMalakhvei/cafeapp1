import {useContext, useEffect, useState} from "react";
import axios from "axios";
import StatDisplay from "../components/StatDisplay";
import CustomStatDisplay from "../components/CustomStatDisplay";
import {Link} from "react-router-dom";
import ContextStorage from "../context/contextStorage";

const Stat= () => {
    let {authTokens} = useContext(ContextStorage)

    let isEffected = true
    const [activeList, setActiveList] = useState([])
    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/stat/top10active`,
            {headers: {"Authorization": `JWT ${authTokens?.access}`}}
        )
        .then(response => {
                if (isEffected) {
                    setActiveList(response.data)}
                });
       return () => {isEffected = false};
    }, []);


    const [clickedList, setClickedList] = useState([])
    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/stat/top3clicked`,
            {headers: {"Authorization": `JWT ${authTokens?.access}`}})
        .then(response => {
                if (isEffected) {
                    setClickedList(response.data)}
                });
       return () => {isEffected = false};
    }, []);

    const selectChangeHandler = event => {
        console.log(event.target.value)

    }


    return (<div>
        <p>This is Stat page</p>
        <Link to={'/chart/'}> CHART </Link>
        <div>
            <StatDisplay title='Top10 Active Users' content={activeList}/>
        </div>
        <div>
            <StatDisplay title='Top3 Clicked Meals' content={clickedList}/>
        </div>
        <div>

            <CustomStatDisplay />

        </div>
    </div>);
}

export default Stat
