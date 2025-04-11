import connection from "@persistence/connection";
import "@persistence/relations"

async function migrate() {
  await connection.authenticate();

  await connection.sync({ force: true });
}

migrate();