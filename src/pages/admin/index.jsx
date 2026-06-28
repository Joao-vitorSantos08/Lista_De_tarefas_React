import "./admin.css"
import { useState, useEffect } from "react"
import { auth, db } from "../../service/firebaseConection"
import { signOut } from "firebase/auth"
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from "firebase/firestore"

const Admin = () => {

    const [tarefaInput, setTarefaInput] = useState("")
    const [user, setUser] = useState({})


    const [tarefas, setTarefas] = useState([])

    const [editar, setEditar] = useState([])

    useEffect(() => {
        const loadTarefas = async () => {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
            if (userDetail) {

                const data = JSON.parse(userDetail)

                const tarefasRef = collection(db, "tarefas")

                const q = query(tarefasRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })

                    })
                    setTarefas(lista)
                    console.log(lista)
                })
            }

        }
        loadTarefas()
    }, [])

    const hadleRegister = async (e) => {
        e.preventDefault()
        if (tarefaInput === "") {
            alert("Digite sua tarefa")
            return
        }

        if (editar?.id) {
            hadleUpdatTarefa()
            return
        }

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: tarefaInput,
                created: new Date(),
                userUid: user?.uid
            })
            setTarefaInput("")
            console.log("tarefa registrada")
        } catch (error) {
            console.log("Erro: " + error)
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    const editarTarefa = (tarefa) => {
        setTarefaInput(tarefa.tarefa)
        setEditar(tarefa)

    }

    const hadleUpdatTarefa = async () => {
        const docRef = doc(db, "tarefas", editar?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })

        setTarefaInput("")
        setEditar([])
    }

    const deleteTarefa = async (id) => {
        const docRef = doc(db, "tarefas", id)
        deleteDoc(docRef)
    }


    return (

        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={hadleRegister}>
                <textarea value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)} placeholder="Digite sua tarefa..." />
                {Object.keys(editar).length > 0 ? (<button className="btn-register" type="submit">atulizar tarefa</button>) : (<button className="btn-register" type="submit">Registrar tarefa</button>)}
            </form>

            {tarefas.map((tarefa) => (
                <article key={tarefa.id} className="list">
                    <p>{tarefa.tarefa}</p>
                    <div className="btn-list">
                        <button onClick={() => editarTarefa(tarefa)}>Editar</button>
                        <button onClick={() => deleteTarefa(tarefa.id)} className="delete" >Concluir</button>
                    </div>

                </article>

            ))}

            <button className="logout" onClick={logout}>Sair</button>

        </div>
    )
}


export default Admin