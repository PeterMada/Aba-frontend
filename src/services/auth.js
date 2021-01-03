export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
        : {}

const setUser = user =>
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
    if (username === `ababrno` && password === `u0RfvM`) {
        return setUser({
            username: `ababrno`,
            name: `ababrno`,
            email: `aba@ababrno.cz`,
        })
    }

    return false
}

export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

export const logout = callback => {
    setUser({})
    callback()
}