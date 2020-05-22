import React, { Component } from "react";

export default class Job extends Component {
  render() {
    const {
      id,
      title,
      agency,
      company,
      summary,
      link,
      location,
    } = this.props.job;
    return (
      <div className="advert">
        <div className="jobInfo">
          <p>{agency}</p>
          <a target="_blank" href={link} rel="noopener noreferrer">
            <h3>{title}</h3>
          </a>
          <h4>{company}</h4>
          <h5>{location}</h5>
          <p className="des">{summary}</p>
        </div>
        <div className="response">
          <p>interested?...</p>
          <button onClick={() => this.props.handleResponse(id, "Y")}>
            Yes
          </button>
          <button onClick={() => this.props.handleResponse(id, "N")}>
            No
          </button>
        </div>
      </div>
    );
  }
}
