import { Image } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const removeFromCart = (id) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };
  const { cart } = useSelector((state) => state.cart);
  return (
    <>
      {cart.length > 0 ? (
        <FilledCart items={cart} removeFromCart={removeFromCart} />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const FilledCart = ({ items, removeFromCart }) => {
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
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
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
                      <td>{item?.price}</td>
                      <td>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                        >
                          -
                        </span>
                        <span className="btn btn-info">{item?.quantity}</span>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                        >
                          +
                        </span>
                      </td>
                      <td>{Number(item?.price) * Number(item?.quantity)}</td>
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
                  <td>Total Amount</td>
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