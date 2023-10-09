import React from "react";
import axios from "axios";

import withRouter from "../HOC/WithRouter";
import "./ListUsers.scss";

class ListUsers extends React.Component {
  state = {
    listUsers: [],
  };
  async componentDidMount() {
    let res = await axios.get("https://reqres.in/api/users?page=1");
    this.setState({
      listUsers: res && res.data && res.data.data ? res.data.data : [],
    });
  }
  handleClick = (user) => {
    const { navigate } = this.props.router;
    navigate(`/list-users/${user.id}`);
  };
  render() {
    let { listUsers } = this.state;
    const { location, navigate, params } = this.props.router;
    return (
      <>
        <p>Danh sách người dùng:</p>
        <div className="list">
          {listUsers.map((item, index) => {
            return (
              <div
                className="user"
                key={item.id}
                onClick={() => this.handleClick(item)}
              >
                <p>
                  {index + 1} - {item.first_name} {item.last_name}
                </p>
                <p>Email: {item.email}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default withRouter(ListUsers);
