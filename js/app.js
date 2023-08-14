/**
 * Get the take-photo-id button ...
 * and fire the click event 
 *
 * 
 */

(function(){
const takePhotoButton = document.getElementById('px-take-photo-id');

	const canvas = document.getElementById("photos-canvas");

	const context = canvas.getContext("2d");

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

	context.drawImage(video, 0, 0, 400, 300);

	const photo = document.getElementById("placeholder-photo");

	photo.setAttribute("src", canvas.toDataURL('image/png'));




// ================================================

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
filterOptions = document.querySelectorAll(".filter button"),
resetFilterBtn = document.querySelector("#clear_filter"),
previewImg = document.querySelector("#placeholder-photo"),
saveImgBtn = document.querySelector("#save-photo-id");

let brightness = "100", saturation = "100", inversion = "0", hue_rotate = "0", contrast = "100", grayscale = "0";



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
        }else if(option.id === "hue_rotate") {
            filterSlider.max = "100";
            filterSlider.value = hue_rotate;
            filterValue.innerText = `${hue_rotate}deg`;
        }else if(option.id === "contrast") {
            filterSlider.max = "100";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});



// apply filter
const applyFilter = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) hue-rotate(${hue_rotate}deg) contrast(${contrast}%) grayscale(${grayscale}%)`;
}

//update filter
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }else if(selectedFilter.id === "hue_rotate") {
        hue_rotate = filterSlider.value;
    }else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

//reset filter button
const resetFilter = () => {
    brightness = "100"; saturation = "100"; hue_rotate="0"; contrast="100"; inversion = "0"; grayscale = "0";
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) hue-rotate(${hue_rotate}deg) contrast(${contrast}%) grayscale(${grayscale}%)`;
    context.translate(canvas.width / 2, canvas.height / 2);
    
    context.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);


})();

