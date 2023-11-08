import { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useOrders } from "../../../hooks/useOrders";

export default function ListOrders() {
  const navigate = useNavigate();
  const { data, approve, list, remove } = useOrders();

  const fetchOrders = useCallback(async () => {
    list();
  }, [list]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const resp = await remove(id);
        if (resp) {
          Swal.fire({
            title: "Deleted!",
            text: "Delete Successful.",
            icon: "success",
          });
          list();
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleApprove = async (event, id, status) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      });
      if (result.isConfirmed) {
        const payload =
          status === "pending"
            ? { status: "completed" }
            : { status: "pending" };
        const resp = await approve(id, payload);
        if (resp) {
          Swal.fire({
            title: "Approved!",
            text: "Approve Successful.",
            icon: "success",
          });
          list();
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <div>
      <h1 className="text-center">Orders</h1>
      <div className="d-flex flex-row-reverse mb-2">
        <Link to="/admin/orders/add" className="btn btn-danger">
          Add new Order
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order#</th>
            <th>Buyer Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, idx) => {
              return (
                <tr key={item?._id}>
                  <td width="30%">{item?.id}</td>
                  <td>{item?.email}</td>
                  <td>{item?.amount}</td>
                  <td>{item?.status}</td>
                  <td width="10%">
                    <div className="d-flex justify-content-evenly">
                      <BsFillTrashFill
                        color="red"
                        onClick={(e) => handleDelete(e, item?.id)}
                      />
                      <BsFillPencilFill
                        onClick={() => navigate(`/admin/orders/${item?._id}`)}
                      />
                      <TiTickOutline
                        color="green"
                        onClick={(e) =>
                          handleApprove(e, item?._id, item?.status)
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No Orders
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}