"use client";
//import Image from "next/image";
import styles from "./page.module.css";
import { FieldValue, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function Home() {
  const { register, handleSubmit , reset} = useForm();

  const onSubmit = async (data: FieldValue<JSON>) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Logged in and cookie set");
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
            <form onSubmit={handleSubmit(onSubmit)}  className={styles.form} action="/login" method="post">
            <TextField
              sx={{
                input: { color: "white" },
                label: { color: "white" },
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
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New to the site?</h1>
        </div>
      </div>
    </main>
  );
}
