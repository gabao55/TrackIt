import { Brand, Form, Wrapper } from "./FormStyle";

export default function Login() {
    return (
        <Wrapper>
            <Brand />
            <Form>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="senha" />
                <button>Entrar</button>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    )
}