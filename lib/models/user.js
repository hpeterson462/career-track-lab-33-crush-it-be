const pool = require('../utils/pool');

module.exports = class User {
  id;
  userId;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.userId = row.id;
    this.email = row.email;
    this.passwordHash = row.passwordHash;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    return {
      userId: this.userId,
      email: this.email
    };
  }
};
