export default (Stream, video) => {
  video.srcObject        = Stream
  video.onloadedmetadata = function () {
    video.play()
  }
}