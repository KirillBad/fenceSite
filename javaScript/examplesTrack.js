const examplesTrackModule = {
  track: document.getElementById("examplesTrack"),
  mouseDownAt: "0",
  prevPercentage: "0",
  percentage: 0,

  handleOnDown: function(e) {
    this.mouseDownAt = e.clientX;
  },

  handleOnUp: function() {
    this.mouseDownAt = "0";  
    this.prevPercentage = this.percentage;
  },

  handleOnMove: function(e) {
    if (this.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(this.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    console.log(this.percentage);  
    console.log(this.prevPercentage);

    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(this.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    this.percentage = nextPercentage;
    
    this.track.animate({
      transform: `translate(${nextPercentage}%, 0%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of this.track.getElementsByClassName("imageExamples")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  }
};

examplesTrackModule.track.addEventListener('mousedown', e => examplesTrackModule.handleOnDown(e));
examplesTrackModule.track.addEventListener('touchstart', e => examplesTrackModule.handleOnDown(e.touches[0]));
window.addEventListener('mouseup', e => examplesTrackModule.handleOnUp(e));
window.addEventListener('touchend', e => examplesTrackModule.handleOnUp(e.touches[0]));
examplesTrackModule.track.addEventListener('mousemove', e => examplesTrackModule.handleOnMove(e));
examplesTrackModule.track.addEventListener('touchmove', e => examplesTrackModule.handleOnMove(e.touches[0]));
