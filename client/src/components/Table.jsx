import { Table } from "react-bootstrap";

export default function Tables({ headers, data }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.length > 0
              ? headers.map((d, idx) => {
                  return <th key={idx}>{d}</th>;
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{d?.name}</td>
                    <td>{d?.quantity}</td>
                    <td>{d?.price}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}