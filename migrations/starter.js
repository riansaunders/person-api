const { Client } = require("pg");

const client = new Client();

async function start() {
  try {
    await client.connect();
    client.query(
      `
    CREATE TABLE people (
      person_id serial PRIMARY KEY,
      date_of_birth DATE NOT NULL,
      full_name varchar( 30 ) NOT NULL,
      favorite_color varchar ( 10 ) NOT NULL
    )`,
      (res, err) => {

        client.end()
      }
    );
  } catch (error) {
    console.error(error);
  }
}

start();