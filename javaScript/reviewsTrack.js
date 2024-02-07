const reviewsTrackModule = {
  track: document.getElementById("reviewsTrack"),
  mouseDownAt: "0",
  prevPercentage: 0,

  handleOnDown: function(e) {
    this.mouseDownAt = e.clientX;
  },

  handleOnUp: function() {
    this.mouseDownAt = "0";  
    this.prevPercentage = this.track.dataset.percentage;
  },

  handleOnMove: function(e) {
    if (this.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(this.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(this.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 100), 0);
    
    this.track.dataset.percentage = nextPercentage;
    
    this.track.animate({
      transform: `translate(${nextPercentage}%, 0%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of this.track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  }
};

reviewsTrackModule.track.addEventListener('mousedown', e => reviewsTrackModule.handleOnDown(e));
reviewsTrackModule.track.addEventListener('touchstart', e => reviewsTrackModule.handleOnDown(e.touches[0]));
window.addEventListener('mouseup', e => reviewsTrackModule.handleOnUp(e));
window.addEventListener('touchend', e => reviewsTrackModule.handleOnUp(e.touches[0]));
reviewsTrackModule.track.addEventListener('mousemove', e => reviewsTrackModule.handleOnMove(e));
reviewsTrackModule.track.addEventListener('touchmove', e => reviewsTrackModule.handleOnMove(e.touches[0]));

