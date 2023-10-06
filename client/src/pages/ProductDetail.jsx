import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return <>ProductDetail {id}</>;
};

export default ProductDetail;