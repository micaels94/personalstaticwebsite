const slider = document.querySelector('.slideshow .slider');
const items = document.querySelectorAll('.item', slider);
const maxItems = items.length;
let dragging = false;
let tracking;
let rightTracking;

const sliderRight = document.querySelector('.slideshow').cloneNode(true);
sliderRight.classList.add('slideshow-right');
document.querySelector('.split-slideshow').appendChild(sliderRight);

const rightItems = Array.from(document.querySelectorAll('.item', sliderRight));
const reverseItems = rightItems.reverse();
const sliderRightContent = document.querySelector('.slider', sliderRight);
sliderRightContent.innerHTML = '';
for (let i = 0; i < maxItems; i++) {
  sliderRightContent.appendChild(reverseItems[i]);
}

slider.classList.add('slideshow-left');

const slideshowLeft = new window.Slick('.slideshow-left', {
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  infinite: true,
  dots: true,
  speed: 1000,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
});

slideshowLeft.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  const slideshowRightContent = document.querySelector('.slideshow-right .slider');
  const slideshowText = document.querySelector('.slideshow-text');
  if (currentSlide > nextSlide && nextSlide === 0 && currentSlide === maxItems - 1) {
    slideshowRightContent.slick('slickGoTo', -1);
    slideshowText.slick('slickGoTo', maxItems);
  } else if (currentSlide < nextSlide && currentSlide === 0 && nextSlide === maxItems - 1) {
    slideshowRightContent.slick('slickGoTo', maxItems);
    slideshowText.slick('slickGoTo', -1);
  } else {
    slideshowRightContent.slick('slickGoTo', maxItems - 1 - nextSlide);
    slideshowText.slick('slickGoTo', nextSlide);
  }
});

slideshowLeft.on("mousewheel", function(event) {
  event.preventDefault();
  if (event.deltaX > 0 || event.deltaY < 0) {
    this.slick('slickNext');
  } else if (event.deltaX < 0 || event.deltaY > 0) {
    this.slick('slickPrev');
  }
});

slideshowLeft.on('mousedown touchstart', function(){
  dragging = true;
  tracking = document.querySelector('.slick-track', slider).style.transform;
  tracking = parseInt(tracking.split(',')[5]);
  rightTracking = document.querySelector('.slideshow-right .slick-track').style.transform;
  rightTracking = parseInt(rightTracking.split(',')[5]);
});

slideshowLeft.on('mousemove touchmove', function(){
  if (dragging) {
    const newTracking = document.querySelector('.slideshow-left .slick-track').style.transform;
    const diffTracking = parseInt(newTracking.split(',')[5]) - tracking;
    document.querySelector('.slideshow-right .slick-track').style.transform = `matrix(1, 0, 0, 1, 0, ${rightTracking - diffTracking})`;
  }
});

slideshowLeft.on('mouseleave touchend mouseup', function(){
  dragging = false;
});

const slideshowRightContent = document.querySelector('.slideshow-right .slider');
const slideshowRight = new window.Slick(slideshowRightContent, {
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
})