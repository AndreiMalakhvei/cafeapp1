import React from "react";


const AllMealsTable= (props) => {
    return (
        <div>
        <table className="table table-dark table-striped" style={{width: "80%"}}>

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
            {props.list.map(record =>
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.meal_category}</td>
                    <td>{record.description}</td>
                    <td>{record.price}</td>
                    <td>{record.size}</td>
                </tr>)}
            </tbody>
        </table>
            </div>
    )
}

export default AllMealsTable
