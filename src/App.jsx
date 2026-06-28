import "./index.css"
import { BrowserRouter } from "react-router-dom"
import RoutApp from "./routes/routes"

const App = () => {
  return (
    <BrowserRouter>
      <RoutApp/>
    </BrowserRouter>
  )
}


export default App