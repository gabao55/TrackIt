import { Brand, Form, Wrapper } from "./FormStyle";

export default function Register() {
    return (
        <Wrapper>
            <Brand />
            <Form>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="senha" />
                <input type="text" placeholder="nome" />
                <input type="text" placeholder="foto" />
                <button>Cadastrar</button>
                <p>Já tem uma conta? Faça login!</p>
            </Form>
        </Wrapper>
    )
}