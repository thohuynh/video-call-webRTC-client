const openStream = (callback) => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
   .then(Stream => {
     callback(Stream)
   })
   .catch(error => console.log(error))
}

export default openStream