import axios from "axios";

export async function getRequest(url, type){
  const response = await axios.get(url)
  return {
    type: type,
    payload: response
  }
}

export const postRequest = async (url, type, data) => {
  const response = await axios.post(url, data)
  return {
    types: type,
    payload: response
    }
};
