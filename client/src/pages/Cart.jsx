import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import numberFormatter from "number-formatter";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../constants";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);

  const getTotal = () => {
    return cart.reduce((acc, obj) => {
      return acc + obj.quantity * obj.price;
    }, 0);
  };

  const removeFromCart = (id) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };

  const increase = (id) => {
    if (id) {
      dispatch(increaseQuantity(id));
    }
  };

  const decrease = (id) => {
    if (id) {
      dispatch(decreaseQuantity(id));
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        <FilledCart
          products={products}
          items={cart}
          removeFromCart={removeFromCart}
          increase={increase}
          decrease={decrease}
          getTotal={getTotal}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const FilledCart = ({
  items,
  products,
  removeFromCart,
  increase,
  decrease,
  getTotal,
}) => {
  return (
    <>
      <h1 className="text-center m-4">Your Cart</h1>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price (NPR)</th>
                <th>Quantity</th>
                <th>Total Price (NPR)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={item?._id || index}>
                    <td>
                      {item?.name.length > 25
                        ? item?.name.substring(0, 60).concat("...")
                        : item?.name}
                    </td>
                    <td>
                      <Image
                        width={40}
                        height={40}
                        src={
                          item?.images[0] && item?.images[0].includes("https:")
                            ? item?.images[0]
                            : SERVER_URL + "/" + item?.images[0] ||
                              "https://www.bootdey.com/image/380x380/FF00FF/000000"
                        }
                        thumbnail
                      />
                    </td>
                    <td>
                      {numberFormatter("#,##,###.##", Number(item?.price))}
                    </td>
                    <td>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => {
                          decrease(item?._id);
                        }}
                      >
                        -
                      </span>
                      <span className="btn btn-info">{item?.quantity}</span>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => {
                          increase({ id: item?._id, products });
                        }}
                      >
                        +
                      </span>
                    </td>
                    <td>
                      {numberFormatter(
                        "#,##,###.##",
                        Number(item?.price) * Number(item?.quantity)
                      )}
                    </td>

                    <td>
                      <AiFillCloseCircle
                        color="red"
                        size={24}
                        onClick={() => {
                          removeFromCart(item?._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="5">Total Carts</td>
                <td>
                  {numberFormatter("NPR #,##,###.##", Number(getTotal()))}
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <Link to="/products">Continue Shopping</Link>
                </td>
                <td>
                  <Link to="/checkout">Check Out Now</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const EmptyCart = () => {
  return (
    <>
      <div className="p-5 bg-body-tertiary rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your cart is empty</h1>
          <a className="btn btn-light btn-lg" href="/products">
            <BsArrowLeftSquare />
            &nbsp;Continue Shopping
          </a>
        </div>
      </div>
    </>
  );
};

export default Cart;