import {useState, useEffect} from "react";
import axios from "axios";
import MealType from "../components/MealType";



const Menu= () => {
    const [mealTypes, setMealTypes] = useState([])

    useEffect( () =>{
       axios
        .get('http://127.0.0.1:8000/api/v1/menu/all')
        .then(response => {setMealTypes(response.data)})
    }, []);

    // async function getMealTypes() {
    //     const response = await axios.get('http://127.0.0.1:8000/api/v1/menu/all')
    //     setMealTypes(response.data)
    // }

    return (<div>
         <ul>
           {mealTypes.map(mealType => <MealType mealtype={mealType.category} id={mealType.id} key={mealType.id} />)}
        </ul>
        {/*<button onClick={getMealTypes}>RUN</button>*/}
    </div>);
}

export default Menu