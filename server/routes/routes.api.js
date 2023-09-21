const router = require("express").Router();
const userRouter = require("../modules/users/user.routes");

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "API Router is working" });
});

router.use("/users", userRouter);

router.all("*", (req, res, next) => {
  res.json({ data: "", msg: "Route not found..." });
});

module.exports = router;
