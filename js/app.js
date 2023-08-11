/**
 * Get the take-photo-id button ...
 * and fire the click event 
 *
 * 
 */

(function(){
const takePhotoButton = document.getElementById('px-take-photo-id');

takePhotoButton.addEventListener('click', function(){

	//open the bootstrap modal 
	$("#takePhotoModal").modal('show');

	//since the modal is now showing...
	//now show the video stream ..
	const video = document.getElementById("stream-video");


	//Use the getUserMedia() method 
	navigator.mediaDevices.getUserMedia({

				'audio': false,
				'video': true

			})
			 .then(function(stream){
			 	this.globalStream = stream;
			 	video.srcObject = stream;
			 	video.onloadedmetadata = function(){

			 		video.play();
			 	}


			 })
			 .catch();


	document.getElementById("take-snap-id").addEventListener("click", function(){
	const canvas = document.getElementById("photos-canvas");

	const context = canvas.getContext("2d");

	context.drawImage(video, 0, 0, 400, 300);

	const photo = document.getElementById("placeholder-photo");

	photo.setAttribute("src", canvas.toDataURL('image/png'));


});



//Close the modal
//And end the camera session
document.getElementById('close-modal-id').addEventListener('click', function(){

		tracks = globalStream.getTracks();
		tracks.forEach((track) =>{
			track.stop();
		})


})


//If the modal was closed by clicking outside the modal..
$('#takePhotoModal').on('hidden.bs.modal', function (e) {
  // do something...
  tracks = globalStream.getTracks();
  tracks.forEach((track) =>{
  	track.stop();
  })


})

});

const filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
filterOptions = document.querySelectorAll(".filter button")
saveImgBtn = document.querySelector("#save-photo-id");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}



saveImgBtn.addEventListener("click", saveImage);


})();

