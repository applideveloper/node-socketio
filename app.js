var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
// localhost:1337
app.listen(1337);
io.set('log level1', 1);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  }); 
} 

var chat = io.of('/chat').on('connection', function(socket) {
// io.sockets.on('connection', function(socket) {
  socket.on('emit_from_client', function(data) {
  
  // console.log(data);
  // socket.emit 接続しているソケット以外全部
  //  socket.emit('emit_from_server', 'hello from server: ' + data);
  // socket.broadcast.emit 自分以外全員送信
  // socket.broadcast.emit('emit_from_server', 'hello from server: ' + data);
  // io.sockets.emit('emit_from_server', '[' + socket.id + ']:' + data);

//    socket.set('client_name', data.name);
//    socket.get('client_name', function(err, name) {
//      io.sockets.emit('emit_from_server', '[' + name + ']:' + data.msg);
//    });
  
    socket.join(data.room);
    socket.emit('emit_from_server', 'you are in ' + data.room);
    socket.broadcast.to(data.room).emit('emit_from_server', data.msg);
  });
});

var news = io.of('/news').on('connection', function(socket) {
  socket.emit('emit_form_server', 'today: ' + new Date());
});
