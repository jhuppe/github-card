import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} /> 
    
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div stule={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company}</div>

     </div>
    </div>
  );
};

let data = [
  { name: "Paul O'Shannessy",
    avatar_url: "https://avatars.githubusercontent.com/u/8445?v=3",
    company: "Facebook"}, 
  { name: "Ben Alpert",
    avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
    company: "Facebook"
  }
]
const CardList = (props) => {
  return (
    <div>
      <Form />
     {props.cards.map(card => <Card {...card} />)}
    </div>
  );
}

class Form extends React.Component {
  state = { userName: ''}
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Event: Form Submit', this.event.target.value)
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
      });
  };
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value})}
          placeholder="Github username" required />
        <button type="submit">Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    cards: [
      {
        name: "Paul O'Shannessy",
        avatar_url: "https://avatars.githubusercontent.com/u/8445?v=3",
        company: "Facebook"
      },
      {
        name: "Sophie Alpert",
        avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
        company: "Facebook"},
    ]
  };

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };
  
  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}


export default App;
