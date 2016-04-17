/** Created by ge on 4/13/16. */
export default class SmoothScroll {
  constructor(element, options = {}) {
    this.element = element;
    this.target = element.scrollTop;
    this.mass = options.mass || 12.5;
    this.viscosity = options.viscosity || 0.7;
    this.acceleration = 1;
    this.speed = 0;
    this.minSpeed = Math.abs(options.minSpeed) || 1;
  }

  scrollTo(position) {
    if (typeof position !== "undefined") this.target = Math.max(position, 0); // scrollTop has to be positive.
    this.startScroll();
  }

  startScroll() {
    if (this.removeInterval) return;
    this.removeInterval = setInterval(this.scroll, 1000 / 60)
  }

  scroll = ()=> {
    try {
      var currentPosition = this.element.scrollTop;
      this.acceleration = -this.viscosity * this.speed + (this.target - currentPosition) / this.mass;
      this.speed += this.acceleration;
      if (this.speed >= 0 && this.speed < this.minSpeed) this.speed = this.minSpeed;
      if (this.speed <= 0 && this.speed > -this.minSpeed) this.speed = -this.minSpeed;
      // console.log(`a = ${this.acceleration}, v = ${ this.speed},  target = ${this.target}, x = ${this.element.scrollTop}`);
      var newPosition = currentPosition + this.speed;
      if ((newPosition >= this.target && this.target >= currentPosition) || (newPosition <= this.target && this.target <= currentPosition)) {
        this.element.scrollTop = this.target;
        this.finishScroll();
      } else {
        setImmediate(()=> {
          this.element.scrollTop = newPosition;
        })
      }
    } catch (e) {
      console.error('smooth scroll error: ', e);
    }
  };

  finishScroll() {
    clearInterval(this.removeInterval);
    // console.log("finished =========== ", this.target, this.element.scrollTop);
    this.speed = 0;
    this.removeInterval = null;
  }
}
