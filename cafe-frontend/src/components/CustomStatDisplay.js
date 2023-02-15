import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import SelectUse from "./SelectUse";
import StatDisplay from "./StatDisplay";
import ContextStorage from "../context/contextStorage";

const CustomStatDisplay= () => {

    const [customList, setCustomList] = useState([])
    const [categoryId, setCategoryId] = useState(1)
    const [usersNumber, setUsersNumber] = useState(3)
    const [categoryName, setCategoryName] = useState("")

    const selectedItemHandler = (selectedCategory) => {
        setCategoryId(selectedCategory)
        let isEffected = true
    }

    const IntegerHandler = (event) => {
        setUsersNumber(event.target.value)
        let isEffected = true
    }



    let isEffected = true
    let {authTokens} = useContext(ContextStorage)
    useEffect( () =>{
       axios
        .get("http://127.0.0.1:8000/api/v1/stat/cust",
            {
            params: {"limit": usersNumber, "category": categoryId},
            headers: {"Authorization": 'JWT ' + authTokens?.access}
           }
        )
        .then(response => {
                if (isEffected) {
                    setCustomList(response.data)}
                });
       return () => {isEffected = true};
    }, [categoryId, usersNumber]);



    return (<div>
            <h1>Top {usersNumber} users in category {categoryName}</h1>
        <form>
            <SelectUse onSelectedItem={selectedItemHandler}/>
            <div>
                <label>integer input</label>
                <input type="number" max="20" min="1" defaultValue="3" onChange={IntegerHandler}/>
            </div>

        </form>

        <div>
            <StatDisplay title=' ' content={customList}/>
        </div>
    </div>
    );
}

export default CustomStatDisplay
