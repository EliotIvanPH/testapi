/ Dependencies /
You should install these dependencies

@rodrigogs/mysql-events
mysql
firebase-admin --save

/ To Use Cloud Firestone use this example, Realtime Database use REST to requests/

-- this is a function to push data --
const db = require('./firebaseController');
const firebase = db.db;
 async function pushData (){
  const doc = firebase.collection('cambios');
  let res = await doc.add({data: 'test'});
  console.log('Entered new data into the document');
}
pushData();  
