"use client";
//import Image from "next/image";
import styles from "./page.module.css";
import { FieldValue, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";


export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();



  const onSubmit = async (data: FieldValue<JSON>) => {
    try {
      if ((data as { password: string; confirmPassword: string }).password !== (data as { password: string; confirmPassword: string }).confirmPassword) {
        console.error("Passwords do not match");
        alert("Passwords do not match");
        return;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // parse the response data
        console.log("User: ", (data as { email: string }).email ," signed up!!"); 
        router.push(`/`); // redirect to the dashboard page
      } else {
        console.error("Issue with sign up. Please try again.");
        //reset();
      }
    } catch (error) {
      console.error("Internal server error: " + error);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <h4>Please register your credentials.</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          //   action="/login"
          //   method="post"
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
            {...register("first_name", { required: true })}
            label="Enter your first name"
            type="text"
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
