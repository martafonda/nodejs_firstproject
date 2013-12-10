var net = require('net');
var port = 11311;
var object = {}
var server = net.createServer(function(connection) {
    console.log('Connection open');
    connection.write('This is my SimpleCache\r\n');
    connection.on('data', function(data) {
        petition = String(data).trim().split(" ");
        command = petition[0];
        if (command == "set"){
            object[petition[1]] = petition[2];
            connection.write("STORED\r\n");
            return;
        } else if (command == "get" && petition.length == 2){
            if(object[petition[1]]){
                connection.write("VALUE " + object[petition[1]] + "\r\n"); 
                return;
            }else{
                connection.write("END\r\n");
                return;
            }
        } else if (command == "delete" && petition.length==2){
            delete object[petition[1]];
            connection.write('DELETED\r\n');
            return;
        } else if (command == "quit" && petition.length==1){
            connection.end("BYE!\r\n");
        }
        return write(connection, "ERROR\r\n");
    });
});
server.listen(port);