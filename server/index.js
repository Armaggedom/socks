const setTitle=require('node-bash-title')
setTitle('💽 Server')
const net=require('net')

var clients={
	'client1': undefined,
	'client2': undefined
}
const handleConnection=socket=> {
	console.log('[Cardial] Client connected')
	socket.on('end', ()=>{console.log('[Cardial] Client disconnected')})
	socket.on('data', data=>{
		const str=data.toString()
		const splited=str.split(" ").join(',').split(':').join(',').split(',');//split(':').join(',').split(' ').join(',').split(',')
		//define id
		if(clients.client1===null || clients.client1===undefined) {
			splited[0]=clients.client1
		}
		else if(clients.client1!==null || clients.client1!==undefined) {
			if(splited[0]!==clients.client1) {
				splited[0]=clients.client2
			}
		}
		//debug
		var length=splited.length
		console.log('\n\nsaida do str: '+str)
		console.log('tipo de saida do str: '+typeof str)
		console.log('comprimento do split: '+length)
		console.log('split completo: '+splited)
		console.log('tipo do split'+ typeof splited)
		for(var i=0; i<splited.length; i++) {
			console.log('split da posição ' +i+': '+splited[i])
		}
		// disconnect split ex: [name], [space], [message1]
		if(splited[1]==='end') {
			socket.write('Conection [Offline]')
			socket.end()
		}
		else if(splited[1]==='show') {
			console.log(clients.client1)
			console.log(clients.client2)
		}
		else {
		//	console.log(str)
		// 	clients[0].write(history[i])
		// 	clients[1].write(history[i])
		}
	})
}
const server=net.createServer(handleConnection)
server.maxConnections=2
server.listen(4000, '127.0.0.1', ()=>{
	console.clear()
	console.log('Opened server on', server.address())
})