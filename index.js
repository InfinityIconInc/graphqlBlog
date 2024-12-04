const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const ejs = require('ejs');

const resolver = require('./graphql/resolver');
const schema = require('./graphql/schema');

const app = express();
app.set('view engine', 'ejs');

global.loggedIn = null;
app.use('*',(req,res,next) => {
    res.locals.loggedIn = false; //!!req.session.userId;
    next();
});
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/graphblog')
    .then(() => console.log('MongoDB Connected 27017'))
    .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
app.get('/', homeController );
app.get('/newpost', newPostController );


app.listen(3000, () => console.log('Server dancing on port 3000'));