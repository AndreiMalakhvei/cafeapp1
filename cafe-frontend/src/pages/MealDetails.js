import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import MealItemDescription from "../components/MealItemDescription";

const MealsDetails= () => {
    const params = useParams()
    const [mealDescription, setMealDescription] = useState([])

    useEffect( () =>{
        let isEffected = true
       axios
        .get(`http://127.0.0.1:8000/api/v1/meals/${params.mealId}`)
        .then(response => { if (isEffected) {setMealDescription(response.data)}
                });
        return () => {isEffected = false};

    }, []);


    return (<div>
        <ul>
           <MealItemDescription meal={mealDescription} />
        </ul>
    </div>);
}

export default MealsDetails