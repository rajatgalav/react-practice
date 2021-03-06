import React, { Component } from 'react';
import {connect} from 'react-redux';
import { login } from '../redux/actions/loginReducer';
import {extractResponse, responseType, setItem, getItem} from '../utils/helper/index';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      loginData: null,
      inputData: ''
    }
  }
  componentDidMount(){
    console.log('inputData', getItem('inputData'))
    this.getLoginDetails();
  }
  getLoginDetails = async () => {
    const response = await this.props.login();
    extractResponse(response, (type, responseData) => {
      if (type === responseType.success) {
        this.setState({loginData: responseData});
      }
    })
  }
  handleChange = (e) => {
    this.setState({inputData: e.target.value})
  }
  render(){
    const {loginData} = this.state;
    return (
      <>
        <h1>HomeScreen</h1>
        <input onChange={this.handleChange} value={this.state.inputData}/>
        <span>{this.state.inputData}</span>
        <button onClick={()=>{
            setItem('inputData', this.state.inputData)
            this.props.history.push('/page1')
          }} >next Page</button> 
        {
          loginData &&
          <>
          <h4>{loginData.title}</h4>
          <h6>{loginData.body}</h6>
          </>
        }
      </>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    login : () => dispatch(login('https://jsonplaceholder.typicode.com/posts/1')),
  }
}

export default connect(null, mapDispatchToProps)(HomeScreen);