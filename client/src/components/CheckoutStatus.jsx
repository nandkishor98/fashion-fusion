import "./CheckoutStatus.css";

export const CheckoutPageStatus = ({
  type = "success",
  msgHeader = "Success",
  msg,
}) => {
  return (
    <div className="divBody">
      <div className="card">
        <div className="successDiv">
          <i style={{ color: type === "success" ? "#88b04b" : "#ff0000" }}>
            {type === "success" ? <span>&#10003;</span> : <span>&#8855;</span>}
          </i>
        </div>
        <h1 style={{ color: type === "success" ? "#88b04b" : "#ff0000" }}>
          {msgHeader}
        </h1>
        <p>
          {msg ??
            "We received your purchase request. We will be in touch shortly!"}
        </p>
      </div>
    </div>
  );
};