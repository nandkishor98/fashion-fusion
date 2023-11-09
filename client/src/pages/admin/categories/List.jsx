import { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useCategories } from "../../../hooks/useCategories";
import Hookpagination from "../../../components/Hookpagination";

export default function List() {
  const navigate = useNavigate();
  const { data, list, remove } = useCategories();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = useCallback(async () => {
    const result = await list({ page: currentPage, limit: limit });
    if (result) {
      setTotal(result.total);
      setCurrentPage(result.page);
    }
  }, [list, currentPage, limit]);

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
          list({ page: currentPage, limit: limit });
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
          Add New Category
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
              <td className="text-center" colSpan={4}>
                No Categories
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