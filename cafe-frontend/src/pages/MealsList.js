import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import MealItemInList from "../components/MealItemInList";

const MealsList= (props) => {
    const params = useParams()
    const [mealList, setMealList] = useState([])

    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/menu/${params.typeId}`)
        .then(response => {setMealList(response.data)})
    }, [params.typeId]);


    return (<div>
        <ul>
            {mealList.map(meal => <MealItemInList meal={meal} key={meal.id}/>)}
        </ul>
    </div>);
}

export default MealsList
