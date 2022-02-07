const setTitle=require('node-bash-title')
const readline=require('readline')
const net=require('net')
const rl=readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
setTitle('💽 Server')
var bloq=false;
var socketClient=[]
var clients= {
	'client1': undefined,
	'client2': undefined
}
const handleConnection=function (socket) {
	console.log('[Cardial] Client connected')
	socket.on('end', ()=>{console.log('[Cardial] Client disconnected')})
	socket.on('data', data=>{
		//Split string
		const str=data.toString()
		const splited=str.split(" ").join(',').split(':').join(',').split(',');
		//log
		console.log('[Cardial.message.log]: ', str)
		//link client to Socket
		socketClient.push(socket)
		if(socketClient[1]===undefined) {
			clients.client1=splited[0]
			console.log('[Cardial] Client1: linked')
			socketClient[0].write('[Cardial] you linked in Port 1, please dont send mensages, await to new user connection')
		}
		else if(socketClient[1]!=undefined && socketClient[1]!=undefined && bloq===false) {
			bloq=true
			clients.client2=splited[0]
			console.log('[Cardial] Client2: linked')
			socketClient[1].write('[Cardial] you linked in Port 2')
			socketClient[1].write('[Cardial] '+clients.client1+' connected')
			socketClient[0].write('[Cardial] '+clients.client2+' connected')
		}
		else {
			if(socketClient[0]===socketClient[1]) {
				console.log('[Cardial > ERROR] ocorreu um erro no linkamento: \n[001]: Socket1 and socket2 equal')
				return socket.destroy()
			}
			if(clients.client1===clients.client2) {
				console.log('[Cardial > ERROR] ocorreu um erro no linkamento: \n[001]: Client.name1 and Client.name2 equal')
				console.log('client1: ', clients.client1)
				console.log('client2: ', clients.client2)
				return socket.destroy()	
			}
			else {Command(socket, splited, str)}
		}	
	})
}
function Command(socket, splited, str) {
	// Commands
	// disconnect split ex: [name], [space], [message1]
	if(splited[2]==='end') {
		socket.write('Conection [Offline]')
		socket.end()
	}
	// show names
	else if(splited[2]==='show') {
		console.log(clients.client1+' tipo de saida: '+ typeof clients.client1)
		console.log(clients.client2+' tipo de saida: '+ typeof clients.client2)
	}
	// no command
	else {
		if(splited[0]===clients.client1) {socketClient[1].write('\x1b[33m'+str+'\x1b[0m')}
		else {socketClient[0].write('\x1b[33m'+str+'\x1b[0m')}
	}
}
// main
const server=net.createServer(handleConnection)
server.maxConnections=2
rl.question('Inser IP: ', (aswer)=> {
	server.listen(4000, aswer, ()=>{
		console.clear()
		console.log('---------------------------------------------------')
		console.log('Opened server on', server.address())
		console.log('Server Info: \nVersion: 2.0.1  \nDirect connection: YES \n Reconection: NO\nMessages loged: YES \nAdmin: NO')
		console.log('Client Info: \nVersion: 2.0.0')
		console.log('Ip Info: \nWifi Connection: undefined \nIP locate: undefined')
		console.log('-------------------- [CARDIAL] -------------------- \n\n')
	})
	rl.close()
})