const sounds = {
  "Q": ["https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", "Heater-1"],
  "W": ["https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", "Heater-2"],
  "E": ["https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", "Heater-3"],
  "A": ["https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", "Kick-N-Hat"],
  "S": ["https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", "RP4-Kick"],
  "D": ["https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", "Punchy-Kick"],
  "Z": ["https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", "Chord-1"],
  "X": ["https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", "Chord-2"],
  "C": ["https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", "Chord-3"] };


class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "" };


    this.choose = this.choose.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    document.addEventListener("keydown", e => {
      console.log(e.key.toUpperCase());
      this.choose(e.key.toUpperCase());
    });
  }

  choose(event) {
    let desc = sounds[event][1];
    let sound = sounds[event][0];
    this.setState({
      display: desc });

    this[event].play();
  }

  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("p", { id: "display" }, this.state.display),
      React.createElement("div", null,
      React.createElement("div", { class: "row" },
      React.createElement("button", { class: "col-4 drum-pad", id: "heater", onClick: () => this.choose("Q") }, React.createElement("audio", { id: "Q", src: sounds["Q"][0], class: "clip", ref: a => this.Q = a }), "Q"),
      React.createElement("button", { class: "col-4 drum-pad", id: "heater2", onClick: () => this.choose("W") }, React.createElement("audio", { id: "W", src: sounds["W"][0], class: "clip", ref: a => this.W = a }), "W"),
      React.createElement("button", { class: "col-4 drum-pad", id: "heater3", onClick: () => this.choose("E") }, React.createElement("audio", { id: "E", src: sounds["E"][0], class: "clip", ref: a => this.E = a }), "E")),

      React.createElement("div", { class: "row" },
      React.createElement("button", { class: "col-4 drum-pad", id: "kickhat", onClick: () => this.choose("A") }, React.createElement("audio", { id: "A", src: sounds["A"][0], class: "clip", ref: a => this.A = a }), "A"),
      React.createElement("button", { class: "col-4 drum-pad", id: "rp4kick", onClick: () => this.choose("S") }, React.createElement("audio", { id: "S", src: sounds["S"][0], class: "clip", ref: a => this.S = a }), "S"),
      React.createElement("button", { class: "col-4 drum-pad", id: "puncykick", onClick: () => this.choose("D") }, React.createElement("audio", { id: "D", src: sounds["D"][0], class: "clip", ref: a => this.D = a }), "D")),

      React.createElement("div", { class: "row" },
      React.createElement("button", { class: "col-4 drum-pad", id: "chord1", onClick: () => this.choose("Z") }, React.createElement("audio", { id: "Z", src: sounds["Z"][0], class: "clip", ref: a => this.Z = a }), "Z"),
      React.createElement("button", { class: "col-4 drum-pad", id: "chord2", onClick: () => this.choose("X") }, React.createElement("audio", { id: "X", src: sounds["X"][0], class: "clip", ref: a => this.X = a }), "X"),
      React.createElement("button", { class: "col-4 drum-pad", id: "chord3", onClick: () => this.choose("C") }, React.createElement("audio", { id: "C", src: sounds["C"][0], class: "clip", ref: a => this.C = a }), "C")))));





  }}

ReactDOM.render(React.createElement(Drum, null), document.getElementById("root"));