import React, { Component } from 'react';
import axios from 'axios';
import List from './List';

class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  create() {
    axios
      .post('/api/companies')
      .then(response => response.data)
      .then(company => {
        const companies = this.state.companies;
        companies.push(company);
        this.setState({ companies });
      });
  }

  destroy(id) {
    axios.delete(`/api/companies/${id}`).then(() => {
      let companies = this.state.companies;
      companies = companies.filter(company => company.id !== id);
      this.setState({ companies });
    });
  }

  componentDidMount() {
    axios
      .get('api/companies')
      .then(response => response.data)
      .then(companies => this.setState({ companies }));
  }

  render() {
    const { companies } = this.state;
    const { create, destroy } = this;

    return (
      <div>
        <h1>Acme Companies</h1>
        <button onClick={create}>+</button>
        <List companies={companies} destroy={destroy} />
      </div>
    );
  }
}

export default App;
