// const server = require('./app');

// server.listen(8080, function() {
//   console.log('Server is listening on http://localhost:8080');
// });

const server = require('./app');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`server is listening on port: ${PORT} brosef, come check it out`));