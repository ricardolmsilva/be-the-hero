const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongId = req.id;
    const incidents = await connection('incidents')
      .where('ong_id', ongId)
      .orderBy('id', 'desc');

    return res.json(incidents);
  },
};
