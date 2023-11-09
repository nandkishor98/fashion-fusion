import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form, Stack } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { SERVER_URL, URLS } from "../../../constants";

import { list } from "../../../services/category";

import useApi from "../../../hooks/useApi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useApi();
  const [categories, setCategories] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    quantity: "",
    price: "",
    alias: "",
    brand: "",
    category: "",
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllCategories = useCallback(async () => {
    const data = await list();
    if (!data) return null;
    const { data: cats } = data;
    setCategories(cats.data.data);
  }, []);

  const handleFiles = (event) => {
    if (event.target.files) {
      if (event.target.files.length > 4) alert("You can upload only 4 images");
      else {
        setFiles([...event.target.files]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("images", files);
      formData.append("name", payload?.name);
      formData.append("quantity", payload?.quantity);
      formData.append("price", payload?.price);
      formData.append("alias", payload?.alias);
      formData.append("brand", payload?.brand);
      formData.append("category", payload?.category);
      formData.append("id", id);
      const data = await updateById(URLS.PRODUCTS, id, formData);
      if (data.msg === "success") {
        setMsg(
          `${payload?.name} Product Added Successfully. Redirecting in 3 secs`
        );
        setTimeout(() => {
          navigate("/admin/products");
        }, 3000);
      }
    } catch (e) {
      const errMsg = e.response
        ? JSON.stringify(e.response)
        : "Something went wrong";
      setError(errMsg);
    } finally {
      setTimeout(() => {
        setError("");
        setMsg("");
        setLoading(false);
        setFiles([]);
        setPayload({
          name: "",
          quantity: "",
          price: "",
          alias: "",
          brand: "",
          category: "",
        });
      }, 2500);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    setPreviews([]);
    if (!files) {
      return;
    }
    files &&
      files.length > 0 &&
      files.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreviews((prev) => {
          return [...prev, objectUrl];
        });
      });
  }, [files]);

  useEffect(() => {
    const fetchD = async () => {
      const result = await getById(URLS.PRODUCTS, id);
      const {
        isArchived,
        created_at,
        updated_at,
        category_name,
        _id,
        ...rest
      } = result;
      setPayload((prev) => {
        return { ...prev, ...rest };
      });
      setPreviews(() => {
        return [...rest.images];
      });
    };
    fetchD();
  }, [id, getById]);
  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-center">Edit product</h1>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Product Images (Max upto 4)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFiles} />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          {files &&
            previews &&
            previews.map((preview, idx) => (
              <img
                key={idx}
                width="100"
                height="100"
                src={
                  preview.includes("blob:")
                    ? preview
                    : SERVER_URL + "/" + preview
                }
              />
            ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={payload?.name}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={payload?.price}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quantity"
            value={payload?.quantity}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, quantity: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={payload?.brand}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, brand: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            placeholder="Separated by comma"
            value={payload?.alias}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, alias: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={payload?.category}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, category: e.target.value };
              });
            }}
          >
            <option value="">Select One</option>
            {categories.length > 0
              ? categories.map((cat) => {
                  return (
                    <option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        </Form.Group>
        {(error || msg) && (
          <Alert variant={error ? "danger" : "success"}>
            {error ? error : msg}
          </Alert>
        )}
        <Stack gap={2} direction="horizontal">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ width: "10rem" }}
          >
            Submit
          </Button>
          <Button variant="danger" onClick={() => navigate("/admin/products")}>
            Go back
          </Button>
        </Stack>
      </Form>
    </div>
  );
}