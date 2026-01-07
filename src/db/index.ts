import { SQL } from "bun";

export const sql = new SQL({
  // Connection details (adapter is auto-detected as PostgreSQL)
  url: "postgres://root:Admin_1jj395qu@localhost:5432/mydb",

  // Alternative connection parameters
  //   hostname: "localhost",
  //   port: 5432,
  //   database: "myapp",
  //   username: "dbuser",
  //   password: "secretpass",

  // Connection pool settings
  max: 20, // Maximum connections in pool
  idleTimeout: 30, // Close idle connections after 30s
  maxLifetime: 30, // Connection lifetime in seconds (0 = forever)
  connectionTimeout: 30, // Timeout when establishing new connections

  // SSL/TLS options
  tls: false,
  // tls: {
  //   rejectUnauthorized: true,
  //   requestCert: true,
  //   ca: "path/to/ca.pem",
  //   key: "path/to/key.pem",
  //   cert: "path/to/cert.pem",
  //   checkServerIdentity(hostname, cert) {
  //     ...
  //   },
  // },

  // Callbacks
  onconnect: (client) => {
    console.log("Connected to PostgreSQL");
  },
  onclose: (client) => {
    console.log("PostgreSQL connection closed");
  },
});
