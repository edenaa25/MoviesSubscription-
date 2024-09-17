import axios from "axios"

const URL= "http://127.0.0.1:8001/login"

const login = async (username, password) => {
    try {
      const response = await axios.post(URL, { username, password })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage)
      throw new Error(errorMessage) // Throw the error to be caught by the caller (e.g., handleSubmit)
    }
  }

const newUser = async(username, password)=>{
    const {data :message} = await axios.put(URL , { username, password })
    return message
}

export {login , newUser}