const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    add(a: Float!, b: Float!): Float
    subtract(a: Float!, b: Float!): Float
    multiply(a: Float!, b: Float!): Float
    divide(a: Float!, b: Float!): Float
  }
`);

// Define the root resolver functions
const root = {
  add: ({ a, b }) => a + b,
  subtract: ({ a, b }) => a - b,
  multiply: ({ a, b }) => a * b,
  divide: ({ a, b }) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  },
};

// Create an Express app
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the express-graphql middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable the GraphiQL UI for testing
}));

// Start the server
app.listen(4000, () => {
  console.log('GraphQL calculator server running at http://localhost:4000');
});
