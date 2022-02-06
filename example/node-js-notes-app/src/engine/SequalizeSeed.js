const { exec } = require("child_process");

export default async function SequalizeSeed() {
  return await new Promise((resolve, reject) => {
    const migrate = exec(
      "sequelize-cli db:seed:all",
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
