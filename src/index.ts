import app from "./app";
import connection from "@persistence/connection";

async function main() {
  try {
    await connection.authenticate();

    console.log('Database connection successful');

    const PORT = app.get('PORT');
    const HOST = app.get('HOST');

    const server = app.listen(PORT, HOST, () => {
      console.log(`Express server listening at http://${HOST}:${PORT}`);
    });

    const closeConnection = async () => {
      try {
        await connection.close();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error closing database connection:', err);
      } finally {
        process.exit();
      }
    };

    process.on('SIGINT', closeConnection);
    process.on('SIGTERM', closeConnection);
    server.on('close', closeConnection);

  } catch (err) {
    console.error('Database connection error:', err);
  }
}

main();
