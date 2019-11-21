import Peer from "simple-peer"
import playVideo from "./playVideo"
import $ from "jquery"

const openCamera = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
   .then(Stream => {
     const localVideo    = document.getElementById('localStream')
     const friendVideo   = document.getElementById('friendStream')
     const streamConnect = new Peer({
       initiator: location.hash === '#1',
       trickle:   false,
       stream:    Stream
     })

     playVideo(Stream, localVideo)

     streamConnect.on('error', err => console.log('error', err))

     streamConnect.on('signal', token => {
       $('#textMyToken').val(JSON.stringify(token))
     })

     $('#btnConnect').click(() => {
       let token = $('#textFriendToken').val()

       streamConnect.signal(JSON.parse(token))
     })

     streamConnect.on('connect', () => {
       console.log('CONNECT')
       streamConnect.send('whatever' + Math.random())
     })

     streamConnect.on('data', data => {
       console.log('data: ' + data)
     })

     streamConnect.on('stream', friendStream => playVideo(friendStream, friendVideo))
   })
   .catch(error => console.log(error))
}

export default openCamera