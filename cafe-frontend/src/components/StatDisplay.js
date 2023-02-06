import Record from "./Record";

const StatDisplay= (props) => {
    const title = props.title
    const content = props.content

    return (
        <div>
            <h3>{title}</h3>
            <table className="table" style={{width: "80%"}}>
                <thead>
                <tr>
                    <th scope="colId">Номер</th>
                    <th scope="colTitle">Название</th>
                    <th scope="colQuantity">Количество</th>
                </tr>
                </thead>
                <tbody>
                    {content.map(record => <Record key={content.id} recontent={record} />)}
                </tbody>
            </table>
        </div>
    );


}

export default StatDisplay
