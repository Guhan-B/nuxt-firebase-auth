import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            token: null,
            tokenExpiration: null,
        },
        actions: {
            authUser(vuexContext, authData) {
                let authEndpoint

                if (authData.isSignIn) {
                    authEndpoint = process.env.signInEndpoint + process.env.firebaseAPIKey
                }
                else {
                    authEndpoint = process.env.signUpEndpoint + process.env.firebaseAPIKey
                }

                return this.$axios.$post(authEndpoint, authData)
                    .then(res => {
                        // adding token to vuex store
                        vuexContext.commit('setToken', {
                            value:res.idToken,
                            expiration:new Date().getTime() + res.expiresIn * 1000
                        })

                        // adding token to local storage
                        localStorage.setItem('token', res.idToken)
                        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn))

                        // adding token to cookie
                        Cookie.set('token',res.idToken)
                        Cookie.set('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            initAuth(vuexContext, req) {
                let token,tokenExpiration
                // loading token from cookie and local storage
                if (req) {
                    if(!req.headers.cookie){
                        return
                    }
                    const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith("token="))
                    const tokenExpirationCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith("tokenExpiration="))
                    if(!tokenCookie){
                        return
                    }
                    token = tokenCookie.split('=')[1]
                    tokenExpiration = tokenExpirationCookie.split('=')[1]
                }
                else {
                    token = localStorage.getItem('token')
                    tokenExpiration = localStorage.getItem('tokenExpiration')
                }

                console.log(new Date().getTime(),tokenExpiration)

                // checking for exisiting token validity
                if (new Date() > +tokenExpiration || !token) {
                    vuexContext.dispatch('logout')
                    return;
                }

                // adding token to vuex store
                vuexContext.commit('setToken', {
                    value:token,
                    expiration: tokenExpiration
                })
            },
            logout(vuexContext){
                vuexContext.commit('clearToken')
                Cookie.remove('token')
                Cookie.remove('tokenExpiration')
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpiration')
            }
        },
        mutations: {
            setToken(state, token) {
                state.token = token.value
                state.tokenExpiration = token.expiration
            },
            clearToken(state) {
                state.token = null
                state.tokenExpiration = null
            }
        },
        getters: {
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore
