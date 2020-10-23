const PostgresqlDb = require('../database/postgresql');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.db = new PostgresqlDb();
  }

  async getUser({email}) {
    const {rows} = await this.db.query('SELECT *FROM users where email = $1', [email]);
    return rows[0] || {};
  }

  async createUser({user}) {
    const {name, email, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.db.query(
      'INSERT INTO users(name, email, password) values($1, $2, $3)',
      [name, email, hashedPassword],
    );
    return result || {};
  }
}

module.exports = UserService;
