var Restify = require('restify');
var Primality = require('primality');

var server = Restify.createServer({});

server.pre(Restify.pre.userAgentConnection());

function primeNumber(req, res, next) {
  var number = parseInt(req.params.number, 10);

  if (Primality(number)) {
    res.json({ number: number, prime: true });
  }
  else {
    res.send(404, "Not found");
  }
}

server.get('/prime-number/:number', primeNumber);
server.head('/prime-number/:number', primeNumber);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});