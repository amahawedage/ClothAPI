const express =require('express');
const app = express();

//routes
app.get('/',(req,res)=>{
    res.send('Hello Node NIBM')
})

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})