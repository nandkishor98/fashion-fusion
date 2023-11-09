import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Tables({ headers, data, remove, msg, url }) {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const swalRes = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (swalRes.isConfirmed) {
      // Delete Hook
      await remove(url, id);
      Swal.fire("Deleted!", msg, "success");
    }
  };
  const handleEdit = async (id) => {
    navigate(`/admin/products/${id}`);
  };
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((d, idx) => {
              return (
                <tr key={idx}>
                  <td width="5%">{idx + 1}</td>
                  <td>{d?.name}</td>
                  <td>{d?.quantity}</td>
                  <td>{d?.price}</td>
                  <td width={"10%"}>
                    <div className="flex d-flex justify-content-evenly">
                      <BsFillTrashFill
                        color="red"
                        onClick={() => handleDelete(d?._id)}
                      />
                      <BsFillPencilFill onClick={() => handleEdit(d?._id)} />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={5}>
                No Products
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
