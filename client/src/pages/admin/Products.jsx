import Tables from "../../components/Table";

import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../slices/productSlice";

function AdminProducts() {
  const { products, loading, limit, total, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
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
      <Tables data={products} headers={headers} />
    </>
  );
}

export default AdminProducts;