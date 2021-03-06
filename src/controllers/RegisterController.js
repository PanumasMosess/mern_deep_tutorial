const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async store(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const exitendsUser = await User.findOne({ email });

      if (!exitendsUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        return res.json(user);
      }

      return res.status(400).json({
        messsage: "email/user already exit! do you want to login instead?",
      });
    } catch (error) {
      throw Error(`Error while registering a  new user : ${error}`);
    }
  },
};
