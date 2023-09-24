const bcrypt = require("bcrypt");

const authModel = require("../auth/auth.model");
const userModel = require("../users/user.model");

const { generateOTP, verifyOTP } = require("../../utils/otp");
const { generateJWT } = require("../../utils/jwt");
const { mailer } = require("../../services/mailer");

const login = async (email, password) => {
  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error("User doesn't exist");
  if (!user?.isActive)
    throw new Error("User is not active. Please contact Admin.");
  if (!user.isEmailVerified)
    throw new Error("Email not verified. Verify email to get started...");
  const isValidPw = await bcrypt.compare(password, user?.password);
  if (!isValidPw) throw new Error("Username or Password invalid");
  // return JWT Token
  const payload = {
    id: user?._id,
    email: user?.email,
    roles: user?.role,
  };
  const token = generateJWT(payload);
  return { token };
};

const regenerateToken = async (email) => {
  // email exists check
  const auth = await authModel.findOne({ email });
  if (!auth) throw new Error("User not found");
  const newToken = await generateOTP();
  await authModel.findOneAndUpdate(
    { email },
    { token: newToken },
    { new: true }
  );
  await mailer(email, newToken);
  return true;
};

const register = async (payload) => {
  let { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  const user = await userModel.create(rest);
  const token = generateOTP();
  await authModel.create({ email: user?.email, token });
  // send token to user email for verification
  await mailer(user?.email, token);
  return user;
};

const verifyEmail = async (email, token) => {
  // email exists check
  const auth = await authModel.findOne({ email });
  if (!auth) throw new Error("User not found");
  // token expire check
  const isValidToken = await verifyOTP(token);
  if (!isValidToken) throw new Error("Token expired");
  // check token match with email
  const emailValid = auth?.token === +token;
  if (!emailValid) throw new Error("Token mismatch");
  // userModel isEmailVerified True
  await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );
  return true;
};

module.exports = { login, regenerateToken, register, verifyEmail };