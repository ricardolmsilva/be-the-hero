const connection = require("../database/connection");

module.exports = {

  async index(req, res) {
    try {

      const { page = 1 } = req.query;
      const id = req.headers.id == undefined ? "" : req.headers.id

      const [count] = await connection("incidents").count("id");

      const incidents = await connection("incidents")
        .join("ongs", "ongs.id", "=", "incidents.ong_id")
        .where('incidents.id', '<=', id)
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          "incidents.*",
          "ongs.name",
          "ongs.email",
          "ongs.phone",
          "ongs.city",
        ])
        .orderBy("incidents.id", "desc")

      res.header("X-Total-Count", count["count(`id`)"]);

      return res.json(incidents);
    } catch (err) {
      return res.json(err)
    }
  },

  async create(req, res) {
    const ong_id = req.id;
    const { title, description, value } = req.body;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });
    res.json({ id });
  },

  async delete(req, res) {
    const ong_id = req.id;
    const { id } = req.params;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    if (incident.ong_id != ong_id) {
      return res.status(401).json({ error: "Operation not permited" });
    }

    await connection("incidents").where("id", id).delete();
    res.status(204).send();
  },
};
