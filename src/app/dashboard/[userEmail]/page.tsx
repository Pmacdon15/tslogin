"use client";
import { useState, useEffect } from "react";
import { verifyToken } from "../../actions.ts";

type Prop = {
  params: {
    userEmail: string;
  };
};

export default async function Dashboard(props: Prop) {
  const userEmail = props.params.userEmail;
  const decodedUserEmail = decodeURIComponent(userEmail);
  console.log("Attempted User Email ", decodedUserEmail);
  let authenticatedUser: boolean = false;

  try {
    if (await verifyToken(decodedUserEmail)) {
      authenticatedUser = true;           
    }    
  } catch (error) {
    console.error("Error: ", error);
  }

  return authenticatedUser ? (
    <div>
      <h1>Welcome </h1>
      <p>Good Day</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
