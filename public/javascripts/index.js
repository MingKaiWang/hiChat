let btn = document.getElementById('start')
let socket=io.connect('http://localhost:3000')
let inputMySpeak = document.getElementById('inputMySpeak')

btn.onclick = function () {
	let msg = inputMySpeak.value
	socket.emit('sendSpeak', msg)
}
socket.on('getAllSpeak',function(msg){
	let s = '<li>' + msg + '</li>'
     $('#speakList').append(s)
})

// 心跳包 
let healthTimeOut = 5000
let healthInterval = 6000
let t1 = null
let t2 = null
socket.on('getHeartBeat', function (msg) {
	console.log(13123)
	clearTimeout(t2)
})
t1 = setInterval(function () {
	socket.emit('checkHeartBeat')
	t2 = setTimeout(function(){
		clearTimeout(t1)
		clearTimeout(t2)
		socket.close()
		alert('连接超时')
	}, healthTimeOut)
}, healthInterval)

