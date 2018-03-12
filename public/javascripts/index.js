let btn = document.getElementById('start')
let socket=io.connect('http://localhost:3000')
let inputMySpeak = document.getElementById('inputMySpeak')
let urlHead = 'http://localhost:3000/'
btn.onclick = function () {
	let msg = inputMySpeak.value
	socket.emit('sendSpeak', {name: myName, msg: msg})
}
socket.on('getAllSpeak',function(msg){
	let s = '<li>姓名' + msg.name + '<br/>内容:' + msg.msg + '</li>'
     $('#speakList').append(s)
})

// 心跳包 
let healthTimeOut = 5000
let healthInterval = 6000
let t1 = null
let t2 = null
socket.on('getHeartBeat', function (msg) {
	clearTimeout(t2)
})
t1 = setInterval(function () {
	socket.emit('checkHeartBeat')
	t2 = setTimeout(function(){
		clearTimeout(t1)
		clearTimeout(t2)
		socket.close()
		layer.msg('连接超时', {icon: 6}); 
	}, healthTimeOut)
}, healthInterval)

// 输入用户名字
let myName = ''
layer.open({
  title: '您的名字？',
  content: '<input id="name" style="width: 100%;" />',
  yes: function(index, layero){
  	let name = $('#name').val()
  	$.post(urlHead+ 'login', {name: name}, function(data){
  		if (JSON.parse(data).status === 0) {
  			myName = name
  			layer.close(index); 
  		} else {
  			layer.msg('连接失败！')
  		}
  	})
  }
}); 

