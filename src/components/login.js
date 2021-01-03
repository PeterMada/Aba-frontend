import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        handleLogin(this.state)
    }

    render() {
        if (isLoggedIn()) {
            navigate(`/`)
        }

        return (
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Přihlášení</h1>
                <form
                    method="post"
                    onSubmit={event => {
                        this.handleSubmit(event)
                        navigate(`/`)
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <input style={{ padding: '10px 20px', width: '100%' }} type="text" placeholder='Uživatelské jméno' name="username" onChange={this.handleUpdate} />
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <input
                            style={{ padding: '10px 20px', width: '100%' }}
                            type="password"
                            name="password"
                            placeholder='Heslo'
                            onChange={this.handleUpdate}
                        />
                    </div>

                    <input type="submit" value="Přihlásit se" style={{ padding: '10px 20px', margin: '0 0 0 auto', display: 'block' }} />
                </form>
            </div >
        )
    }
}

export default Login