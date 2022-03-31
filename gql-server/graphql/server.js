var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
    random: Float!
    quoteOfTheDay: String
}
`);

// The root provides a resolver function for each API endpoint
var root = {
    rollDice: ({numDice, numSides}) => {
      var output = [];
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    },
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
      },
    random: () => {
        return Math.round(Math.random() * 1000);
      },
  };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');