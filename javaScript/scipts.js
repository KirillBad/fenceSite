// Функция обработки нажатия на элемент
const handleOnDown = (e, track) => {
  track.dataset.mouseDownAt = e.clientX;
};

// Функция обработки отпускания кнопки мыши
const handleOnUp = (track) => {
  track.dataset.mouseDownAt = "0";  
  if (track.dataset.prevPercentage === "0") {
      return;
  } else {
      track.dataset.prevPercentage = track.dataset.percentage;
  }
};

// Функция обработки перемещения мыши
const handleOnMove = (e, track) => {
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);

  track.dataset.percentage = nextPercentage;

  track.animate({
      transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });

  for(const image of track.getElementsByClassName("imageExamples")) {
      image.animate({
          objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
  }
};

// Функция для назначения обработчиков событий на элемент
const setupTrackEvents = (track) => {
  track.onmousedown = e => handleOnDown(e, track);
  track.ontouchstart = e => handleOnDown(e.touches[0], track);
  window.onmouseup = e => handleOnUp(e, track);
  window.ontouchend = e => handleOnUp(e.touches[0], track);
  track.onmousemove = e => handleOnMove(e, track);
  track.ontouchmove = e => handleOnMove(e.touches[0], track);
};

// Получение элементов track и назначение обработчиков событий
const examplesTrack = document.getElementById("examplesTrack");
const reviewsTrack = document.getElementById("reviewsTrack");

setupTrackEvents(examplesTrack);
setupTrackEvents(reviewsTrack);
