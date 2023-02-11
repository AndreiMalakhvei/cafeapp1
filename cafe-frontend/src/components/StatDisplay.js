import Record from "./Record";
import {useContext} from "react";
import ContextStorage from "../context/contextStorage";

const StatDisplay= (props) => {

    const title = props.title
    const content = props.content

    return (
        <div>
            <h1>{title}</h1>
            <table className="table" style={{width: "80%"}}>
                <thead>
                <tr>
                    <th scope="colId">Номер</th>
                    <th scope="colTitle">Название</th>
                    <th scope="colQuantity">Количество</th>
                </tr>
                </thead>
                <tbody>
                    {content.map(record => <Record recontent={record} key={content.id} />)}
                </tbody>
            </table>
        </div>
    );


}

export default StatDisplay
