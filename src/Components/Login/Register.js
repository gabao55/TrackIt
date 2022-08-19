import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/trackit";
import { Brand, Form, Wrapper } from "./FormStyle";
import { ThreeDots } from  'react-loader-spinner';
import { useForm } from "../Shared/useForm";

export default function Register() {
    const [form, handleForm] = useForm({
        initState: {
            email: "",
            password: "",
            name: "",
            image: ""
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function sendForm(e) {
        e.preventDefault();
        setIsLoading(!isLoading);
        const promise = registerUser(form)

        promise
        .then(() => {
            navigate('/');
        })
        .catch(() => {
            alert("O cadastro deu errado, tente novamente");
            setIsLoading(false);
        });
    }

    return (
        <Wrapper>
            <Brand />
            <Form onSubmit={sendForm}>
                <input
                    type="email" 
                    placeholder="email" 
                    name="email"
                    value={form.email}
                    onChange={handleForm}
                    required
                    disabled={isLoading}
                 />
                <input
                    type="password" 
                    placeholder="senha" 
                    name="password"
                    value={form.password}
                    onChange={handleForm}
                    required
                    disabled={isLoading}
                 />
                <input
                    type="text" 
                    placeholder="nome" 
                    name="name"
                    value={form.name}
                    onChange={handleForm}
                    required
                    disabled={isLoading}
                 />
                <input
                    type="url" 
                    placeholder="foto" 
                    name="image"
                    value={form.image}
                    onChange={handleForm}
                    required
                    disabled={isLoading}
                 />
                 {isLoading ?
                    <button><ThreeDots color="#FFFFFF" height={40} width={40} /></button> :
                    <button onClick={sendForm}>Cadastrar</button>
                 }
                <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
            </Form>
        </Wrapper>
    )
}