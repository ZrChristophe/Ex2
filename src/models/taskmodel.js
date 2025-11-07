  const pool = require('../config/db.js');
  const { v4: uuidv4 } = require('uuid');

  class TaskModelPg {
    async getAll() {
      const result = await pool.query('SELECT * FROM tasks');
      return result.rows;
    }

    async getById(id) {
      const result = await pool.query('SELECT * FROM tasks WHERE id=$1', [id]);
      return result.rows[0] || null;
    }

    async create({ title, description }) {
      const id = uuidv4();
      await pool.query(
        'INSERT INTO tasks (id, title, description) VALUES ($1, $2, $3)',
        [id, title, description]
      );
      return this.getById(id);
    }

    async update(id, fields) {
      const { title, description, completed } = fields;
      await pool.query(
        `UPDATE tasks SET 
          title = COALESCE($2, title), 
          description = COALESCE($3, description), 
          completed = COALESCE($4, completed)
        WHERE id=$1`,
        [id, title, description, completed]
      );
      return this.getById(id);
    }

    async delete(id) {
      const result = await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
      return result.rowCount > 0;
    }
  }

  module.exports = new TaskModelPg();
