marked.setOptions({
  breaks: true });


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: yeah };

    this.updateInput = this.updateInput.bind(this);
  }
  updateInput(event) {
    this.setState({
      input: event.target.value });



  }

  render() {
    return (
      React.createElement("div", { className: "row" },
      React.createElement("div", { id: "Mark", className: "col-6" },
      React.createElement("h1", { id: "title" }, "Editor"),
      React.createElement("textarea", { type: "text", id: "editor", value: this.state.input, onChange: this.updateInput })),

      React.createElement("div", { id: "Mark", className: "col-6" },
      React.createElement("h1", { id: "title" }, "Previewer"),
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(this.state.input) } }))));




  }}


let yeah = `Welcome to my React Markdown Previewer!
=====================================
This is a sub-heading...
------------------------
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));