const express = require('express')
const app = express()
require("dotenv").config()
let bodyParser = require("body-parser")

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));
app.use(function middleware(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip)
    next();
  })

app.get('/', (req, res) => {
    //console.log(req).length

    res.sendFile(__dirname + "/view/index.html");
})

app.get('/api/:date', (req,res) => {
    let data = req.params.date
    console.log(data)
    console.log(data.length)
    console.log(typeof(data))
    function check(data) {
        console.log("ama")
        let date = new Date(data)
        let dateNumber = new Date(Number(data))
        if (date.getTime() === date.getTime()) {
            console.log("date from string")
            return {
                unix: date.getTime(),
                utc: date.toGMTString()
            }
        } else if (date.getTime() !== date.getTime() & dateNumber.getTime() === dateNumber.getTime()) {
            console.log("date from number")
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
    res.json( { error : "Invalid Date" } )
})
app.get('/api', (req,res) => {
    console.log("2")
    res.json( { error : "Invalid Date" } )
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

