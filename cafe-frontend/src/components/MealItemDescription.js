import {Link} from "react-router-dom";
import MealItemInList from "./MealItemInList";
import MealPhotos from "./MealPhotos";
import {useEffect, useState} from "react";
import axios from "axios";


const MealItemDescription= (props) => {


    const [description, setDescription] = useState([props.meal])

    useEffect( () =>{
       setDescription(props.meal)
    }, [props.meal.id]);


    return (<div>
        <ul>
            <li>{description.name}</li>
            <li>Категория: {description.meal_category}</li>
            <li>Цена: {description.price} BYN</li>
            <li>Вес: {description.size} г</li>
            <li>Описание: {description.description}</li>
            <li>

                {description?.images?.map(meal => <MealPhotos meal={meal} key={meal.id}/>)}
            </li>
        </ul>
    </div>);
}

export default MealItemDescription