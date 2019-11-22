import openStream from "./openStream"
import Peer from 'peerjs'
import uid from 'uid'
import playVideo from "./playVideo"
import $ from "jquery"

function getPeer () {
  const id = uid(2)
  $('#myPeerId').append(`My ID: ${id}`)

  return id
}
const peer = new Peer(getPeer())

$('#btnConnect').click(() => {
  let idFriendStream = $('#textFriendId').val()
  const localVideo  = document.getElementById('localStream')
  const friendVideo = document.getElementById('friendStream')
  openStream((Stream) => {
    playVideo(Stream, localVideo)
    const call = peer.call(idFriendStream, Stream)
    call.on('stream', friendStream => {
      playVideo(friendStream, friendVideo)
    })
  })
})

peer.on('call', (call) => {
  openStream((Stream) => {
    const localVideo  = document.getElementById('localStream')
    const friendVideo = document.getElementById('friendStream')
    playVideo(Stream, localVideo)
    call.answer(Stream)
    call.on('stream', friendStream => {
      playVideo(friendStream, friendVideo)
    })
  })
})


