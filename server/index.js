const express = require("express");
const cors = require("cors");
const bodyP = require("body-parser");
const app = express();
const mysql = require("mysql");



app.use(express.json())
app.use(bodyP.urlencoded({extended: true}))
app.use(cors())
const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'naruegon12',
    database: 'evaluated_animes'
  })

const getAverage = (data) =>{
  const evaKeys = Object.keys(data).map((i)=>{ return parseInt(i)*5})
  const evaValues = Object.values(data).map((i)=>{ return parseInt(i)*5})
  const totalValue = evaKeys.map((i, count) => {return i*evaValues[count]}).reduce((a,b)=>{return a+b})
  const average = totalValue/evaValues.reduce((a,b)=>{return a+b})
  return average.toFixed(2)
}

const updateAverage = (data) => {
  let allValue = []
  let count = 5
  for(let i=0;i<data.length;i++){
      count += 5
      allValue.push(data[i]*count)
  }
  const finalValue = allValue.reduce((a,b)=>{return a+b})
  const allEva = data.reduce((x,y)=>{return x+y})
  const newAverage = (finalValue/allEva).toFixed(2)
  return newAverage
}

app.post("/api/getAnime",(req,res)=>{
  let search = db.query(`SELECT * FROM anime WHERE id = '${req.body.id}'`)
  if(search.values != undefined){
    console.log(search.values);
  } else {
      const id = req.body.id
      const image = req.body.image
      const synopsis = req.body.synopsis
      const name = req.body.name
      const eva = req.body.evaluations
      const values = Object.values(eva)
      const evaluations = `('${values.join("','")}','${id}')`
      const insertAnime = `INSERT INTO anime VALUES(?,?,?,?)`
      db.query(insertAnime,[id,image,synopsis,name],(err,ret)=>{err != null? console.log(err) : console.log("new anime inserted!")})
      db.query(`INSERT INTO evaluations VALUES ${evaluations}`,(err,ret)=>{err != null? console.log(err) : console.log("new evaluation inserted!")})
      res.json({response:getAverage(eva)})
  }
})

app.post("/api/evaluate",(req,res)=>{
  const rate = `rate${req.body.value}`
  db.query(`SELECT ${rate} FROM evaluations WHERE animeId = '${req.body.id}'`, 
  (err,result)=>{
    if(err) console.log(err)
    else{
      let evaNum = Object.values(result[0])[0]
      db.query(`UPDATE evaluations SET ${rate} = ${evaNum} + 1 WHERE animeId  = '${req.body.id}'`,(er,re)=>{
        er? console.log(er) : null;
      })
      db.query('SELECT * FROM evaluations WHERE animeId = ?',[req.body.id],(e,r)=>{
        let newEva = Object.values(r[0]).filter(i => typeof(i) === 'number')
        res.json({response:updateAverage(newEva)})
      })
    }   
  });
});
  

                     
app.listen(3001, ()=> {
  console.log("Hello again...oh, your're stronger");
})