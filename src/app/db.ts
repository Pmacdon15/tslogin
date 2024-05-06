
import PasswordHasher from "./hasher.ts";
import { sql } from "@vercel/postgres";

class Database {
  private passwordHasher: PasswordHasher;
  
  constructor() {
    this.passwordHasher = new PasswordHasher();
  }
  async query(query: string, values: any[]) {
    try {
      const result = await sql`${query}`; // Wrap the query string in a template literal
      return result.rows;
    } catch (error: any) {
      throw new Error(`Database query error: ${error.message}`);
    }
  }
  async register(
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) {
    try {
      const { rows } = await sql`
        INSERT INTO tsloginUsers (email, first_name, last_name, password) 
        VALUES (${email}, ${first_name}, ${last_name}, ${password})
      `;
      console.log("User registered: ", rows);
      return true;
    } catch (error) {
      console.error("Error registering user: ", error);
      return false;
    }
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    try {
      const { rows } = await sql`
        SELECT password FROM tsloginUsers WHERE email = ${email}
      `;

      if (rows.length === 0) {
        return false; // User not found
      }

      const hashedPassword = rows[0].password;
      return await this.passwordHasher.verify(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}

export default Database;
