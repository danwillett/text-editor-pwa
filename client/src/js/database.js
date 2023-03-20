import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("post to database");
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite"); // can add new data 
    const store = tx.objectStore("jate");

    console.log(content)
    const request = store.put({ jate: content });
    const result = await request; // we make this asynchronous so the user still has full functionality while things are getting posted to the DB
    console.log("🚀 - data saved to the database", result);
    return result
  } catch {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("get data")
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readonly"); // only read data, not write

    const store = tx.objectStore("jate");
    const request = store.getAll()
     // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
  return result;
  } catch {
    console.error("getDb not implemented");
  }
};

initdb();
