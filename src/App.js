import React, { Component } from "react";
import "./App.css";
import Header from "./JobWidget/Header";
import Job from "./JobWidget/Job";
import axios from "axios";

class App extends Component {
  state = {
    loading: false,
    jobs: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://oe9tdngv19.execute-api.eu-west-1.amazonaws.com/dev")
      .then((res) => {
        console.log(res.data);
        this.setState({ jobs: res.data, loading: false });
      });
  }

  putJob = (job) => {
    axios.put(
      "https://oe9tdngv19.execute-api.eu-west-1.amazonaws.com/dev",
      job
    );
  };

  handleResponse = (id, r) => {
    this.setState({
      jobs: this.state.jobs.map((job) => {
        if (job.id === id) {
          job.reviewed = "Y";
          job.interested = r;
          this.putJob(job);
        }
        return job;
      }),
    });
  };

  toBeReviewed() {
    return [...this.state.jobs.filter((job) => job.reviewed !== "Y")];
  }

  getRandomJob() {
    const toBeReviewed = this.toBeReviewed();
    const idPosition = Math.floor(Math.random() * toBeReviewed.length);
    const newId = toBeReviewed[idPosition].id;
    const randomJob = [
      ...this.state.jobs.filter((jobs) => jobs.id === newId),
    ];
    return randomJob[0];
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="body">
          {this.state.loading ? (
            "Loading..."
          ) : this.toBeReviewed().length !== 0 ? (
            <Job
              job={this.getRandomJob()}
              handleResponse={this.handleResponse}
            />
          ) : (
            <p className="no-jobs">No jobs to review...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
