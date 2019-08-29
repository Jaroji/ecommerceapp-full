import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  public getDB(){
    return this.sqlite.create({
      name: 'product.db',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDB().then((db: SQLiteObject) => {
      this.createTables(db);
    }).catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS favorite (id INTEGER PRIMARY KEY NOT NULL, name TEXT, price REAL, duedate DATE, active INTEGER, category_name TEXT)']
    ])
    .then(() => console.log("Table created!"))
    .catch(e => console.error('Error create table', e));
  }
}
