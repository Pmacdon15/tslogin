
import { sql } from "@vercel/postgres";

export default class Database {
  async register(
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) {
    "use server";
    try {
      const { rows } = await sql`
        INSERT INTO tsloginUsers (email, first_name, last_name, password)
        VALUES (${email}, ${first_name}, ${last_name}, ${password})
        `;
      if (Array.isArray(rows) && rows.length === 0) {
        console.log("User registered");
        console.log(rows);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error registering user: ", error);
      return false;
    }
  }
  async getHashedPassword(email: string) {
    const { rows } = await sql`
      SELECT password FROM tsloginUsers WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return false; // User not found
    }
    return rows[0].password;
  }
}
