import Dexie from 'dexie';

const db = new Dexie("todoitDB");

// Declare tables, IDs and indexes
db.version(1).stores({
  todos: "++id, name, date, completed",
});

export default db