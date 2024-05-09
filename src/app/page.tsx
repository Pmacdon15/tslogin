"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { login } from "./actions.ts";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { [key: string]: string }) => {
    if (await login(data.email, data.password)) {
      router.push(`/dashboard/${data.email}`);
    } else {
      alert("User not logged in");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Login</h1>
          <h4>Please verify your credentials.</h4>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
