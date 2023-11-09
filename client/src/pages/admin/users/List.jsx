import { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Hookpagination from "../../../components/Hookpagination";
import { useUsers } from "../../../hooks/useUsers";

export default function ListUsers() {
  const navigate = useNavigate();
  const { data, list, remove, blockUser } = useUsers();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    const result = await list({ page: currentPage, limit: limit });
    if (result) {
      setTotal(result.total);
      setCurrentPage(result.pageNum);
    }
  }, [list, currentPage, limit]);

  const handleDelete = async (event, id, status) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${!status ? "Archive" : "Unarchive"}  user!`,
      });
      if (result.isConfirmed) {
        const resp = await remove(id, { isArchived: !status });
        if (resp) {
          Swal.fire({
            title: "Deleted!",
            text: `${!status ? "Archive" : "Unarchive"} Successful.`,
            icon: "success",
          });
          list({ page: currentPage, limit: limit });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleBlock = async (event, id, status) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${status ? "Block" : "Unblock"} user!`,
      });
      if (result.isConfirmed) {
        const resp = await blockUser(id, { isActive: !status });
        if (resp) {
          Swal.fire({
            title: "Block!",
            text: `User has been ${status ? "Block" : "Unblock"}.`,
            icon: "success",
          });
          list({ page: currentPage, limit: limit });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1 className="text-center">Users</h1>
      <div className="d-flex flex-row-reverse mb-2">
        <Link to="/admin/users/add" className="btn btn-danger">
          Add New User
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Is Active?</th>
            <th>Is Archived?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, idx) => {
              return (
                <tr key={item?._id}>
                  <td width="5%">{idx + 1}</td>
                  <td>{item?.name}</td>
                  <td>
                    {item?.email}&nbsp;
                    {item?.isEmailVerified ? (
                      <TiTickOutline color="green" />
                    ) : null}
                  </td>
                  <td>{item?.roles.toString()}</td>
                  <td>{item?.isActive ? "Yes" : "No"}</td>
                  <td>{item?.isArchived ? "Yes" : "No"}</td>
                  <td width="10%">
                    <div className="d-flex justify-content-evenly">
                      <BsFillTrashFill
                        color="red"
                        onClick={(e) =>
                          handleDelete(e, item?._id, item?.isArchived)
                        }
                      />
                      <BsFillPencilFill
                        onClick={() => navigate(`/admin/users/${item?._id}`)}
                      />
                      <ImBlocked
                        onClick={(e) =>
                          handleBlock(e, item?._id, item?.isActive)
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={7}>
                No Users
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Hookpagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
      />
    </div>
  );
}