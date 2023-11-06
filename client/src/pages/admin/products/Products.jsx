import Tables from "../../../components/Table";

import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../slices/productSlice";

import useApi from "../../../hooks/useApi";
import { URLS } from "../../../constants";

function AdminProducts() {
  const { products, limit, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const { msg, deleteById } = useApi();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page: currentPage }));
  }, [dispatch, currentPage, limit]);

  const headers = ["ID", "Name", "Quantity", "Price"];

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="mb-2 flex d-flex justify-content-end">
        <Link to="/admin/products/add">
          <button className="btn btn-danger">Add New Product</button>
        </Link>
      </div>
      <Tables
        data={products}
        headers={headers}
        remove={deleteById}
        msg={msg}
        url={URLS.PRODUCTS}
      />
    </>
  );
}

export default AdminProducts;