import axios from "axios";
import { getLocalStorage } from "../storage"

const apiMiddleware = store => next => action => {
	if(typeof action.method !== "undefined" && action.method==="POST" && typeof action.url !== "undefined" && action.url !== ""){
		axios.post(action.url, action.data, headerConfig)
	    .then(response =>{
			return next({
				type: action.type,
				resData: response
			});
	    })
	    .catch(err => {
	        return next({
				type: action.type,
				resData: err
			});
	    });
	}
	else if(typeof action.method !== "undefined" && action.method==="DELETE" && typeof action.url !== "undefined" && action.url !== ""){
		axios.delete(action.url, headerConfig)
	    .then(response =>{
			return next({
				type: action.type,
				resData: response
			});
	    })
	    .catch(err => {
	        return next({
				type: action.type,
				resData: err
			});
	    });

	}
	else if(typeof action.url !== "undefined" && action.url !== "") {
		axios.get(action.url, headerConfig)
	    .then(response =>{
			return next({
				type: action.type,
				resData: response
			});
	    })
	    .catch(err => {
	        return next({
				type: action.type,
				resData: err
			});
	    });
	}	
	//Skip axios for passing data from child component to parent component
	else{
        return next({
			type: action.type,
			resData: action.data
		});
	}
};

export default apiMiddleware;