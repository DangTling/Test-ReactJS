import React from "react";
import "./listTodos.scss";
import { toast } from "react-toastify";

import AddTodo from "./addTodo";

class listTodos extends React.Component {
  state = {
    listTodos: [
      { id: 1, title: "Reading book" },
      { id: 2, title: "Coding some app" },
      { id: 3, title: "Run in the park" },
    ],
    editTodo: {},
  };
  addTodo = (todo) => {
    this.setState({
      listTodos: [...this.state.listTodos, todo],
    });
    toast.success("Thêm thành công");
  };
  handleDelete = (todo) => {
    let listTodo = this.state.listTodos;
    listTodo = listTodo.filter((item) => item.id !== todo.id);
    this.setState({
      listTodos: listTodo,
    });
    toast.success("Delete Successfull");
  };
  handleOnchange = (e) => {
    let obj = { ...this.state.editTodo };
    obj.title = e.target.value;
    this.setState({
      editTodo: obj,
    });
  };
  handleOnclick = (todo) => {
    let checkEmpty = Object.keys(this.state.editTodo).length === 0;
    let { editTodo, listTodos } = this.state;
    if (!checkEmpty && todo.id == editTodo.id) {
      let index = listTodos.findIndex((item) => item.id === editTodo.id);
      listTodos[index].title = editTodo.title;
      this.setState({
        editTodo: {},
      });
      toast.success("Update successfull");
    } else {
      this.setState({
        editTodo: todo,
      });
    }
  };
  render() {
    const { listTodos, editTodo } = this.state;
    let checkEmpty = Object.keys(editTodo).length === 0;

    return (
      <div className="container">
        <p>Simple Todo App with React</p>

        <AddTodo addTodo={this.addTodo} />
        <div className="listTodo">
          {listTodos &&
            listTodos.length > 0 &&
            listTodos.map((item, index) => {
              return (
                <div className="todoChild" key={item.id}>
                  {!checkEmpty && item.id == editTodo.id ? (
                    <span>
                      {index + 1} -{" "}
                      <input
                        type="text"
                        value={editTodo.title}
                        onChange={(e) => this.handleOnchange(e)}
                      />
                    </span>
                  ) : (
                    <span>
                      {index + 1} - {item.title}
                    </span>
                  )}
                  <button onClick={() => this.handleOnclick(item)}>
                    {!checkEmpty && item.id == editTodo.id ? "Save" : "Edit"}
                  </button>
                  <button onClick={() => this.handleDelete(item)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default listTodos;
