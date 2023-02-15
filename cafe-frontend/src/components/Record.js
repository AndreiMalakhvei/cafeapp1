
const Record= (props) => {
    const record = props.recontent

    return (
        <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.name}</td>
            <td>{record.total}</td>
        </tr>
    );
}

export default Record
