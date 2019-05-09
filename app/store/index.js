import { logicalExpression } from "@babel/types";

export const store = () => ({
    isLoggedIn:false,
    user:null
})

export const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user
}

export const mutations = {
    setUser(state,{user}){
        state.user = user
        state.isLoggedIn = true
    }
}

export const actions = {
    async login({commit},{id}){
        if (id.match(/_|@|\./)) {
            throw new TypeError('invalid username')
        }
        const user = await this.$axios.$get(`/users/${id}.json`)
        console.log(user)
        if(!user.id) throw new Error('invalid error')
        commit('setUser',{user})
    },
    async register({commit},{id}){
        const payload = {}
        payload[id] = {id}
        console.log(id)
        console.log(this.$axios)
        await this.$axios.$patch(`/users.json`,payload).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
        const user = await this.$axios.$get(`/users/${id}.json`)
        if(!user.id) throw new Error('Invalid user')
        commit('setUser',{user})
    }
}