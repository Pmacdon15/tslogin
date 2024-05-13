
"use client";
import styles from "@/app/register/page.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { signUp } from "../actions.ts";

import {useState , useActionState} from "react";
const initialState = {
  message: '',
}

export default function Signup() {
  const { register,} = useForm();
  const [state, formAction] = useActionState(signUp, initialState);

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

  return (
    <form action={formAction} className={styles.form}>
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
          confirmPasswordError ? (
            <span style={{ color: "#8B0000" }}>Passwords do not match!!</span>
          ) : (
            ""
          )
        }
        InputLabelProps={{
          required: false,
        }}

      />
      <div>
        <p>{state?.message}</p>
      </div>

      <Button
        variant="contained"
        type="submit"
        sx={{
          background: "linear-gradient(to bottom, #5142d4, #6098ca)", marginBottom: "20px"
        }}
      >
        Register today
      </Button>
    </form>
  );
}