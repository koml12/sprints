/**
 * @author mok3112
 * Created: 3/27/18
 */

import React, { Component } from "react";
import axios from "axios";
import {StartButton} from "../Buttons/index";

import "./index.css";

/**
 * List of incomplete tasks associated with a user.
 */
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMounted: false,
        taskList: [
            {
                name: "",
                time: 0,
                completed: false
            }
        ],
        settings: {
            name: "",
            point_hour_ratio: 30,
            daily_high_score: 0,
            total_points: 0
        },
        token: props.token
    };
    this.startTask = this.startTask.bind(this);
    this.checkIfIncomplete = this.checkIfIncomplete.bind(this);
  }

  componentDidMount() {
      axios({
          method: "get",
          url: "http://localhost:8000/sprints/api/tasks/?format=json",
          headers: {
              Authorization: "Token 5811801c73b7a496b671a2b83b10e42b2a4dd2ed"
          }
      }).then(response => {
          const taskList = response.data;
          this.setState({taskList});
          console.log(this.state.taskList);
          debugger;
      });

      axios({
            method: "get",
            url: "http://localhost:8000/sprints/api/settings/1/?format=json",
            headers: {
                Authorization: "Token 5811801c73b7a496b671a2b83b10e42b2a4dd2ed"
            }
        }).then(response => {
            const settings = response.data;
            this.setState(settings);
        });

      this.setState({ isMounted: true });
  }

  componentWillUnmount() {
      this.setState({ isMounted: false });
  }

  startTask() {
      if (this.state.isMounted) {
          this.setState({ clicked: true });
      }
  }

  checkIfIncomplete(complete) {
      return !complete;
  }

  render() {
      const point_hour = this.state.settings.point_hour_ratio;
      if (this.state.isMounted) {
          return (
              <div className="task-list">
                  {this.state.taskList.filter((item) => this.checkIfIncomplete(item.completed)).map(item =>
                      <div className="task-list-item" key={item.id}>
                          <div key={item.id}>
                              <span className="task-name-item"> {item.name} </span>
                              <span className="task-time-item"> {item.time} mins </span>
                              <span className="task-points-item"> {item.time / 60 * point_hour} pts</span>
                          </div>
                          <div className="start-button" key={item.id}>
                              <StartButton task={item.id}/>
                          </div>
                      </div>
                  )
                  }
              </div>
          );
      } else {
          return null;
      }
  }
}

export default TaskList;