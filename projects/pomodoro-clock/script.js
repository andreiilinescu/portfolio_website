// Accurate_Interval.js 
// Thanks Squeege! For the elegant answer provided to this question: 
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time). 

(function () {
  window.accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel };

  };
}).call(this);
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeleft: 25 * 60,
      pause: true,
      interval: "",
      type: "session",
      s: 25,
      b: 5 };

    this.what = this.what.bind(this);
    this.start = this.start.bind(this);
    this.clock = this.clock.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.bup = this.bup.bind(this);
    this.bdown = this.bdown.bind(this);
  }
  what() {
    if (this.state.pause == true) {
      this.start();
    } else
    {
      this.pause();
    }
  }
  start() {
    this.setState({ interval: accurateInterval(() => {this.setState({ timeleft: this.state.timeleft - 1 });this.zero();}, 1000),
      pause: false });
  }
  pause() {
    this.state.interval && this.state.interval.cancel();
    this.setState({ pause: true });
  }
  clock() {
    let minutes = Math.floor(this.state.timeleft / 60);
    let seconds = this.state.timeleft - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  reset() {
    this.state.interval && this.state.interval.cancel();
    this.setState({
      timeleft: 25 * 60,
      pause: true,
      interval: "",
      type: "session",
      s: 25,
      b: 5,
      interval: "" });

    this.audio.pause();
    this.audio.currentTime = 0;
  }
  up() {
    if (this.state.s <= 59)
    {
      let x = this.state.s + 1;
      if (this.state.type == "session") {
        this.setState({
          s: x,
          timeleft: x * 60 });

      } else
      {
        this.setState({
          s: x });

      }
    }
  }
  bup() {
    if (this.state.b <= 59)
    {
      let x = this.state.b + 1;
      if (this.state.type == "break") {
        this.setState({
          b: x,
          timeleft: x * 60 });

      } else
      {
        this.setState({
          b: x });

      }
    }
  }
  down() {
    if (this.state.s > 1)
    {
      let x = this.state.s - 1;
      if (this.state.type == "session") {
        this.setState({
          timeleft: x * 60,
          s: x });

      } else
      {
        this.setState({
          s: x });

      }
    }
  }
  bdown() {
    if (this.state.b > 1)
    {
      let x = this.state.b - 1;
      if (this.state.type == "break") {
        this.setState({
          timeleft: x * 60,
          b: x });

      } else
      {
        this.setState({
          b: x });

      }
    }
  }
  zero() {
    if (this.state.timeleft < 0) {
      this.audio.play();
      this.state.interval && this.state.interval.cancel();
      if (this.state.type == "session") {
        this.setState({
          type: "break",
          timeleft: this.state.b * 60 });

      } else
      {
        this.setState({
          type: "session",
          timeleft: this.state.s * 60 });

      }
      this.start();
    }
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", null,
      React.createElement("div", { class: "row" },
      React.createElement("h2", { class: "col-6", id: "session-label" }, "Session"),
      React.createElement("h2", { class: "col-6", id: "break-label" }, "Break")),

      React.createElement("div", { class: "row" },
      React.createElement("div", { class: "col-6" }, React.createElement("button", { onClick: this.up, id: "session-increment" }, "up")),
      React.createElement("div", { class: "col-6" }, React.createElement("button", { onClick: this.bup, id: "break-increment" }, "up"))),

      React.createElement("div", { class: "row" },
      React.createElement("div", { class: "col-6", id: "session-length" }, this.state.s),
      React.createElement("div", { class: "col-6", id: "break-length" }, this.state.b)),

      React.createElement("div", { class: "row" },
      React.createElement("div", { class: "col-6" }, React.createElement("button", { onClick: this.down, id: "session-decrement" }, "down"), " "),
      React.createElement("div", { class: "col-6" }, React.createElement("button", { onClick: this.bdown, id: "break-decrement" }, "down"), " "))),


      React.createElement("div", null,
      React.createElement("h1", null, "Pomodoro Clock"),
      React.createElement("h1", { id: "timer-label" }, this.state.type),
      React.createElement("div", { id: "time-left" }, this.clock()),
      React.createElement("button", { onClick: this.what, id: "start_stop" }, "Pause/Start"),
      React.createElement("button", { onClick: this.reset, id: "reset" }, "reset")),

      React.createElement("audio", {
        id: "beep",
        src: "https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3",
        ref: a => this.audio = a })));




  }}

ReactDOM.render(React.createElement(Clock, null), document.getElementById("root"));