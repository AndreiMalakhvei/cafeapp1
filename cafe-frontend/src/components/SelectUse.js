import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectUse = (props) => {
    const [categories, setCategories]= useState([]);
    // const [categoryObj, setCategoryObj]= useState('');

    useEffect( ()=>{
        const getCategory = async ()=>{
        const req= await axios.get("http://127.0.0.1:8000/api/v1/stat/cust");
        const getRes= await req.data;
        setCategories(await getRes);

   }
   getCategory();

    },[]);

    const handleCategory=(event)=>{
    const getCategoryObj= event.target.value;
    event.preventDefault();
    props.onSelectedItem(getCategoryObj)
  }

  // const handleInput = (event) => {
  //       console.log(event.target.innerHtml)
  // }

    return (<div>
        <label>Country</label>
        <select name="category" onChange={handleCategory} >
            <option>--Select Category--</option>
            {
                categories.map((cat) => (
                    <option key={cat.id} value={cat.id}> {cat.category}</option>
                ))
            }
        </select>

    </div>);
}

export default SelectUse


