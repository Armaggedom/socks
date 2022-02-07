const setTitle=require('node-bash-title')
setTitle('📀 Client')
const net=require('net')
const readline=require('readline')
const client=new net.Socket()
const rl=readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
const IPPre=undefined
//-----
rl.question('your username: ', (aswer)=> {
	console.clear()
	var user={'username': aswer}
	Interface(user)
})
function server(user, ip) {
	client.connect(4000, ip, ()=> {
		console.log('Conection [Pré-Online] \nEnvie uma mensagem simples para linkarmos seu usuário com seu ID')
		rl.addListener('line', line=> {client.write(user.username+': '+line)})
		client.on('data', data=> {
			const str=data.toString()
			console.log(str)
		})
	})
}
function Interface(user) {
	console.clear()
	console.log('------------------------------------------------------------------')
	console.log('Client Process')
	console.log('User: '+ user.username)
	console.log('------------------------------------------------------------------')
	rl.question('1- connect to server                2- close aplication\n', (aswer)=> {
		switch(aswer) {
			case '1': 
				rl.question('\t 1- Usar IP Pré definido: ('+IPPre+') Escola: DS \n \t Ip Personalizado? \n', (aswer)=>{
					if(aswer==='1') {
						if(IPPre===undefined) {
							console.log('IP Pré definido ainda não está disponível')
						}
						else {

						}
					}
					else if(aswer==='2') {
						rl.question('Digíte o IP: ', (ip)=>{server(user, ip)})
					}
					else {
						return console.log('isso não é uma opção válida')
					}
				})
				//server(user)
			break;
			case '2':
				rl.close()
				console.log('process ended')
				process.exit(0)
			break;
			default:
		}
	})
}
