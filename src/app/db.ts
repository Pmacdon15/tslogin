import { Pool } from "pg";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || "5432"), // default to 5432 if not provided
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  async query(query: string, values: any[]) {
    try {
      const result = await this.pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Database;