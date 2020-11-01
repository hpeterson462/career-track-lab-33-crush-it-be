const pool = require('../utils/pool');

module.exports = class Route {
  id;
  userId;
  location;
  name;
  rating;
  notes;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.location = row.location;
    this.name = row.name;
    this.rating = row.rating;
    this.notes = row.notes;
  }

  static async insert(route) {
    const { rows } = await pool.query(
      `INSERT into routes (user_id, location, name, rating, notes) VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [route.userId, route.location, route.name, route.rating, route.notes]
    );

    return new Route(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      `SELECT * FROM routes`,
      []
    );

    return rows.map(row => new Route(row));
  }

  static async findRouteById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM routes WHERE id = $1`,
      [id]
    );

    if (!rows[0]) return null;
    else return new Route(rows[0]);
  }

  static async updateRouteById(id, updatedRoute) {
    const { rows } = await pool.query(
      `UPDATE routes 
        SET location = $1,
          name = $2,
          rating = $3,
          notes = $4
      WHERE id = $5
      RETURNING *`,
      [updatedRoute.location, updatedRoute.name, updatedRoute.rating, updatedRoute.notes, id]
    );

    return new Route(rows[0]);
  }

  static async deleteRouteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM routes WHERE id = $1 RETURNING *`,
      [id]
    );

    return new Route(rows[0]);
  }
};
