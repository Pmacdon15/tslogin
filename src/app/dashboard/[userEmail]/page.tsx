'use client';
import { useState, useEffect } from "react";

type Prop = {
  userEmail: string;
};

export default function Dashboard (props: Prop) {
  
  const userEmail = props.userEmail;
  const [user, setUser] = useState<JSON>();

  // fetch the user data from the server
  //Todo: Add the fetch call here

  return (
    user ? (
      <div>
        <h1>Welcome </h1>
        <p>Good Day</p>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
}

    
