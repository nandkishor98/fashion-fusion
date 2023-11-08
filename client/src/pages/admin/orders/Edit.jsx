import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Stack,
  Table,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../../../hooks/useOrders";

const EditOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useOrders();
  const [order, setOrder] = useState(null);

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      const orderInfo = order;
      const { created_at, updated_at, _id, isArchived, ...payload } = orderInfo;
      await updateById(id, payload);
      navigate("/admin/orders");
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    setOrder(result);
  }, [id, getById]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Container>
      <Row>
        <h4 className="text-center">Order Number # {order?.id}</h4>
        <Col>
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
              <Form.Label>Buyer Email</Form.Label>
              <Form.Control
                type="text"
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
              <Form.Label>Buyers Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Buyer Address"
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
              <Form.Control
                type="text"
                placeholder="Enter Payment Method"
                value={order?.paymentMethod}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Status</Form.Label>
              <Form.Select
                value={order?.status}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, status: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amount"
                value={order?.amount}
                disabled
              />
            </Form.Group>
            <Stack gap={1} direction="horizontal">
              <Button
                variant="primary"
                type="submit"
                size="md"
                style={{ width: "8rem" }}
              >
                Update
              </Button>
              <Link to="/admin/orders" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
        <Col>
          <h5>Products</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (Rs)</th>
                <th>Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {order && order?.products && order?.products.length > 0 ? (
                order?.products.map((item, idx) => {
                  return (
                    <tr key={item?._id}>
                      <td>{idx + 1}</td>
                      <td>{item?.product}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td>{item?.amount}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>No products</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrders;