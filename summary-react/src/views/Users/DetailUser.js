import React from "react";
import axios from "axios";

import withRouter from "../HOC/WithRouter";

class DetailUser extends React.Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    const { params } = this.props.router;
    let id = params.id;
    let res = await axios.get(`https://reqres.in/api/users/${id}`);
    this.setState({
      user: res && res.data && res.data.data ? res.data.data : {},
    });
  }
  render() {
    let { user } = this.state;
    let checkEmpty = Object.keys(user).length === 0;
    const { location, navigate, params } = this.props.router;
    return (
      <>
        <div>Information about this User with id: {params.id}</div>
        {!checkEmpty && (
          <>
            <div className="name">
              User Name: {user.first_name} {user.last_name}
            </div>
            <div>Email: {user.email}</div>
            <div>
              <img src={user.avatar} alt="" />
            </div>
          </>
        )}
      </>
    );
  }
}
export default withRouter(DetailUser);
