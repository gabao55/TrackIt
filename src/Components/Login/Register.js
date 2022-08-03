import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/trackit";
import { Brand, Form, Wrapper } from "./FormStyle";
import { ThreeDots } from  'react-loader-spinner';

export default function Register() {
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });
        console.log(form);
    }

    function sendForm(e) {
        e.preventDefault();
        setIsLoading(!isLoading);
        const promise = registerUser(form)

        promise.then(response => {
            navigate('/');
        });

        promise.catch(response => {
            alert("O cadastro deu errado, tente novamente");
            window.location.reload();
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
                    onChange={(e) => {
                        handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={isLoading ? true : false}
                 />
                <input
                    type="password" 
                    placeholder="senha" 
                    name="password"
                    onChange={(e) => {
                        handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={isLoading ? true : false}
                 />
                <input
                    type="text" 
                    placeholder="nome" 
                    name="name"
                    onChange={(e) => {
                        handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={isLoading ? true : false}
                 />
                <input
                    type="url" 
                    placeholder="foto" 
                    name="image"
                    onChange={(e) => {
                        handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={isLoading ? true : false}
                 />
                <button onClick={sendForm}>{ isLoading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : "Cadastrar" }</button>
                <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
            </Form>
        </Wrapper>
    )
}