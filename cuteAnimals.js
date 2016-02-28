var log = console.log.bind(console)
var serverPort =      process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
var serverIPAddress = process.env.OPENSHIFT_NODEJS_IP   || process.env.IP   || '127.0.0.1'
 

var express = require('express'), app = express()
var handlebars = require('express-handlebars').create({defaultLayout:'main.hbs'})
  app.engine('hbs', handlebars.engine)
  app.set('view engine', 'hbs')
app.listen(serverPort, serverIPAddress, ()=>log('Server started'))
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res){res.render('home')})
app.get('/about', function(req, res){res.render('about', {fortune: require('./sayings')()})})
app.use(function(req, res){res.status(404); res.render('404')})
app.use(function(err, req, res, next){console.error(err.stack); res.status(500); res.render('500')})

 


// //simple node server without express
// var http = require('http'), fs = require('fs')
// http.createServer(onConnect).listen(process.env.PORT, process.env.IP); log('Server started')
// function onConnect(req,res){
//   var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
//   log('path',path)
//   switch(path) {
//     case '':              serveStaticFile(res, '/public/home.html',    'text/html'     ); break
//     case '/about':        serveStaticFile(res, '/public/about.html',   'text/html'     ); break
//     case '/img/logo.jpg': serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg'    ); break
//     default:              serveStaticFile(res, '/public/404.html',     'text/html', 404); break }}

// function serveStaticFile(res, path, contentType, responseCode) {
//   if(!responseCode) responseCode = 200
//   fs.readFile(__dirname + path, function(err,data) {
//     if(err) {res.writeHead(500,          {'Content-Type': 'text/plain'}); res.end('500 - Internal Error')}
//     else    {res.writeHead(responseCode, {'Content-Type': contentType }); res.end(data)}                   })}
