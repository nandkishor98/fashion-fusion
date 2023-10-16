require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const orderController = require("./modules/orders/order.controller");
const indexRouter = require("./routes");

mongoose.connect(DB_URL).then(console.log("Database Connected..."));

const app = express();

app.use(cors());
app.use(express.static("public"));

app.post(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
      switch (event.type) {
        case "checkout.session.async_payment_failed":
          const async_payment_failed = event.data.object;
          await orderController.updateBasedonPayment(async_payment_failed);
          break;
        case "checkout.session.async_payment_succeeded":
          const async_payment_succeeded = event.data.object;
          await orderController.updateBasedonPayment(async_payment_succeeded);
          break;
        case "checkout.session.completed":
          const session_completed = event.data.object;
          await orderController.updateBasedonPayment(session_completed);
          break;
        case "checkout.session.expired":
          const session_expired = event.data.object;
          await orderController.updateBasedonPayment(session_expired);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.send();
  }
);

app.use(express.json());
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});