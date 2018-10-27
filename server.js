const express = require('express'); 
const mongoose = require('mongoose'); 

const PORT = process.env.PORT || 3000; 
const app = express(); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(/*process.env.MOGODB_URI ||*/ 'mongodb://localhost/twitterBBBBB', { useNewUrlParser: true }); 
console.log(process.env.MONGODB_URI);

require('./routes/api-routes')(app); 
require('./routes/html-routes')(app); 


app.listen(PORT, () => {console.log(`App is now listening on PORT ${PORT}`)});