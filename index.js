const express = require('express')
const app = express()

let bodyParser = require("body-parser")

const port = 3000;
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));
app.use(function middleware(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip)
    next();
  })

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/api/:date', (req,res) => {
    let data = req.params.date
    function check(data) {
        let date = new Date(data)
        let dateNumber = new Date(Number(data))
        if (date.getTime() === date.getTime()) {
            //console.log("date from string")
            return {
                unix: date.getTime(),
                utc: date.toGMTString()
            }
        } else if (date.getTime() !== date.getTime() & dateNumber.getTime() === dateNumber.getTime()) {
            //console.log("date from number")
            return {
                unix: new Date(dateNumber).getTime(),
                utc: dateNumber.toGMTString()
            }
        } else return false
    }
    let validDate = check(data)
    if (validDate === false) {
        res.json({ error : "Invalid Date" })
    } else if (validDate !== false) {
        res.json( validDate )
    }
})
app.get('/api/', (req,res) => {
    console.log("1")
    const unixTime = Date.now();
    let dateTime = new Date(unixTime)
    let date = dateTime.toGMTString()
    res.json( { unix: unixTime, utc: date } )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

