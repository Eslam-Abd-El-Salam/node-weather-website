const path = require('path')
const express = require("express")
const app = express();
const hbs = require('hbs')
const request = require('request');


const port = process.env.PORT  || 3000

//Define Paths for express  config
const viewsPath = (path.join(__dirname,'../templates/views')) 
const partialsPath = (path.join(__dirname,'../templates/partials'))


//setup handelbars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:"eslam"
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather app',
        name:"eslam"
    });
})



app.get("/help",(req,res)=>{
    res.render('help',{
        name:"eslam abd el-salam",
        age:27,
        message:"software developer"
    })
})


app.get('/weathertest',(req,res)=>{

    if(!req.query.address){
            res.send({
            error:"address needed to be provieded"
        })

    }else{
        if (req.query.address ==="Philadelphia")
        {
        res.send({
            forecast:'It is Snowing',
            location:'Philadelphia',
            address:req.query.address
        })
       }else{
        res.send({
        error:"Wrong Address"
    })}
    }




})


app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!req.query.address){

        res.send({
            error:"address needed to be provieded"
        })
    }else{
        const  url = "http://api.weatherstack.com/current?access_key=436adcbe49ace2f1b2392ada514b0f5d&query="+address+"#"
        request({url:url,json:true},(err,response)=>{
            if (err){
                res.send(err)
            }else if(!response.body.current.temperature){
                res.send("err")
            }
        else{
             
            res.send(
                {
                    Temperature:response.body.current.temperature,
                    Describtion:response.body.current.weather_descriptions[0],
                    Location:address
                }
             
            )
        }
            
        })
    }
})





app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })




    
})

app.get('*',(req,res)=>{
    res.render('error')
})


app.listen(port,()=>{
    console.log("server is up on port "+port)
})