
const SearchResultsWindow= (props) => {
    if (!props.show) {return null}
    return (<div>
        {!props.list.length && <h4>NO RECORDS FOUND</h4>}
       <button onClick={props.onClose}>CLOSE</button>
    </div>);
}

export default SearchResultsWindow