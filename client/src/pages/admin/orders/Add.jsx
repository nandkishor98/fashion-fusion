import { useCallback, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import {
  Button,
  Container,
  Row,
  Table,
  Col,
  Form,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../slices/productSlice";
import { useOrders } from "../../../hooks/useOrders";

const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { create } = useOrders();
  const { products: allProducts } = useSelector((state) => state.products);

  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    amount: 0,
  });
  const [item, setItem] = useState({
    product: "",
    quantity: 0,
    price: 0,
    amount: 0,
  });
  const [products, setProducts] = useState([]);

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      const payload = order;
      payload.products = products;
      const result = await create(payload);
      if (result.msg === "success") {
        alert("Order created successfully");
        navigate("/admin/orders");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleAddingProducts = (e) => {
    e.preventDefault();
    if (!item || !item.product || !item?.quantity) return;
    const newProduct = [...products, item];
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        amount: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
    setItem({
      product: "",
      quantity: 0,
      price: 0,
      amount: 0,
    });
  };

  const removeProduct = (id) => {
    const newProduct = products.filter((product) => product.product !== id);
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        amount: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
  };

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit: 10000, page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Container>
      <Row>
        <h1 className="text-center">Add new Order</h1>
        <Col md={3} className="m-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Buyer Name"
                value={order?.name}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Buyer Email"
                value={order?.email}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={order?.address}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, address: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={order?.paymentMethod}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, paymentMethod: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="COD">COD</option>
                <option value="STRIPE">STRIPE</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" disabled value={order?.amount} />
            </Form.Group>
            <Stack gap={1} direction="horizontal">
              <Button
                variant="primary"
                type="submit"
                size="md"
                style={{ width: "8rem" }}
              >
                Add
              </Button>
              <Link to="/admin/orders" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
        <Col className="border rounded">
          <h5 className="text-center">Add Products</h5>
          <Row>
            <Col lg={4}>
              <Form onSubmit={handleAddingProducts}>
                <Form.Group className="mb-3">
                  <Form.Label>Product</Form.Label>
                  <Form.Select
                    value={item?.product}
                    onChange={(e) => {
                      setItem((prev) => {
                        return {
                          ...prev,
                          product: e.target.value,
                          price: allProducts.find(
                            (item) => item._id === e.target.value
                          ).price,
                        };
                      });
                    }}
                  >
                    <option>Open this select menu</option>
                    {allProducts.map((prod) => {
                      return (
                        <option key={prod?._id} value={prod?._id}>
                          {prod?.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={item?.quantity}
                    onChange={(e) => {
                      setItem((prev) => {
                        return {
                          ...prev,
                          quantity: Number(e.target.value),
                          amount: Number(e.target.value) * item?.price,
                        };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" disabled value={item?.price} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    placeholder="Enter Quantity"
                    value={item?.amount}
                  />
                </Form.Group>
                <Stack gap={1} direction="horizontal">
                  <Button type="submit">Add Product</Button>
                </Stack>
              </Form>
            </Col>
            <Col className="m-2">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, idx) => {
                      return (
                        <tr key={`${product?.product}${idx}`}>
                          <td>{idx + 1}</td>
                          <td style={{ width: "40%" }}>
                            {
                              allProducts.find(
                                (item) => item?._id === product?.product
                              ).name
                            }
                          </td>
                          <td>{product?.price}</td>
                          <td>{product?.quantity}</td>
                          <td>{product?.amount}</td>
                          <td className="text-center">
                            <BsTrash
                              color="red"
                              onClick={() => removeProduct(product?.product)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOrder;