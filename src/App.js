import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import React from 'react';

 

class App extends React.Component{

  constructor(){
    super();
    this.state={
      robots: [],
      searchField : '',
    }
  }

  onInputChange=async(val) => {
    await this.setState({searchField : val})
    console.log(this.state.searchField);
  }

componentDidMount = () => {
  // console.log("Component did mount is running...")
  // await this.setState({robots : robots})
  console.log("Component Did Mount is running");
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        // console.log(users);
        this.setState({robots : users})
      })
}

render(){
  console.log('Render is running...');

  const {robots, searchField} = this.state;

  const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })

  if (!robots.length) {    // robots.length === 0  means we want to run
    return <h1>Loading....</h1>
  }
   
  return (
    <div className="tc">
      <h1>RoboProject</h1>
      <SearchBox onInputChange={this.onInputChange}/> 
      
      <CardList robots={filteredRobots}/>
    </div>
  );
}
}
export default App;
