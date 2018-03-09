let btn = doucment.getElementById('start')
btn.onclick(function () {
	let socket=io.connect()
	console.log(socket)
})