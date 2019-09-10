import axios from "axios";

export const getRequest = async (url, type) => {
  const response = await axios.get(url)
  return {
    types: type,
    payload: response
    }
  }
}

export const postRequest = async (url, type, data) => {
  const response = await axios.post(url, data)
  return {
    types: type,
    payload: response
    }
  };
}
