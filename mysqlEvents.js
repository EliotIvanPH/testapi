
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const program = async () => {
/* Mysql Connection */
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'watcher',
    password: 'watcher',
    database: "test"
    //debug: true
  });

/* Instantiate and create a database connection using a preexisting connection */
  const instance = new MySQLEvents(connection, {
    serverId: 1,
    startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
  });

/* start function ensures that MySQL is connected and ZongJi is running before resolving its promise */
  await instance.start();

/* Adds a trigger for the given expression/statement and calls the onEvent function when the event happens */
  instance.addTrigger({
    name: 'monitoring changes for send to firebase',
    expression: 'test.*', // listen to world database !!!
    statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    // Here you will get the events for the given expression/statement.
    // This could be an async function.
    onEvent: async e => {
      let data = {
        array: []
      };
      console.log(e);
      console.log(e.affectedRows);
      console.log(e.affectedColumns);
      await connection.query("SELECT * FROM tipo", function (err, result) {
        if (err) throw err;
        console.log(result);
        result.forEach(element => {
          console.log(Object.entries(element));
        });
      });
      console.log(data);
      console.log('Waiting for more changes');
    }
  });

  /* MySQLEvents class emits some events related to its MySQL connection and ZongJi instance */
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

/* Start the program */
program()
  .then(console.log('start'))
  .catch(console.error);