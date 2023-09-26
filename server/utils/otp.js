const { totp } = require("otplib");

const generateOTP = () => {
  totp.options = { digits: 6, step: +process.env.OTP_DURATION };
  return totp.generate(process.env.OTP_SECRET);
};

const verifyOTP = async (token) => {
  totp.options = { digits: 6, step: +process.env.OTP_DURATION };
  return totp.check(token, process.env.OTP_SECRET);
};

module.exports = { generateOTP, verifyOTP };