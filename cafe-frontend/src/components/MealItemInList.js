import {Link} from "react-router-dom";


const MealItemInList= (props) => {
    return (<div>

        <div className="container px-4 text-center">
            <div className="row gx-5">
                <div className="col">
                    <div className="p-3">
                        <img src={props.meal.image_url} alt={props.meal.name} width="200" height="200"/>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">

                        <h3>{props.meal.name}</h3>
                        <Link to={`/meals/${props.meal.id}`}>Подробнее</Link>

                    </div>
                </div>
            </div>
        </div>

    </div>);
}

export default MealItemInList

