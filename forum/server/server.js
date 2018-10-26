'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    app.io.on('connection', function(socket) {
      console.info('a user connected');
      socket.on('disconnect', function() {
        console.info('user disconnected');
      });

      socket.on('ajoutercommentaire', function(msg) {
        socket.emit('ajoutercommentaire', msg);
        // console.log(record);
        let record =  [{date: new Date(Date.now()), text: msg}];
        app.models.Comment.create(record, (error) => { if (error) console.error(error); });
        socket.broadcast.emit('ajoutercommentaire', msg);
        // app.models.Message.create(record, (error) => { if (error) console.error(error); });
       // socket.broadcast.emit('submitMessage', msg);

        //client.publish(topic, msg);
       // console.log(topic + ' : ' + msg);
       // socket.emit('publishMessageTopic', topic, msg);
      });
      //socket.on('subscribeTopic', function(topic) {
       // client.subscribe(topic);
       // console.log('Je souscris à ' + topic);
      //});
    });
  }
});
