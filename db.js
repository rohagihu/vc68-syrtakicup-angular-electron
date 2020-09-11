const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const cors = require('cors')
const router = express.Router();
const app = express()
const bodyParser = require("body-parser");
const port = 3000

//  Eventuell umstellen auf LowDB
//  https://github.com/typicode/lowdb

module.exports = function() {

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // app.use(cors(
  //  {
  //    // "origin": "*",
  //    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
  //    "preflightContinue": false,
  //    "optionsSuccessStatus": 204,
  //    "credentials": true,
  //    "origin": true
  //  }
  //  ));
   app.options('*', cors())

  // let db = new sqlite3.Database('./src/assets/data/data.db', (err) => {
  let db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the data.db SQlite database.');
  });

  db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);')
  db.run('CREATE TABLE IF NOT EXISTS `preliminary-schedule` (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, timestamp INTEGER DEFAULT CURRENT_TIMESTAMP);')
  db.run('CREATE TABLE IF NOT EXISTS `saved-games` (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, timestamp INTEGER DEFAULT CURRENT_TIMESTAMP, `is-final` INTERGER DEFAULT 0);')

  app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ user: 'tobi' })
  })


  router.get('/getAllSavedPreliminarySchedules', cors(), (req, res) => {
    // db.all('SELECT id, date(strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
    db.all('SELECT id, strftime(\'%d.%m.%Y %H:%M:%S\',strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
      res.json(rows)
      console.log('1', rows)
    });
  })


  router.get('/getPreliminarySchedule', cors(), (req, res) => {
    // db.all('SELECT id, date(strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
    let stmt = db.prepare('SELECT `data` FROM `preliminary-schedule` WHERE `id` = ?')
    stmt.get(req.query.id, (err, row) => {
      // console.log(row)
      res.json(row)
    })
    // db.all('SELECT `data` FROM `preliminary-schedule` WHERE `id` = \'1\';', (err, rows) => {
    //   res.json(rows)
    //   console.log('1', rows)
    // });
  })

  router.get('/deletePreliminarySchedule', cors(), (req, res) => {
    // db.all('SELECT id, date(strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
    let stmt = db.prepare('DELETE FROM `preliminary-schedule` WHERE `id` = ?')
    stmt.get(req.query.id, (err, row) => {
      res.json({"success": "true"});
    })
  })

  router.post('/savepreliminaryschedule', cors(), (req, res) => {
    db.serialize(function() {
    // console.log(req.body.data)
    let stmt = db.prepare("INSERT INTO `preliminary-schedule` (`data`) VALUES(?);")
    stmt.run(req.body.data);
    stmt.finalize();
    res.json({"success": "true"});
    })
    // db.run('INSERT INTO `preliminary-schedule` (data) VALUES(json('+req.body.data+'));');
    // db.run('INSERT INTO `preliminary-schedule` (data) VALUES("'+req.body.data+'");');
  })


  router.post('/creategame', cors(), (req, res) => {
    // db.serialize(function() {
    // console.log(req.body.data)
    console.log('Route: creategame')
    // console.log(req.body)
    let stmt = db.prepare("INSERT INTO `saved-games` (`data`) VALUES(?);")
    stmt.run(JSON.stringify(req.body), function(err) {
      console.log(this.lastID)
      if (err) {
        return console.log(err.message);
      }
      res.json({"success": true, "id": this.lastID});
    });
    stmt.finalize();
  })


  router.patch('/updategame', cors(), (req, res) => {
    // db.serialize(function() {
    // console.log(req.body.data)
    // console.log(req.body)
    console.log('Route: updategame')
    let stmt = db.prepare("UPDATE `saved-games` SET `data` = ? WHERE ID = ?;")
    stmt.run(JSON.stringify(req.body.data), req.body.id, function(err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({"success": true});
      console.log(req.body.id)
    });
    stmt.finalize();
  })

  router.get('/getgame', cors(), (req, res) => {
    console.log('Route: getgame')
    // db.all('SELECT id, date(strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
    let stmt = db.prepare('SELECT * FROM `saved-games` WHERE `is-final` = 0;')
    stmt.all((err, data) => {
      let resData = data.map(el => {
        return {
          ...el,
          data: JSON.parse(el.data)
        }
      });
      res.json({"success": "true", "data": resData});
    })
  })

  router.delete('/deletegame', cors(), (req, res) => {
    console.log('Route: deletegame')
    // db.all('SELECT id, date(strftime(\'%s\', timestamp), \'unixepoch\', \'localtime\') as timestamp FROM `preliminary-schedule`;', (err, rows) => {
    let stmt = db.prepare('DELETE FROM `saved-games` WHERE `id` = ?;')
    stmt.run(req.query.id, (err) => {
      res.json({"success": "true"});
    })
  })


/**
 * test insert
 */
  router.post('/insert', cors(), (req, res) => {
    db.run('INSERT INTO test (name) VALUES(json('+req.body.title+'));');
    res.json({"success": "true"});
  })
/**
 * test select
 */
  // router.get('/select', cors(), (req, res) => {
  //   // res.send('Hello World!')
  //   db.all('SELECT * FROM test;', (err, rows) => {
  //     // res.header("Access-Control-Allow-Origin", "*");
  //     res.json(rows)
  //     console.log('1', rows)
  //   });
  //   // res.send('Done SELECT')
  // })

  app.listen(port, () => {
    console.log(`Database App listen on http://localhost:${port}`)
  })

  app.use("/", router);

}



// db.run('CREATE TABLE IF NOT EXISTS some_table (id INTEGER PRIMARY KEY AUTOINCREMENT, ...);')

// process.on('exit', function() {
//   console.log('Ende gelände')
// });

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
