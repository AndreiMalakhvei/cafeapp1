

const Record= (props) => {
    const record = props.recontent

    return (
        <tr >
            <td>{record.id}</td>
            <td>{record.name}</td>
            <td>{record.total}</td>
        </tr>
    );
}

export default Record
