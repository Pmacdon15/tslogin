"use client";
import styles from "@/app/login/page.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { login } from "@/app/actions";
import { useActionState } from "react";

const initialState = {
  message: '',
} 

export default function LoginForm() {
    const [state, formAction] = useActionState(login, initialState);
    const { register } = useForm();

    return (
        <form className={styles.form} action={formAction}>
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
                {...register("password", { required: true })}
                label="Enter your Password"
                type="password"
                required={true}
                InputLabelProps={{
                    required: false,
                }}
            />

            <Button
                sx={{
                    background: "linear-gradient(to bottom, #5142d4, #6098ca)",
                }}
                variant="contained"
                type="submit"
            >
                Login
            </Button>
            <p>{state?.message}</p>
        </form>

    )
}