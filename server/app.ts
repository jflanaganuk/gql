import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import cors from 'cors';

const env = require('./env.json');

const app = express();

app.use(cors());

const uri = `mongodb+srv://${env.user}:${env.pass}@${env.host}/${env.db}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000")
});
