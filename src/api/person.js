const express = require("express");
const Joi = require("@hapi/joi");

const { Client } = require("pg");

const router = express.Router();
const client = new Client();
client.connect();

const schema = Joi.object({
  date_of_birth: Joi.date(),
  full_name: Joi.string().max(30).required(),
  favorite_color: Joi.string().max(10).required(),
});

router.get("/", async (req, res) => {
  const data = await client.query("Select * from people");

  console.log(data.rows);
  res.json(data.rows);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await client.query("Select * from people WHERE person_id=($1)", [
    id,
  ]);
  if (data.rowCount < 1) return next();
  res.json(data.rows[0]);
});

router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const data = await client.query(
      "INSERT INTO people(date_of_birth, full_name, favorite_color) VALUES ($1, $2, $3) RETURNING *",
      [value.date_of_birth, value.full_name, value.favorite_color]
    );
    res.json(data.rows);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await schema.validateAsync(req.body);

    const data = await client.query(
      `
  UPDATE people
  SET full_name=$2,
      favorite_color=$3
  WHERE person_id=$1
  RETURNING *`,
      [id, value.full_name, value.favorite_color]
    );
    if (data.rowCount < 1) return next();

    return res.json(data.rows);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const data = await client.query(
    `
  DELETE from people
  WHERE person_id=$1
  RETURNING *`,
    [id]
  );
  if (data.rowCount < 1) return next();

  res.json(data.rows);
});

module.exports = router;
