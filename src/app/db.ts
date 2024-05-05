import { Pool } from "pg";
import PasswordHasher from "./hasher.ts";

class Database {
  private pool: Pool;
  private passwordHasher: PasswordHasher;

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
    this.passwordHasher = new PasswordHasher();
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
        "INSERT INTO tsloginUsers (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
        [email, first_name, last_name, password]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
  async verifyPassword(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        "SELECT password FROM tsloginUsers WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return false; // User not found
      }

      const hashedPassword = result.rows[0].password;
      return await this.passwordHasher.verify(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}

export default Database;