const express = require('express');
const app =  express();
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const ownerRouter = require('./routes/ownerRouter');

require('dotenv').config();

main()
.then(()=>console.log('Connected to MongoDB'))
.catch((err) =>console.log(err)); 

async function main() {
     await mongoose.connect(process.env.MONGO_URI)
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.use('/',userRouter);
app.use('/owners',ownerRouter)

app.listen(5000,() =>{
     console.log('Server is running on port 5000');
})
