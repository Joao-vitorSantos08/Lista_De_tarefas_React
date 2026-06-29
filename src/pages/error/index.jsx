import "./erro.css"
import { Link } from "react-router-dom"

const Erro = () => {
    return (

        <div class="home-container error-container">
            <div class="error-icon">📝</div>
            <h1>Acesso Restrito</h1>
            <p class="error-message">
                Você não tem login ou não tem uma conta, portanto não pode acessar sua lista de tarefas.
            </p>

            <div class="error-actions">
                <Link to="/">Fazer Login</Link>
                <Link to="/register">Criar uma Conta</Link>

            </div>
        </div>

    )
}


export default Erro