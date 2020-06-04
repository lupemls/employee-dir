import React, { Component } from "react";
import data from "../data/employees.json";

class Employee extends Component {
  constructor() {
    super();
    this.state = {
      employees: data,
      //value that will be switched between true and false when the sort button is clicked, allowing for ascending and descending sort
      sortAsc: false,
    };
  }

  //filters the employees based on which gender button is clicked
  filterGender(gender) {
    const filtered = data.filter(
      (employee) => employee.gender.toLowerCase() === gender
    );
    this.setState({ employees: filtered });
  }
  noFilter() {
    this.setState({ employees: data });
  }
  sortName() {
      //sorts employees based off of name
    const compare = (a, b) => {
      if(this.state.sortAsc){
        this.setState({sortAsc: false})
      }else {
          this.setState({sortAsc: true})
      }

      const employeesA = a.name.toUpperCase();
      const employeesB = b.name.toUpperCase();

      let comparison = 0;
      if (employeesA > employeesB) {
        comparison = 1;
      } else if (employeesA < employeesB) {
        comparison = -1;
      }

      //reverses order each time sort is clicked
      if(this.state.sortAsc){
          comparison *= -1;
      }
      return comparison;
    }
    // console.log(this.state.sortAsc);
    // console.log(this.state.employees.sort(compare));
    const sorted = this.state.employees.sort(compare);
    this.setState({ employees: sorted });
  }

  render() {
    return (
      <div>
        <h3>Filter by Gender</h3>
        <button onClick={() => this.filterGender("male")}>Male</button>
        <button onClick={() => this.filterGender("female")}>Female</button>
        <button onClick={() => this.noFilter()}>All</button>
        <br />
        <h3>Sort by Name</h3>
        <button onClick={() => this.sortName()}>Sort</button>
        <br />
        <h1>Employees</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Job</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.gender}</td>
                <td>{employee.job}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Employee;
