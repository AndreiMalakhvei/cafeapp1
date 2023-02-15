import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import ContextStorage from "../context/contextStorage";

const SelectUse = (props) => {
    let {authTokens} = useContext(ContextStorage)
    const [categories, setCategories]= useState([]);


    useEffect( ()=>{
        const getCategory = async ()=>{
        const req= await axios.get("http://127.0.0.1:8000/api/v1/stat/cust",
        {headers: {"Authorization": `JWT ${authTokens?.access}`}}
        );
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

    return (<div>
        <label>Category</label>
        <select name="category" onChange={handleCategory} className="form-select" >
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
