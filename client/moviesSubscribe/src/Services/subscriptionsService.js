import axios from "axios"

const SUBS_URL= "http://127.0.0.1:8000/subscriptions"
const MEMBERS_URL= "http://127.0.0.1:8000/members"

const getAllMembers = async () => {
    try {
      const response = await axios.get(MEMBERS_URL);
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error(error.response?.data?.message || 'get all members failed');
    }
  }


const getMemberSubsById= async(memberId)=>{
    try {
        const response = await axios.get(`${MEMBERS_URL}/subscribe/${memberId}`);
        return response.data;
      } catch (error) {
          console.log(error)
        throw new Error(error.response?.data?.message || 'get member subscriptions failed');
      }
}



const getMemberById = async(memberId)=>{
    try {
        const response = await axios.get(`${MEMBERS_URL}/${memberId}`);
        return response.data;
      } catch (error) {
          console.log(error)
        throw new Error(error.response?.data?.message || 'get member by id failed');
      }
}

const addMember = async(newMemberData)=>{
    try{
        const response = await axios.post(MEMBERS_URL,newMemberData)
        return response.data;
      } catch (error) {
          console.log(error)
          throw new Error(error.response?.data?.message || 'add member to server failed');
      }   
}

const editMember = async(memberId,memberData)=>{
    try{
        const response = await axios.put(`${MEMBERS_URL}/${memberId}`,memberData)
        return response.data
    }catch(error){
        console.log(error)
          throw new Error(error.response?.data?.message || 'edit member to server failed');
    }
}

const deleteMember = async(memberId)=>{
    try{
        const response = await axios.delete(`${MEMBERS_URL}/${memberId}`)
        return response.data
    }catch(error){
        console.log(error)
        throw new Error(error.response?.data?.message || 'delete member to server failed');
    }
}

const addOrUpdateSubscription = async(subId,subData)=>{
    try{
        const response = await axios.put(`${SUBS_URL}/${subId}`,subData)
        return response.data
    }catch(error){
         console.log(error)
          throw new Error(error.response?.data?.message || 'edit or add Subscription to server failed');
    }
}


export {getAllMembers,getMemberSubsById,getMemberById,addMember,editMember,deleteMember,addOrUpdateSubscription}
