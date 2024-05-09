"use client";

import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { signUp } from "../actions.ts";

export default function Register() {
  const router = useRouter();
  const { register } = useForm();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <h4>Please register your credentials.</h4>
        <form action={signUp} className={styles.form}>
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
            required={true}
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
            {...register("first_name", { required: true })}
            label="Enter your first name"
            type="text"
            required={true}
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
            {...register("last_name", { required: true })}
            label="Enter your last name"
            type="text"
            required={true}
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
            required={true}
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
            {...register("confirmPassword", { required: true })}
            label="Confirm your Password"
            type="password"
            required={true}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "green",
              background: "linear-gradient(to bottom, #5142d4, #6098ca)",
            }}
          >
            Register today
          </Button>
        </form>
      </div>
    </main>
  );
}
