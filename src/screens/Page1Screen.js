import React from 'react';
import {setItem, getItem} from '../utils/helper/index';

class Page1Screen extends React.Component{
	componentDidMount(){
    console.log('inputData', getItem('inputData'))
  }
	render(){
		let inputData = getItem('inputData')
		return(
			<div>
			<span>hello</span>
			{
				inputData &&
				<span>{inputData}</span>
			}
			<button onClick={()=>this.props.history.push('/')}>goback</button>
			</div>
		)
	}
}

export default Page1Screen;