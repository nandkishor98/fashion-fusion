const bcrypt = require("bcrypt");

const authModel = require("../auth/auth.model");
const userModel = require("../users/user.model");

const { generateOTP, verifyOTP } = require("../../utils/otp");

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
  return true;
};

const register = async (payload) => {
  let { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  const user = await userModel.create(rest);
  const authPayload = { email: user?.email, token: generateOTP() };
  await authModel.create(authPayload);
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
  const updateUser = await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );
  return updateUser;
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
  return true;
};

module.exports = { login, regenerateToken, register, verifyEmail };