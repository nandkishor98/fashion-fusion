require("dotenv").config();
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Controller = require("../modules/users/user.controller");
const categoryController = require("../modules/categories/category.controller");
const productController = require("../modules/products/product.controller");

mongoose.connect(process.env.DB_URL);
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    console.log("Creating Admin user");
    const payload = {
      name: "Nand Admin",
      email: "nandyadav720@gmail.com",
      password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
      isEmailVerified: true,
      roles: ["admin"],
    };
    await Controller.create(payload);
    console.log("Creating Normal user");
    const userPayload = {
      name: "Nand User",
      email: "nandyadav720@gmail.com.com",
      password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
      isEmailVerified: true,
    };
    await Controller.create(userPayload);
    console.log("---------DONE----------");
    console.log("Creating categories");
    const cat1 = await categoryController.create({ name: "Tshirt" });
    const cat2 = await categoryController.create({ name: "Jeans" });
    console.log("Done");
    console.log("-----Creating Products-----");
    const productCount = 100;
    for (let i = 0; i < productCount; i++) {
      await productController.create({
        name: faker.commerce.productName(),
        alias: [],
        description: faker.commerce.productDescription(),
        quantity: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
        price: faker.commerce.price({ min: 100, max: 2000, dec: 0 }),
        category:
          faker.number.binary({ min: 0, max: 1 }) === 0 ? cat1?._id : cat2?._id,
        images: [
          faker.image.urlLoremFlickr(),
          faker.image.urlLoremFlickr(),
          faker.image.urlLoremFlickr(),
        ],
      });
    }

    console.log("-----Creating Products Completed-----");
  },
};
setup.initialize();