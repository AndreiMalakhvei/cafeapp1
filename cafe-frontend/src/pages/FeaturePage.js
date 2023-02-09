import StatDisplay from "../components/StatDisplay";
import Record from "../components/Record";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import SearchResultsWindow from "./SearchResultWindow";



const FeaturePage= () => {
    const [show, setShow] = useState(false)
    let isEffected = true
    const [list, setList] = useState([])
    const [sortedField, setSortedField] = React.useState("id");
    let trig = "id"

    const searchText = useRef()

    useEffect( () =>{
       axios
        .get(`http://127.0.0.1:8000/api/v1/meals`)
        .then(response => {
                if (isEffected) {
                    setList(response.data.sort((a, b) => a[trig] - b[trig]))}
                });
       return () => {isEffected = false};
    }, []);

    const handleSort = (event) => {
        setSortedField(event.target.value)
        trig = event.target.value
    }


    list.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
            return -1;
        }
        if (a[sortedField] > b[sortedField]) {
            return 1;
        }
        return 0;
     });

    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        setSearch(searchText.current.value);
        setShow(true)
    };

  const filteredRecords = list.filter((record) => {
    return record.name.toLowerCase().includes(search.toLowerCase());
  });


    return (<div>
        <SearchResultsWindow onClose={()=> setShow(false)} show={show} list={filteredRecords}/>

        <div>
            <label>SORT BY</label>
        <select name="category" onChange={handleSort}>
            <option key="1" value="id"> id </option>
            <option key="2" value="name"> name </option>
            <option key="3" value="meal_category"> meal category </option>
            <option key="4" value="price"> price </option>
            <option key="5" value="size"> size </option>
        </select>
        </div>

        <div>
            <input type="text" id="text" ref={searchText}/>
            <button type="button" onClick={handleSearch}>
                Search
            </button>

        </div>


        <table className="table" style={{width: "80%"}}>

                <thead>
                <tr>
                    <th scope="colId">id</th>
                    <th scope="colTitle">Наименование</th>
                    <th scope="colType">Тип</th>
                    <th scope="colDesc">Описание</th>
                    <th scope="colPrice">Цена</th>
                    <th scope="colSize">Вес</th>
                </tr>
                </thead>
                <tbody>
                {list.map(record =>
                    <tr>
                        <td>{record.id}</td>
                        <td>{record.name}</td>
                        <td>{record.meal_category}</td>
                        <td>{record.description}</td>
                        <td>{record.price}</td>
                        <td>{record.size}</td>
                    </tr>)}
                </tbody>
            </table>


    </div>);
}








export default FeaturePage