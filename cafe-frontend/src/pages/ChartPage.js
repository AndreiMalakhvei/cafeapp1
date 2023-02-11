import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import ContextStorage from "../context/contextStorage";


const ChartPage= () => {
    const [chartData, setChartData] = useState([])
    const [meals, setMeals] = useState([])
    let {authTokens} = useContext(ContextStorage)
    const mealSelect = useRef()
    const periodsQty = useRef()
    const timePeriod = useRef()
    const [selectedPeriod, setSelectedPeriod] = useState([])
    const [selectedMeal, setSelectedMeal] = useState([])
    const [selectedQty, setSelectedQty] = useState([])

    let isEffected = true
    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/stat/chart`,
            {headers: {"Authorization": `JWT ${authTokens?.access}`}})
        .then(response => {
                if (isEffected) {
                    setMeals(response.data)}
                });
       return () => {isEffected = false};
    }, []);

    const handleChart = (event) => {
        event.preventDefault()
        setSelectedPeriod(timePeriod.current.value)
        setSelectedMeal(mealSelect.current.value)
        setSelectedQty(periodsQty.current.value)
    }

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/v1/stat/chart",
                {
                    params: {"id": selectedMeal, "interval": selectedPeriod, "qty": selectedQty},
                    headers: {"Authorization": 'JWT ' + authTokens?.access}
                }
            )
            .then(response => {
                setChartData(response.data)
                console.log(response.data)
            });

    }, [selectedPeriod, selectedMeal, selectedQty]);

    return (<div>
        <div>
            <label>Блюдо</label>
            <select name="category" onChange={handleChart} ref={mealSelect}>
                {
                    meals.map((meal) => (
                        <option key={meal.id} value={meal.id}> {meal.name}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <label>Кол-во временных периодов</label>
            <input type="number" max="30" min="1" defaultValue="3" onChange={handleChart} ref={periodsQty}/>
        </div>
        <div>
            <label>Временной период</label>
            <select name="category" onChange={handleChart} ref={timePeriod}>
                <option key="7" value="hrs"> Час</option>
                <option key="8" value="dys"> День</option>
                <option key="9" value="wks"> Неделя</option>
            </select>
        </div>
    </div>);
}

export default ChartPage