const slider = document.querySelectorAll(".image-comparison-slider");
const sliderImgWrapper = document.querySelectorAll(
  ".image-comparison-slider .img-wrapper"
);
const sliderHandle = document.querySelectorAll(
  ".image-comparison-slider .handle"
);
const visionBtn = document.querySelectorAll(".vision-btn");
const visionTest = document.querySelectorAll(".vision-test");

slider.forEach((item) => {
  item.addEventListener("mousemove", sliderMouseMove);
  item.addEventListener("touchmove", sliderMouseMove);
});

function sliderMouseMove(evt) {
  visionTest.forEach((item, index) => {
    if (item.classList.contains("current")) {
      if (isSliderLocked) return;

      const sliderLeftX = slider[index].offsetLeft;
      const sliderWidth = slider[index].clientWidth;
      const sliderHandleWidth = sliderHandle[index].clientWidth;

      let mouseX = (evt.clientX || evt.touches[0].clientX) - sliderLeftX;
      if (mouseX < 0) mouseX = 0;
      else if (mouseX > sliderWidth) mouseX = sliderWidth;

      sliderImgWrapper.forEach((item) => {
        item.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(4)}%`;
      });

      sliderHandle.forEach((item) => {
        item.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(
          4
        )}% - ${sliderHandleWidth / 2}px)`;
      });
    }
  });
}

let isSliderLocked = true;

slider.forEach((item) => {
  item.addEventListener("mousedown", sliderMouseDown);
  item.addEventListener("touchstart", sliderMouseDown);
  item.addEventListener("mouseup", sliderMouseUp);
  item.addEventListener("touchend", sliderMouseUp);
  item.addEventListener("mouseleave", sliderMouseLeave);
});

function sliderMouseDown(event) {
  if (isSliderLocked) isSliderLocked = false;
  sliderMouseMove(event);
}

function sliderMouseUp() {
  if (!isSliderLocked) isSliderLocked = true;
}

function sliderMouseLeave() {
  if (!isSliderLocked) isSliderLocked = true;
}

visionBtn.forEach((item, index) => {
  showVisionTest(item, visionTest, index + 1);
});

function showVisionTest(button, visionTest, index) {
  button.addEventListener("click", (evt) => {
    visionTest.forEach((item) => {
      item.classList.remove("current");
    });

    visionBtn.forEach((item) => {
      if (button !== item) {
        item.classList.remove("active");
      }
    });

    if (evt.target === button) {
      if (button.classList.contains("active")) {
        visionTest[0].classList.toggle("current");
        visionTest[index].classList.toggle("current");
      }
      visionTest[index].classList.toggle("current");
      button.classList.toggle("active");
    }
  });
}
