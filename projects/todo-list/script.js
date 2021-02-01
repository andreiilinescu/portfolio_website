class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      t: "",
      i: 0 };

    this.add = this.add.bind(this);
    this.rem = this.rem.bind(this);
    this.rem_all = this.rem_all.bind(this);
  }

  add(e) {
    e.preventDefault();
    if (/\S/.test(this.state.t)) {
      let i = this.state.i;
      let text = this.state.t;
      let x = { text: text, id: i };
      this.state.items.push(x);
      this.setState({ t: "", i: this.state.i + 1 });
      console.log(this.state.items);
    }
  }
  rem(e) {
    let index = this.state.items.findIndex(x => x.id == e.target.value);
    let new_items = this.state.items;
    new_items.splice(index, 1);
    this.setState({ items: new_items });
  }
  rem_all() {
    this.setState({ items: [] });
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "todo" }, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, /*#__PURE__*/React.createElement("span", { class: "rnbw" }, "TODO"), " LIST"), /*#__PURE__*/
      React.createElement("div", { class: "frm" }, /*#__PURE__*/
      React.createElement("form", { onSubmit: this.add }, /*#__PURE__*/
      React.createElement("input", { type: "text", value: this.state.t, onChange: a => this.setState({ t: a.target.value }), maxlength: "30" }), /*#__PURE__*/
      React.createElement("button", { type: "submit", id: "submit" }, "Submit")), /*#__PURE__*/

      React.createElement("button", { id: "clear", onClick: this.rem_all }, "Clear")), /*#__PURE__*/

      React.createElement("ul", null,
      this.state.items.map(x => {return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("li", null, x.text), /*#__PURE__*/React.createElement("button", { onClick: this.rem, value: x.id, className: "del_btn" }, "X"));}))));




  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));