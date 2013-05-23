var express = require('express');
var server = express();
server.configure(function(){
  server.use(express.static('public'));
});

server.listen(3000);
