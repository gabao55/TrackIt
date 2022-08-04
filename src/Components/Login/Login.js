import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { loginUser } from "../Services/trackit";
import { Brand, Form, Wrapper } from "./FormStyle";

export default function Login() {
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { setUserData } = useContext(UserContext);
    
    const navigate = useNavigate();

    function handleForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function sendForm(e) {
        e.preventDefault();
        setIsLoading(true);
        const promise = loginUser(form);

        promise
        .then(response => {
            setUserData(response.data);
            navigate('/hoje');
        })
        .catch(() => {
            alert("O login deu errado, tente novamente");
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
                    onChange={(e) => {
                        handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={isLoading}
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
                    disabled={isLoading}
                 />
                 {isLoading ?
                    <button><ThreeDots color="#FFFFFF" height={40} width={40} /></button> :
                    <button>Entrar</button>
                 }                
                <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    )
}