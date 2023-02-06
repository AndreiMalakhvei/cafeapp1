import {Link} from "react-router-dom";


const MealType= (props) => {
    return (<li>
        <Link to={`/menu/${props.id}`}><h1>{props.mealtype}</h1></Link>
    </li>);
}

export default MealType
