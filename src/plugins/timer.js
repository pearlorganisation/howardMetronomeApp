function Timer(callback, timeInterval, swingPercentage, options) {
  this.timeInterval = timeInterval;
  this.swingPercentage = swingPercentage;
  this.callback = callback;
  this.options = options;
  this.expected = null

  this.start = () => {
      this.expected = Date.now() + this.timeInterval;
      console.log(this.expected)
      this.timeout = setTimeout(this.round, this.timeInterval);
  }

  this.stop = () => {
    //   console.log('expected before',this.expected)
      clearTimeout(this.timeout);
      this.expected = null; // Reset the expected time
    //   console.log('expected after',this.expected)
  }

  this.round = () => {
    if (this.expected === null) {
        return; // Stop if expected time is null (i.e., stopped)
    }

    console.log('running');
    const drift = Date.now() - this.expected;
    this.callback();

    this.expected += this.timeInterval;
    //formula for swing percentage = (Swing Delay / Time Interval) * 100
    const nextTimeout = this.timeInterval - drift;
    console.log('next timeout::', nextTimeout)
    this.timeout = setTimeout(this.round.bind(this), nextTimeout);
}
}

export default Timer