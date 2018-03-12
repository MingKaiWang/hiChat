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