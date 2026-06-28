import { useState, useEffect } from "react"
import { auth } from "../service/firebaseConection"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"

const Private = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [signed, setsigned] = useState(false)


    useEffect(() => {
        const checkLogi = async () => {
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setLoading(false)
                    setsigned(true)
                } else {
                    setLoading(false)
                    setsigned(false)
                }
            })

            return () => unsub()
        }
        
        checkLogi()
    }, [])

    if (loading) {
        return (
            <div>

            </div>
        )
    }

    if (!signed) {
        return <Navigate to="/" />
    }


    return children
}

export default Private