const connection = require('../database/connection');
const generateToken = require('../../utils/generateToken');
const hashPassword = require('../../utils/hashPassword');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select(
      'name',
      'email',
      'phone',
      'city',
    );

    return res.sendStatus(200).json(ongs);
  },

  async create(req, res) {
    const {
      name, email, password, phone, city,
    } = req.body;

    const emailExist = await connection('ongs').where('email', email).first();

    if (emailExist !== undefined) {
      return res.status(401).json({ error: 'Email already exist' });
    }

    const hashedPassword = await hashPassword(password);

    const [id] = await connection('ongs').insert({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
    });

    const token = await generateToken(id);

    return res.status(200).json({ name, token });
  },
};
