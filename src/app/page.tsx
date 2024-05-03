"use client";
//import Image from "next/image";
import styles from "./page.module.css";
import { FieldValue, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FieldValue<JSON>) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // parse the response data
        console.log("Logged in and cookie set for: ", responseData.userEmail); // access userEmail from the response data
        router.push(`/dashboard/${responseData.userEmail}`); // redirect to the dashboard page
      } else {
        console.error("Invalid credentials");
        reset();
      }
    } catch (error) {
      console.error("Internal server error: " + error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Login</h1>
          <h4>Please verify your credentials.</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            // action="/login"
            // method="post"
          >
            <TextField
              sx={{
                input: { color: "white" },
                label: { color: "white" }, // initial label color
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "white", // focused label color
                  },
                },
                width: "70%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              variant="outlined"
              {...register("email", { required: true })}
              label="Enter your Email"
              type="email"
              
            />
            <TextField
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                width: "70%",
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "white", // focused label color
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              variant="outlined"
              {...register("password", { required: true })}
              label="Enter your Password"
              type="password"
            />
            <Button
              sx={{
                backgroundColor: "green",
                background: "linear-gradient(to bottom, #5142d4, #6098ca)",
              }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New to the site?</h1>
          <h4>Easily create an account and start using the site today!!!!</h4>

          <Button
            variant="contained"
            onClick={() => {
              router.push("/register");
            }}
            sx={{
              backgroundColor: "green",
              background: "linear-gradient(to bottom, #5142d4, #6098ca)",
            }}
          >
            Register today
          </Button>
        </div>
      </div>
    </main>
  );
}
