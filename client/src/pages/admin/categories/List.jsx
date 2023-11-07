import { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useCategories } from "../../../hooks/useCategories";

export default function List() {
  const navigate = useNavigate();
  const { data, list, remove } = useCategories();

  const fetchCategories = useCallback(async () => {
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <div>
      <h1 className="text-center">Categories</h1>
      <div className="d-flex flex-row-reverse mb-2">
        <Link to="/admin/categories/add" className="btn btn-danger">
          Add new Categories
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
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
                  <td>{item?.slug}</td>
                  <td width="10%">
                    <div className="d-flex justify-content-evenly">
                      <BsFillTrashFill
                        color="red"
                        onClick={(e) => handleDelete(e, item?._id)}
                      />
                      <BsFillPencilFill
                        onClick={() =>
                          navigate(`/admin/categories/${item?._id}`)
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>No data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}