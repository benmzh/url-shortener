const express = require('express')
var app = express()
var bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/sqeez', function(req, res, next) {
  console.log(req.body.url);

  pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      client.query("INSERT INTO urls (_id, url, created_at) VALUES (2, req.body.url, '2018-03-01')");
    });

  res.send({ status: 'SUCCESS' });
})
