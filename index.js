const express = require('express')
const app = express()

let bodyParser = require("body-parser")

const port = 3000;
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204


app.use("/public", express.static(__dirname + "/public"));
app.use(function middleware(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip)
    next();
  })

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

// your first API endpoint... 
app.get("/api/:date", function(req, res) {
  let date = new Date(req.params.date)
  if (isInvalidDate(date)) {
    date = new Date(+req.params.date)
  }
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" })
    return
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

