const { database } = require('firebase-admin');
const admin = require('firebase-admin');

const serviceAccount = require('./key/dbtest-6eb3c-d116b4f179c0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dbtest-6eb3c-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

exports.db = db;