import React from "react";
import { toast } from "react-toastify";

class addTodo extends React.Component {
  state = {
    title: "",
  };

  handleOnchange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  handleOnclick = () => {
    if (!this.state.title) {
      toast.error("Chưa điền thông tin");
      return;
    }
    let todo = {
      id: Math.floor(Math.random() * 1000),
      title: this.state.title,
    };
    this.props.addTodo(todo);

    this.setState({
      title: "",
    });
  };

  render() {
    return (
      <div className="addTodo">
        <input
          type="text"
          value={this.state.title}
          onChange={(e) => this.handleOnchange(e)}
        />
        <button onClick={this.handleOnclick}>Add</button>
      </div>
    );
  }
}
export default addTodo;
