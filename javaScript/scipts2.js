const track = document.getElementById("reviewsTrack");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  if (track.dataset.prevPercentage === "0") {
    return;
  }
  else {
    track.dataset.prevPercentage = track.dataset.percentage;
  }
}

const handleOnMove = e => {
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
  
  for(const image of track.getElementsByClassName("imageReviews")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

track.onmousedown = e => handleOnDown(e);

track.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

track.onmousemove = e => handleOnMove(e);

track.ontouchmove = e => handleOnMove(e.touches[0]);