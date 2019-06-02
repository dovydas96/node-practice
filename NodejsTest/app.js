const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


const PORT = 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Routes
app.use('/', require('./Routes/index'));
app.use('/users', require('./Routes/users'));

