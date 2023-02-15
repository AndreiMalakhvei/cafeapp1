import SelectUse from "../components/SelectUse";
import Select from "react-select/base";
import {useRef, useState, useEffect} from "react";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";

const AdminPage= () => {

    const inputName = useRef()
    const inputDescription = useRef()
    const inputPrice = useRef()
    const inputSize = useRef()

    const [newMeal, setNewMeal] = useState({name: "", description: "", price: "", size:"", category:""})
    let catIndex
    let isRequestRequired = false

    const submitFormHandler = (e) => {
        // e.preventDefault()
        setNewMeal({
            ...newMeal,
            name: inputName.current.value,
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            size: inputSize.current.value,
            category: catIndex
        })
        isRequestRequired=true
    }

        useEffect(() => {
            if (isRequestRequired) {
            axios.post("http://127.0.0.1:8000/api/v1/meals/add", newMeal)
                .then((response) => console.log(response.data));

            catIndex = 0
            isRequestRequired=false
        }}, [newMeal])


        const selectedItemHandler = (val) => (catIndex = val)


    return (<div>
        <div>
            <Link to='/features'>
                Features
            </Link>
        </div>
        <form onSubmit={submitFormHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Наименование</label>
                <input
                    // value = {newMeal.value}
                    type="text"
                    id="name"
                    ref={inputName}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Описание</label>
                <textarea
                    // value = {newMeal.description}
                    id="description"
                    ref={inputDescription}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Цена</label>
                <input
                    // value = {newMeal.price}
                    type="text"
                    id="price"
                    ref={inputPrice}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="size">Вес</label>
                <input
                    // value = {newMeal.size}
                    type="number"
                    id="size"
                    ref={inputSize}
                    className="form-control"
                />
            </div>
            <SelectUse onSelectedItem={selectedItemHandler}/>
            <button type="submit" className="btn btn-primary">Добавить блюдо</button>
        </form>
    </div>);
}

export default AdminPage
