import {Link} from "react-router-dom";


const MealItemInList= (props) => {
    return (<div>
        <ul>
            <li>{props.meal.name}</li>
            <img src={props.meal.image_url} alt={props.meal.name} />
            <li><Link to={`/meals/${props.meal.id}`}>Подробнее</Link></li>
        </ul>
    </div>);
}

export default MealItemInList

