class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "0",
      start: false };

    this.reset = this.reset.bind(this);
    this.formula = this.formula.bind(this);
    this.finish = this.finish.bind(this);
    this.a = "0";
    this.b = "";
  }
  reset() {
    this.setState({
      result: "0",
      start: false });

    this.a = "0";
  }
  formula(e) {
    if (this.state.start == false) {
      if (e == ".") {
        this.setState({
          start: true,
          result: "0." });

        this.a = "0.";
      } else {
        this.setState({
          start: true,
          result: e });

        this.a = e;
      }
    } else {
      if (e >= "0" && e <= "9") {
        this.b = "";
        if (this.a != "0") {
          this.a = this.a.concat(e);
          this.setState({
            result: this.state.result.concat(e) });

        } else {
          this.a = e;
          this.setState({
            result: e });

        }
      }
      if (e == "." && !this.a.includes(".")) {
        if (this.b) {
          this.a = "0.";
          this.setState({
            result: this.state.result.concat(this.a) });

        } else {
          this.a = this.a.concat(".");
          this.setState({
            result: this.state.result.concat(e) });

        }
      }
      if (e == "+" || e == "-" || e == "*" || e == "/") {
        if (this.b) {
          if (e == "-") {
            this.b = this.b.concat("-");
            this.setState({
              result: this.state.result.concat(e) });

          } else
          {
            if (this.b.length == 1) {
              this.b = e;
              this.setState({
                result: this.state.result.slice(0, -1) + e });

            } else
            {
              this.b = e;
              this.setState({
                result: this.state.result.slice(0, -2) + e });

            }
          }
        } else {
          this.a = "";
          this.b = e;
          this.setState({
            result: this.state.result.concat(e) });

        }

      }
    }
  }
  finish() {
    let x = eval(this.state.result);
    let y = x.toString();
    this.setState({
      result: y });

  }
  render() {
    return (
      React.createElement("div", { id: "calc" },
      React.createElement("p", { id: "display" }, this.state.result),
      React.createElement("div", null,
      React.createElement("div", { class: "row" },
      React.createElement("button", { id: "clear", class: "col-6", onClick: this.reset }, "CE"),


      React.createElement("button", { id: "equals", class: "col-6", onClick: this.finish }, "=")),



      React.createElement("div", { class: "row" },
      React.createElement("button", { id: "nine", onClick: () => this.formula("9"), class: "col-3" }, "9"),


      React.createElement("button", { id: "eight", onClick: () => this.formula("8"), class: "col-3" }, "8"),


      React.createElement("button", { id: "seven", onClick: () => this.formula("7"), class: "col-3" }, "7"),


      React.createElement("button", { id: "add", onClick: () => this.formula("+"), class: "col-3" }, "+")),



      React.createElement("div", { class: "row" },
      React.createElement("button", { id: "six", onClick: () => this.formula("6"), class: "col-3" }, "6"),


      React.createElement("button", { id: "five", onClick: () => this.formula("5"), class: "col-3" }, "5"),


      React.createElement("button", { id: "four", onClick: () => this.formula("4"), class: "col-3" }, "4"),


      React.createElement("button", {
        id: "subtract",
        onClick: () => this.formula("-"),
        class: "col-3" }, "-")),




      React.createElement("div", { class: "row" },
      React.createElement("button", { id: "three", onClick: () => this.formula("3"), class: "col-3" }, "3"),


      React.createElement("button", { id: "two", onClick: () => this.formula("2"), class: "col-3" }, "2"),


      React.createElement("button", { onClick: () => this.formula("1"), id: "one", class: "col-3" }, "1"),


      React.createElement("button", {
        id: "multiply",
        onClick: () => this.formula("*"),
        class: "col-3" }, "*")),




      React.createElement("div", { class: "row" },
      React.createElement("button", { id: "zero", onClick: () => this.formula("0"), class: "col-6" }, "0"),


      React.createElement("button", {
        id: "decimal",
        onClick: () => this.formula("."),
        class: "col-3" }, "."),



      React.createElement("button", { id: "divide", onClick: () => this.formula("/"), class: "col-3" }, "/")))));






  }}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));