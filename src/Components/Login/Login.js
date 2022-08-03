import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { loginUser } from "../Services/trackit";
import { Brand, Form, Wrapper } from "./FormStyle";

export default function Login() {
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState();
    const { setUserData } = useContext(UserContext);
    
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
        const promise = loginUser(form)

        promise.then(response => {
            setUserData(response.data);
            navigate('/hoje');
        });

        promise.catch(response => {
            alert("O login deu errado, tente novamente");
            // TODO: Change this reload for another approach that works
            window.location.reload();
            // setIsLoading(!isLoading);
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
                <button onClick={sendForm}>{ isLoading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : "Entrar" }</button>
                <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    )
}