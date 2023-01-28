// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: Number,
    firstName: String,
    lastName: String,
    password: String
}

export type UserOrder = {
    order_id: Number,
    product_name: String,
    product_price: Number,
    quantity: Number
}

export class UserStore{
    async index(): Promise<User[]>{
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT Id, FirstName, LastName FROM Users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }

    async show(id: Number): Promise<User> {
        try {
            const sql = 'SELECT Id, FirstName, LastName FROM Users WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

      async showUserOrder(user_id: number): Promise<UserOrder[]> {
        try {
            const sql = `SELECT Orders.Id as order_id, Products.Name as product_name, 
                         Products.Price as product_price, Orders_Products.Quantity as quantity
                         FROM Orders INNER JOIN Orders_Products ON Orders.Id = Orders_Products.Order_Id
                         INNER JOIN Products on Products.Id = Orders_Products.Product_Id
                         WHERE Orders.User_Id=($1) AND IsActive = true`
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find orders for user ${user_id}. Error: ${err}`)
        }
      }
    
      async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO Users (FirstName, LastName, Password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env 
            const hash = bcrypt.hashSync(
                u.password + (BCRYPT_PASSWORD as string), 
                parseInt(SALT_ROUNDS as string)
              );
            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
            const user = result.rows[0]
            conn.release()
            return user
          } catch (err) {
              throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`)
          }
      }

      async authenticate(username: string, password: string): Promise<User | null> {
        try {
          const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env 
          // @ts-ignore
          const conn = await client.connect()
          const sql = 'SELECT Password FROM Users WHERE FirstName=($1)'
          const result = await conn.query(sql, [username])
          if(result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password+SALT_ROUNDS, user.password)) {
              return user
            }
          }
        } catch (err) {
          throw new Error(`Could not authonticate. Error: ${err}`)
        }
        return null
      }
}