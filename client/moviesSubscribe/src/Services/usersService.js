import axios from "axios"

const URL= "http://127.0.0.1:8001/users"

//axios interceptor that automatically adds the token to every request
// axios.interceptors.request.use(config => {
//     const token = sessionStorage.getItem('authToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

  const getAllUsersWithPermission = async () => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error(error.response?.data?.message || 'featch users failed');
    }
  }


const deleteUserInServer = async(userId)=>{
  try {
    const response = await axios.delete(`${URL}/${userId}` );
    return response.data;
  } catch (error) {
      console.log(error)
    throw new Error(error.response?.data?.message || 'delete user failed');
  }
}


const editUserInServer = async(userId,newData)=>{
  try {
    const response = await axios.put(`${URL}/${userId}`, newData)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Edit user failed';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}


const addUserInServer = async(newData)=>{
  try {
    const response = await axios.post(URL, newData)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to add user';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
export {getAllUsersWithPermission , deleteUserInServer , editUserInServer , addUserInServer}