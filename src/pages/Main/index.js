import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    }

    this.setState({
      repositories: [ ...repositories, data ],
      newRepo: '',
      loading: false
    });
  }

  render() {
    const { newRepo, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        {loading}
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            { loading ? (
              <FaSpinner color="#fff" size={18} />
             ) : (
              <FaPlus color="#fff" size={18} />
             )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
