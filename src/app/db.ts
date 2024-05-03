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
  async register(email: string, first_name: string, last_name: string, password: string) {
    try {
      const result = await this.pool.query(
        "INSERT INTO tsloginUsers (email, first_name, last_name, password, admin) VALUES ($1, $2, $3, $4, false)",
        [email, first_name, last_name, password]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Database;