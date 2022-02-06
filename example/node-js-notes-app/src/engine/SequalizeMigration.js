const { exec } = require("child_process");

export default async function SequalizeMigration() {
  return await new Promise((resolve, reject) => {
    const migrate = exec(
      "sequelize-cli db:migrate",
      { env: process.env },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );

    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
}
