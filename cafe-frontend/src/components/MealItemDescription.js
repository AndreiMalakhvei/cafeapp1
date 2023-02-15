import {Link} from "react-router-dom";
import MealItemInList from "./MealItemInList";
import MealPhotos from "./MealPhotos";
import {useEffect, useState} from "react";
import axios from "axios";


const MealItemDescription= (props) => {


    const [description, setDescription] = useState([props.meal])

    useEffect(() => {
        setDescription(props.meal)
    }, [props.meal.id]);


    return (
        <div>

            <div className="container text-center">
                <div className="row">
                    <div className="col-md-10 offset-md-2">

                        <li>{description.name}</li>
                        <li>Категория: {description.meal_category}</li>
                        <li>Цена: {description.price} BYN</li>
                        <li>Вес: {description.size} г</li>
                        <li>Описание: {description.description}</li>

                    </div>

                </div>
            </div>

            <div>
                {description?.images?.map(meal => <MealPhotos meal={meal} key={meal.id}/>)}
            </div>


            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">

                    {description?.images?.map(meal => <MealPhotos meal={meal} key={meal.id}/>)}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}


export default MealItemDescription
