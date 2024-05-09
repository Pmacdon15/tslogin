"use client";
import { useState, useEffect } from "react";
import { verifyToken } from "../../actions.ts";
import Button from "@mui/material/Button";
import { logout } from "../../actions.ts";

type Prop = {
  params: {
    userEmail: string;
  };
};

export default function Dashboard(props: Prop) {
  const userEmail = props.params.userEmail;
  const decodedUserEmail = decodeURIComponent(userEmail);
  console.log("Attempted User Email ", decodedUserEmail);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  useEffect(() => {
    const AuthorizeUser = async () => {
      try {
        if (await verifyToken(decodedUserEmail)) {
          setAuthenticatedUser(true);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    AuthorizeUser();
  }, [decodedUserEmail]);

  return authenticatedUser ? (
    <div>
      <h1>Welcome </h1>
      <p>Good Day</p>
      <Button
        sx={{
          background: "linear-gradient(to bottom, #5142d4, #6098ca)",
        }}
        variant="contained"
        color="primary"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
