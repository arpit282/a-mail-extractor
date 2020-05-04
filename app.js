const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const path = require("path")


const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.post('/signup',(req,res)=>{
    const {firstname,lastname,Email} = req.body

    console.log(req.body)

    if(!Email || !lastname || !firstname){
        res.redirect('/fail.html')
        return

    }

    const data = {
        members:[
            {
                email_address:Email,
                status:'subscribed',
                merge_fields:{
                    FNAME:firstname,
                    MMERGE2:lastname
                }
            }
        ]
    }

    const postData = JSON.stringify(data)

    const option = {
        url: 'https://us8.api.mailchimp.com/3.0/lists/c5f57c8dfe',
        method:'POST',
        headers:{
            Authorization:'auth 429efe774dfcc769b6f37f0f8da383f9-us8'
        },
        body: postData
    }

    request(option,(err,response,body)=>{
        if(err){
            res.redirect('/fail.html')
        }else{
            if(response.statusCode === 200){
                res.redirect('/success.html')
            }else{
                res.redirect('/fail.html')
            }
        }
    })
})



const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server started at port ${PORT}`))