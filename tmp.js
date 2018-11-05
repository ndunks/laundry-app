/* const package = require("./package.json");
console.log("PN", package.name, package);
return;
 */
// Check mysql pipe existence
var net = require('net');

try {
  const connection = net.createConnection( 3306, "127.0.0.1", () => {
    console.log('COnnect OK');
    connection.destroy()
    
  })
  connection.on("error", (err) => {
    console.log("Connection error");
    
  })
  connection.connect()
} catch (error) {
  console.log("Fail to connect TCP/IP");
}


/* var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic('D:\\material.angular.io\\', {'index': ['index.html']})

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3000) */