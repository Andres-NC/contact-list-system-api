const PostgresqlDb = require('../database/postgresql');

class ContactsService {
  constructor() {
    this.db = new PostgresqlDb();
  }

  async getContact({id}) {
    const {rows} = await this.db.query('SELECT *FROM contacts where id = $1', [id]);
    return rows[0] || {};
  }

  async getContacts({user_id, page, searchKey}) {
    const resultCount = await this.db.query(
      'Select count(*) as TotalCount from contacts where user_id = $1',
      [user_id],
    );
    const totalCount = resultCount.rows[0].totalcount;
    let startNum;
    let limitNum;
    if (page === '1' || page === '0' || !page) {
      startNum = 0;
      limitNum = 10;
    } else {
      startNum = (parseInt(page) - 1) * 10;
      limitNum = parseInt(page) * 10;
    }
    const {
      rows,
    } = await this.db.query(
      'SELECT *FROM contacts where user_id = $1 ORDER BY id asc limit $2 offset $3 ',
      [user_id, limitNum, startNum],
    );
    return {contacts: rows, totalCount} || [];
  }

  async createContact({firstName, lastName, email, contactNumber, user_id}) {
    const result = await this.db.query(
      'INSERT INTO contacts(firstname, lastname, email, contactnumber, user_id) values($1, $2, $3, $4, $5)',
      [firstName, lastName, email, contactNumber, user_id],
    );
    return result || [];
  }

  async updateContact({firstName, lastName, email, contactNumber}, id) {
    let contact = await this.getContact({id});
    let result = null;

    const newContact = {
      firstName: firstName ? firstName : contact.firstname,
      lastName: lastName ? lastName : contact.lastname,
      email: email ? email : contact.email,
      contactNumber: contactNumber ? contactNumber : contact.contactnumber,
    };

    if (contact) {
      result = await this.db.query(
        'UPDATE contacts SET firstName = $1, lastName = $2, email = $3, contactnumber = $4 where id = $5 ',
        [newContact.firstName, newContact.lastName, newContact.email, newContact.contactNumber, id],
      );
    }

    return result || {};
  }

  async deleteContact({id}) {
    const result = await this.db.query('DELETE FROM contacts where id = $1', [id]);
    return result || {};
  }
}

module.exports = ContactsService;
