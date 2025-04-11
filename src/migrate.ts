import connection from "@persistence/connection";

async function migrate() {
  await connection.authenticate();

  await connection.sync({ force: true });
}

migrate();