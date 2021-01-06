const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      `INSERT INTO users (email)
      VALUES ($1)
      RETURNING *`,
      [user.email]
    );

    return new User(rows[0]);
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
      email: this.email
    };
  }
};
