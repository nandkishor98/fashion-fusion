import { Image } from "react-bootstrap";
import numberFormatter from "number-formatter";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

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
  removeFromCart,
  increase,
  decrease,
  getTotal,
}) => {
  return (
    <>
      <>
        <h1 className="text-center m-5">Your Cart</h1>
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
                    <tr key={item?.id || index}>
                      <td>{item?.name}</td>
                      <td>
                        <Image
                          width={40}
                          height={40}
                          src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"
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
                            decrease(item?.id);
                          }}
                        >
                          -
                        </span>
                        <span className="btn btn-info">{item?.quantity}</span>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => {
                            increase(item?.id);
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
                            removeFromCart(item?.id);
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
              </tbody>
            </table>
          </div>
        </div>
      </>
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