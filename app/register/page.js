    "use client";  // Tambahkan ini di baris paling atas

    import { useState } from "react";
    import { useRouter } from "next/navigation";  // Gunakan 'next/navigation' bukan 'next/router'
    import styled from "styled-components";

    export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
        return setError("Passwords do not match");
        }

        setLoading(true);
        try {
        const res = await fetch("http://localhost:5000/api/register", { // Ganti dengan backend Express.js
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
        } else {
            alert("Registration Successful!");
            router.push("/login");
        }
        } catch (err) {
        setLoading(false);
        setError("Failed to connect to server");
        }
    };

    return (
        <Container>
        <FormBox>
            <h2>Create Your Account</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
            <Label>Username</Label>
            <Input type="text" name="username" placeholder="Enter Username" required onChange={handleChange} />

            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter Email" required onChange={handleChange} />

            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter Password" required onChange={handleChange} />

            <Label>Confirm Password</Label>
            <Input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />

            <RegisterButton type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </RegisterButton>
            </Form>
            <Footer>
            Already have an account? <LoginLink href="/login">Login here</LoginLink>
            </Footer>
        </FormBox>
        </Container>
    );
    }

    const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #1a1a1a, #000000);
    `;

    const FormBox = styled.div`
    background: rgba(38, 37, 37, 0.9);
    padding: 35px;
    border-radius: 18px;
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #D50000;
    width: 360px;
    `;

    const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    `;

    const Label = styled.label`
    text-align: left;
    font-size: 14px;
    color: #D50000;
    `;

    const Input = styled.input`
    padding: 12px;
    border: 2px solid #171717;
    border-radius: 10px;
    background: #171717;
    color: #D50000;
    font-size: 16px;
    `;

    const RegisterButton = styled.button`
    padding: 14px;
    background: #d40000;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 15px;
    transition: background 0.3s ease, transform 0.3s ease;
    &:hover {
        background: #ff4d4d;
        transform: translateY(-3px);
    }
    `;

    const Footer = styled.div`
    margin-top: 15px;
    font-size: 13px;
    color: white;
    `;

    const LoginLink = styled.a`
    color: #d40000;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: #ff4d4d;
    }
    `;

    const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    `;
