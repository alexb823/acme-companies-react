


const port = process.env.PORT || 3000;
const ip = process.env.IP || "0.0.0.0";

server.listen(port, ip, () => {
  console.log(`Server listening at ${port}`);
});

// For cloud9 db
const db = new Sequelize('acme_companies_db', 'ubuntu', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
