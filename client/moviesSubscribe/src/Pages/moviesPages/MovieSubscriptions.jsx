import React, { useState, useEffect, memo } from "react";
import { getSubscriptionsByMovieId } from "../../Services/moviesService";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function MovieSubscriptions({ movieId }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getSubscriptionsByMovieId(movieId);
        setSubs(res);
      } catch (error) {
        console.error("Get subscriptions failed:", error.message);
      }
    };

    fetchSubscriptions();
  }, [movieId]);

  return (
    <div className="padding border">
      <u>subscriptions watched:</u>
      <br />
      <ul>
        {subs.length > 0 ? (
          subs.map((sub, index) => {
            return (
              <li key={index}>
                <Link to={`../subscriptions/${sub.MemberId}`}>
                  {sub.MemberName}
                </Link>
                , {formatDate(sub.Date)}
              </li>
            );
          })
        ) : (
          <p>There are no subscriptions to the movie</p>
        )}
      </ul>
    </div>
  );
}

export default memo(MovieSubscriptions);
