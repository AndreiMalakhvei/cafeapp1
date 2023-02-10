import React, {useEffect, useRef, useState, useMemo} from "react";
import axios from "axios";
import SearchResultsWindow from "./SearchResultWindow";
import AllMealsTable from "../components/AllMealsTable";


const FeaturePage = () => {
    const [show, setShow] = useState(false)
    let isEffected = true
    const [list, setList] = useState([])
    const [sortedField, setSortedField] = React.useState("id");
    const [sortedOrder, setSortedOrder] = React.useState("ascending");
    let trig = "id"
    const [fetchedList, setFetchedList] = useState([])


    const minPrice = useRef()
    const maxPrice = useRef()

    const searchText = useRef()

    const sortOrder = useRef()
    const sortField = useRef()

     //to implement UseMemo on proce filter field
    const [mn, setMn] = useState(1)
    const [mx, setMx] = useState(100000000)

    const filtered = useMemo(
        () =>
            list.filter((record) => {
                console.log("filtering...")
                return record.price >= parseInt(mn) && record.price <= parseInt(mx);
            }), [mx, mn]);

    useEffect(() => {
        setList(filtered)
    }, [filtered]);
//end of useMemo inplementation

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/v1/meals`)
            .then(response => {
                if (isEffected) {
                    setList(response.data.sort((a, b) => a[trig] - b[trig]))
                }
                setFetchedList(response.data.sort((a, b) => a[trig] - b[trig]))
            });
        return () => {
            isEffected = false
        };
    }, []);


    const handleSort = (event) => {
        setSortedField(sortField.current.value)
        setSortedOrder(sortOrder.current.value)
        // trig = event.target.value
    }


    list.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
            return sortedOrder === 'ascending' ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
            return sortedOrder === 'ascending' ? 1: -1;
        }
        return 0;
    });

    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        if (searchText.current.value) {
            setSearch(searchText.current.value);
            setShow(true)
        }
    };

    const filteredRecords = useMemo(
        () =>
        list.filter((record) => {
        return record.name.toLowerCase().includes(search.toLowerCase()) || record.description.toLowerCase().includes(search.toLowerCase());
    }), [search]
    );

    const filterByPriceHandler = (event) => {
        event.preventDefault()
        if (minPrice.current.value && maxPrice.current.value) {
            setMn(minPrice.current.value)
            setMx(maxPrice.current.value)
        }
    }

//before UseMemo implementation
    //   const filterByPriceHandler = (event) => {
    //     event.preventDefault()
    //     if (minPrice.current.value && maxPrice.current.value) {
    //
    //         const filtered = list.filter((record) => {
    //             console.log("filtering...")
    //             return record.price >= parseInt(minPrice.current.value) && record.price <= parseInt(maxPrice.current.value);
    //         });
    //         setList(filtered)
    //     }
    // }


    const setDefault = (event) => {
        maxPrice.current.value = ""
        minPrice.current.value = ""
        searchText.current.value = ""
        sortOrder.current.value = "ascending"
        sortField.current.value = "id"
        setSortedField("id")
        setSortedOrder("ascending")

        setList(fetchedList)
    }


    return (<div>
        <SearchResultsWindow onClose={() => setShow(false)} show={show} list={filteredRecords}/>

        <div>
            <label>SORT BY</label>
            <select name="category" onChange={handleSort} ref={sortField}>
                <option key="1" value="id"> id</option>
                <option key="2" value="name"> name</option>
                <option key="3" value="meal_category"> meal category</option>
                <option key="4" value="price"> price</option>
                <option key="5" value="size"> size</option>
            </select>
            <select name="category" onChange={handleSort} ref={sortOrder}>
                <option key="5" value="ascending"> ASCENDING</option>
                <option key="6" value="descending"> DESCENDING</option>
            </select>
        </div>

        <div>
            <input type="text" id="text" ref={searchText}/>
            <button type="button" onClick={handleSearch}>
                Search
            </button>
        </div>

        <div>
            <form onSubmit={filterByPriceHandler}>
                <label htmlFor="min">Цена от: </label>
                <input type="number" id="min" ref={minPrice}/>
                <label htmlFor="max">до: </label>
                <input type="number" id="max" ref={maxPrice}/>
                <button type="submit">FILTER BY PRICE</button>
            </form>
            <button onClick={setDefault}>DEFAULT</button>
        </div>


        <div>
            <AllMealsTable list={list}/>
        </div>


    </div>);
}


export default FeaturePage