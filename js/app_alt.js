/**
 * Get the Camera ..
 */

//load in the video stream..
//Will be using the "DOMContentCreated event"
//
window.addEventListener("DOMContentLoaded", function(){

	//load in the video..
	this.video = document.getElementById("stream-video");
	const vendorUrl = window.URL || window.webkitURL;

	/**
	 *  --- window.URL ---
	 *  URL is one of the properties of the window global object. It returns the current URL string 
	 */
	


	navigator.getUserMedia = navigator.mediaDevices.getUserMedia;

	navigator.getUserMedia({

		video: true,
		audio: false

	}, function(success){

		video.srcObject = success;
		video.onloadedmetadata = function(){

			video.play();
		}

	}, function(error){

		console.log('error')
	});


});

const takePhoto = document.getElementById("px-take-photo-id");

takePhoto.addEventListener("click", function(){

	//open the bootstrap modal 
	$("#takePhotoModal").modal('show');

})


function takeSnap(){
	const canvas = document.getElementById("photos-canvas");

	const context = canvas.getContext("2d");

	context.drawImage(video, 0, 0, 400, 300);

	const photo = document.getElementById("placeholder-photo");

	photo.setAttribute("src", canvas.toDataURL('image/png'));

}