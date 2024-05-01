"use client";
import { useState, useEffect } from "react";

type Prop = {
  params: {
    userEmail: string;
  };
};

export default function Dashboard(props: Prop) {
  const userEmail = props.params.userEmail;
  const decodedUserEmail = decodeURIComponent(userEmail);
  console.log("Attempted User Email ", decodedUserEmail);
  const [user, setUser] = useState<string>();

  // fetch the user data from the server

  useEffect(() => {
    try {
      fetch(`/auth/${decodedUserEmail}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            console.log(data);
            setUser(data.userEmail);
          } else {
            console.log("User not authenticated");
          }
        });
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [decodedUserEmail]);

  return user ? (
    <div>
      <h1>Welcome </h1>
      <p>Good Day</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
