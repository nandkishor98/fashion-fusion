const router = require("express").Router();

const authRouter = require("../modules/auth/auth.routes");
const categoryRouter = require("../modules/categories/category.routes");
const orderRouter = require("../modules/orders/order.routes");
const productRouter = require("../modules/products/product.routes");
const userRouter = require("../modules/users/user.routes");

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "API Router is working" });
});

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

router.all("*", (req, res, next) => {
  res.json({ data: "", msg: "Route not found..." });
});

module.exports = router;