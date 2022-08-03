import { useNavigate } from "react-router-dom";
import { Brand, Form, Wrapper } from "./FormStyle";

export default function Login() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Brand />
            <Form>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="senha" />
                <button>Entrar</button>
                <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    )
}