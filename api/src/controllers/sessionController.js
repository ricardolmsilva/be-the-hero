const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;
    const ong = await connection("ongs").where("email", email).first();

    if (!ong) {
      return res.status(401).json({ error: "The credentials are incorrect" });
    }

    const match = await bcrypt.compare(password, ong.password);

    if (!match) {
      return res.status(401).json({ error: "The credentials are incorrect" });
    }

    const token = await generateToken(ong.id);

    return res.json({ name: ong.name, token });
  },
};
