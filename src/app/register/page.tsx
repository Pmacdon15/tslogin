"use client";
import styles from "./page.module.css";
import { set, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { signUp } from "../actions.ts";
import {useState , useEffect} from "react";

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [password, setPassword] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(e.target.value !== password ? "Passwords do not match" : "");
  };

  const onSubmit = async (data: { [key: string]: string }) => {
    if (
      await signUp(
        data.email,
        data.first_name,
        data.last_name,
        data.password,
        data.confirm_password
      )
    ) {
      router.push(`/dashboard/${data.email}`);
    } else {
      alert("User not signed up");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <h4>Please register your credentials.</h4>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            InputLabelProps={{
              required: false,
            }}
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
            InputLabelProps={{
              required: false,
            }}
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
            InputLabelProps={{
              required: false,
            }}
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
            onChange={handlePasswordChange}
            InputLabelProps={{
              required: false,
            }}
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
            {...register("confirm_password", { required: true })}
            label="Confirm your Password"
            type="password"
            required={true}
            onChange={handleConfirmPasswordChange}
            error={confirmPasswordError !== ""}
            helperText={
              confirmPasswordError ? "Passwords do not match!!" : ""
            }
            InputLabelProps={{
              required: false,
            }}
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
