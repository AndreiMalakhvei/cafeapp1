import {useEffect, useState} from "react";
import axios from "axios";
import StatDisplay from "../components/StatDisplay";


const Stat= () => {
    const [activeList, setActiveList] = useState([])
    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/stat/top10active`)
        .then(response => {setActiveList(response.data)})
    }, []);

    const [clickedList, setClickedList] = useState([])
    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/stat/top10active`)
        .then(response => {setClickedList(response.data)})
    }, []);



    return (<div>
        <p>This is Stat page</p>
        <div>
            <StatDisplay title='Top10 Active Users' content={activeList}/>
        </div>
        <div>
            <StatDisplay title='Top3 Clicked Meals' content={clickedList}/>
        </div>
        <div>

            <StatDisplay title='Top3 Clicked Meals' content={clickedList}/>

        </div>
    </div>);
}


export default Stat