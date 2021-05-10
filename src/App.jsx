import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [
        { firstName: "Humed", lastName: "Muhammed", age: 24, phone: "12345" },
      ],
    };
  }

  addPerson(person) {
    let people = this.state.people;

    people.push(person);

    this.setState({
      people: people,
    });
  }

  render() {
    return (
      <div className="all-cont">
        <h1>Address Book</h1>
        <div className="body">
          <PeopleList people={this.state.people} />
          <AddPerson
            people={this.state.people}
            addPerson={this.addPerson.bind(this)}
          />
        </div>
      </div>
    );
  }
}

class PeopleList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    let filteredPeople = this.props.people.filter((person) => {
      let fullName =
        person.firstName.toLowerCase() + person.lastName.toLowerCase();
      return fullName.indexOf(this.state.search.toLowerCase()) !== -1;
    });

    return (
      <div className="people-list">
        <div className="search">
          <input
            type="text"
            className="search_input"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder="Enter name"
          />
        </div>
        <ul className="list">
          {filteredPeople.map((person) => {
            return <Person person={person} />;
          })}
        </ul>
      </div>
    );
  }
}

class Person extends React.Component {
  render() {
    return (
      <li style={{ border: "2px solid coral", padding: "10px", margin: "2px" }}>
        <p>
          {this.props.person.firstName} <br />
          {this.props.person.lastName} <br />
          {this.props.person.phone}
        </p>
      </li>
    );
  }
}

class AddPerson extends React.Component {
  componentWillMount() {
    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addPerson(this.state);
  }

  handleChange(data) {
    let state = this.state;
    let name = data.target.name;
    state[name] = data.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className="person-add">
        <form className="add-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-field">
            <label>Name: </label>
            <input
              type="text"
              name="firstName"
              value={this.props.firstname}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-field">
            <label>Lastname: </label>
            <input
              type="text"
              name="lastName"
              value={this.props.lastname}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="form-field">
            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              value={this.props.phone}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
