const connection = require("../database/connection");
const generateUniqueID = require("../../utils/generateUniqueID");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select();
    return res.json(ongs);
  },

  async create(req, res) {
    const { name, email, phone, city, district } = req.body;

    const id = generateUniqueID();

    await connection("ongs").insert({ id, name, email, phone, city, district });
    res.json({ id });
  }
};
