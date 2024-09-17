import React, { useState } from "react";

import {
  formatDateToServer,
} from "../../actions/subscriptionsActions";
import {addOrUpdateSubscription} from '../../Services/subscriptionsService'

function AddSubscription({memberId,movies ,getUserSubsFunction}) {
  const [newSub, setNewSub] = useState({ movieId: "", date: ""});

  const handleSubscription = async(event) => {
    event.preventDefault();
    if(!newSub.date || !newSub.movieId){
      alert('Please select a movie and insert a date to add a subscription.');
      return
    }
    try{
      const formatDate = formatDateToServer(newSub.date)
      const res = await addOrUpdateSubscription(memberId,{movieId:newSub.movieId,date:formatDate})
      console.log(res)
      setNewSub({ movieId: "", date: ""})
      getUserSubsFunction() //get updated subscription after adding
    }catch (error) {
      if (error.message === 'Invalid time value') {
        alert("Invalid date format. Please insert the date in dd/mm/yyyy format.");
      } else {
        console.error("Failed to add subscription:", error.message);
        alert(`Failed to add subscription: ${error.message}`);
      }
    }
    
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h3> Add new movie</h3>
      <form onSubmit={handleSubscription}>
        <select className="formMargin"
          value={newSub.movieId}
          onChange={(e) => setNewSub({ ...newSub, movieId: e.target.value })}
        >
        
        <option value="" disabled hidden>select movie</option>
          {movies?.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.Name}
            </option>
          ))}
        </select>{" "}
        <br />
        <input  className="formMargin"
          name="date"
          value={newSub.date}
          onChange={(e) => setNewSub({ ...newSub, date: e.target.value })}
          placeholder="dd/mm/yyyy"
        ></input>{" "}
        <br />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default AddSubscription;
