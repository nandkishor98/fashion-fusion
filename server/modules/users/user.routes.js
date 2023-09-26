const router = require("express").Router();
const Controller = require("./user.controller");
const secureAPI = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await Controller.list();
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.currentUser);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    if (req.currentRoles.includes("admin")) {
      const { id, ...rest } = req.body;
      rest.created_by = req.currentUser;
      rest.updated_by = req.currentUser;
      const result = await Controller.updateById(id, rest);
      res.json({ data: result, msg: "success" });
    } else {
      const result = await Controller.updateById(req.currentUser, req.body);
      res.json({ data: result, msg: "success" });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/change-password", secureAPI(["user"]), async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) throw new Error("Passwords are missing");
    const result = await Controller.changePassword(
      req.currentUser,
      oldPassword,
      newPassword
    );
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/reset-password", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    rest.created_by = req.currentUser;
    rest.updated_by = req.currentUser;
    const result = await Controller.resetPassword(id, rest);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.patch("/status/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.created_by = req.currentUser;
    req.body.updated_by = req.currentUser;
    const result = await Controller.block(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.created_by = req.currentUser;
    req.body.updated_by = req.currentUser;
    const result = await Controller.archive(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;