import React from "react";
import { Redirect } from "react-router-dom";

class Default extends React.Component {
  render() {
    return <Redirect to="/" />;
  }
}

export default Default;
