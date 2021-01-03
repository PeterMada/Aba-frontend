import React from "react"
import { Router } from "@reach/router"
import Login from '../components/login';

const App = () => (
    <>
        <Router>
            <Login path="/app/login" />
        </Router>
    </>
)

export default App