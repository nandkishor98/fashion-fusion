require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Controller = require("../modules/users/user.controller");

mongoose.connect(process.env.DB_URL);
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    console.log("Creating Admin user");
    const payload = {
      name: "Raktim Admin",
      email: "rakimsth@gmail.com",
      password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
      isEmailVerified: true,
      roles: ["admin"],
    };
    await Controller.create(payload);
    console.log("---------DONE----------");
    console.log("Creating Normal user");
    const userPayload = {
      name: "Raktim User",
      email: "raktim@rumsan.com",
      password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
      isEmailVerified: true,
    };
    await Controller.create(userPayload);
    console.log("Done");
  },
};
setup.initialize();