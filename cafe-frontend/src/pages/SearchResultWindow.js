import AllMealsTable from "../components/AllMealsTable";

const SearchResultsWindow= (props) => {
    if (!props.show) {return null}

    return (<div>
        {props.list.length
        ? <AllMealsTable list={props.list} />
        : <h4>NO RECORDS FOUND</h4>}
       <button onClick={props.onClose} className="btn btn-danger">CLOSE</button >
    </div>);
}

export default SearchResultsWindow
