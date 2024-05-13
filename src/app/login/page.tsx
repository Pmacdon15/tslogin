'use client';
import styles from "@/app/login/page.module.css"
import LoginForm from "../forms/login"
import { useRouter } from "next/navigation"
import Button from "@mui/material/Button"

export default function Login() {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1>Login</h1>
                <h4>Please verify your credentials.</h4>
                <LoginForm />
            </div>
            <div className={styles.right}>
                <h1>New to the site?</h1>
                <h4>Easily create an account and start using the site today!!!!</h4>
                <Button
                    onClick={() => {
                        router.push("/register")
                    }}
                    variant="contained"
                    color="primary"
                    sx={{
                        background: "linear-gradient(to bottom, #5142d4, #6098ca)",
                    }}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}