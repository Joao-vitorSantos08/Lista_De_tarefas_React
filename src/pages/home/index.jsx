import { useState } from "react"
import "./home.css"
import { Link } from "react-router-dom"
import { auth } from "../../service/firebaseConection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Home = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (email === "" && password === "") {
            alert("Preemcha todos os campos")
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/admin", { replace: true })
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda de forma fácil.</span>

            <form className="form" onSubmit={handleLogin}>
                <input value={email} type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)} />

                <input value={password} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Acessar</button>
            </form>
            <Link className="register" to="/register">Não possui uma conta? Cadastra-se</Link>
        </div>
    )
}


export default Home