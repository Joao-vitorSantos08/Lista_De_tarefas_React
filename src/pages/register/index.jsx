import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../service/firebaseConection"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (email === "" && password === "") {
            alert("Preecha todos os campos")
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                navigate("/admin", {replace:true})
        } catch (error) {
            console.log( "Erro ao fazer o cadastro" + error)
        }

    }

    return (
        <div className="home-container">
            <h1>Cadastra-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className="form" onSubmit={handleRegister}>
                <input value={email} type="email" placeholder="Digite seu email..." onChange={(e) => setEmail(e.target.value)} />

                <input value={password} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Cadastrar</button>
            </form>
            <Link className="register" to="/">Já possui sua conta? faça Login</Link>
        </div>
    )
}


export default Register