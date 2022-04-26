import client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { TOKEN_SECRET: tokenSecret } = process.env;

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export class UserStore {
  //Login
  async login(userName: string, password: string): Promise<string | null> {
    if (!tokenSecret) {
      throw new Error("missing env. variable");
    } else {
      const conn = await client.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE firstname=$1",
        [userName]
      );
      if (result.rowCount > 0) {
        const userObj = result.rows[0];
        const isMatched = bcrypt.compareSync(
          password + pepper,
          userObj.password
        );
        if (isMatched) {
          const token = jwt.sign({ user: userObj }, tokenSecret);
          return token;
        }
      }
      return null;
    }
  }
  //Get All Users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users . Error: ${error}`);
    }
  }
  async get(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const result = await conn.query("SELECT * FROM users WHERE id=$1", [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find user with id : ${id} . Error: ${error}`);
    }
  }
  async add(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(user.password + pepper, Number(saltRounds));
      const result = await conn.query(
        "INSERT INTO Users (firstname,lastname,password) VALUES ($1,$2,$3) RETURNING *",
        [user.firstname, user.lastname, hash]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert user. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const result = await conn.query("DELETE FROM users WHERE id=$1", [id]);
      conn.release();
      return;
    } catch (error) {
      throw new Error(`Cannot delete this user. Error: ${error}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "UPDATE users SET firstname=COALESCE($1,firstname), lastname=COALESCE($2,lastname),password=COALESCE($3,password) WHERE id=$4 RETURNING *",
        [user.firstname, user.lastname, user.password, user.id]
      );

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update this user. Error: ${error}`);
    }
  }
}
