const slider = document.querySelectorAll(".image-comparison-slider");
const sliderImgWrapper = document.querySelectorAll(".image-comparison-slider .img-wrapper");
const sliderHandle = document.querySelectorAll(".image-comparison-slider .handle");
const visionBtn = document.querySelectorAll(".vision-btn");
const visionTest = document.querySelectorAll(".vision-test");

function sliderMouseMove(evt) {
  //Log On² could be refactor to be faster by using frequency counter pattern
   visionTest.forEach((item, index) => { 
      if (item.classList.contains("current")) {
         // Only run if element contains the class current
         if (isSliderLocked) return; // If slider is locked dont update the slider

         // For each vision test container
         const sliderLeftX = slider[index].offsetLeft; //Get the x coordinate of the upper left edge of the slider
         const sliderWidth = slider[index].clientWidth; // Get sliders width
         const sliderHandleWidth = sliderHandle[index].clientWidth;

         let mouseX = (evt.clientX || evt.touches[0].clientX) - sliderLeftX; //Get the horizontal distance between the mouse pointer and left edge of the slider

         //Check mouseX position if in min/max width of the slider
         if (mouseX < 0) mouseX = 0;
         else if (mouseX > sliderWidth) mouseX = sliderWidth;

         sliderImgWrapper.forEach((item) => {
            // Update the width of the image according to the position of the slider
            item.style.width = `${((1 - mouseX / sliderWidth) * 100)}%`;
         });

         sliderHandle.forEach((item) => {
            // Update slider position according to the position of the mouseX
            item.style.left = `calc(${((mouseX / sliderWidth) * 100)}% - ${sliderHandleWidth / 2}px)`;
         });
      }
   });
}

//Assign each slider events to listen
slider.forEach((item) => {
   item.addEventListener("mousemove", sliderMouseMove);
   item.addEventListener("mousedown", sliderMouseDown);
   item.addEventListener("mouseup", sliderMouseUp);
   item.addEventListener("mouseleave", sliderMouseLeave);
   //For touch screen
   item.addEventListener("touchmove", sliderMouseMove);
   item.addEventListener("touchstart", sliderMouseDown);
   item.addEventListener("touchend", sliderMouseUp);
});
let isSliderLocked = true;

function sliderMouseDown() {
   if (isSliderLocked) isSliderLocked = false; //Unlock slider when mouse is pressed
}

function sliderMouseUp() {
   if (!isSliderLocked) isSliderLocked = true; //Lock slider when mouse pressed is release
}

function sliderMouseLeave() {
   if (!isSliderLocked) isSliderLocked = true; //lock slied if the mouse leaves the image area
}

//Log On²
visionBtn.forEach((item, index) => {
   //This takes the a button, vision test, and the current index
   //This will loop through all the buttons and assign each with the corresponding vision test element
   //index 0 is the normal vision test no need to assign it to a button so start with index 1
   showVisionTest(item, visionTest, index + 1);
});

//Log On
function showVisionTest(button, visionTest, index) {
   button.addEventListener("click", (evt) => {
      //Reset all visionTest's current class
      visionTest.forEach((item) => {
         item.classList.remove("current");
      });

      //Reset all button style
      visionBtn.forEach((item) => {
         if (button !== item) {
            item.classList.remove("active");
         }
      });

      if (evt.target === button) {
         if (button.classList.contains("active")) {
            //If the button clicked has the "active" class
            visionTest[0].classList.toggle("current"); //Display the normal visionTest
            visionTest[index].classList.toggle("current"); //Toggle off the current visionTest
         }
         // Toggle on selected visiontest and button
         visionTest[index].classList.toggle("current");
         button.classList.toggle("active");
      }
   });
}
