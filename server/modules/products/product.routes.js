const multer = require("multer");
const router = require("express").Router();
const Controller = require("./product.controller");
const secureAPI = require("../../utils/secure");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "." + file.originalname.split(".")[1];
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", secureAPI([]), async (req, res, next) => {
  try {
    const { limit, page, name } = req.query;
    const search = { name };
    const result = await Controller.list(limit, page, search);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  secureAPI(["admin"]),
  upload.array("images", 4),
  async (req, res, next) => {
    try {
      if (req.files) {
        req.body.images = [];
        req.files.map((file) =>
          req.body.images.push("products/".concat(file.filename))
        );
      }
      req.body.created_by = req.currentUser;
      const result = await Controller.create(req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:id", secureAPI([]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    if (req.files) {
      req.body.images = [];
      req.files.map((file) =>
        req.body.images.push("products/".concat(file.filename))
      );
    }
    req.body.updated_by = req.currentUser;
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await Controller.deleteById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;