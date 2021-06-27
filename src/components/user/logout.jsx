import { Component } from "react";
import auth from "../../services/authServices";
class Logout extends Component {
  componentDidMount() {
    auth.removelike();
    auth.logout();
    window.location = "/home";
  }
  render() {
    return 0;
  }
}

export default Logout;
