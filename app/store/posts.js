import moment from '~/plugins/moment'

export const state = () => ({
    posts: []
})

export const getters = {
    posts:(state) => store.posts
}

export const mutations = {
    getPost(state,{post}){
        state.posts.push(post)
    },
    updatePost(state,{post}){
        store.posts = state.posts.map((p) => (p.id === post.id ? post : p))
    },
    clearPost(state){
        state.posts = []
    }
}

export const actions = {
    async publishPost({commit},{payload}){
        const user = await this.$axios.$get(`/users/${payload.user.id}.json`)
        const created_at = moment().format()
        payload = {
            created_at,
            ...payload
        }
        const post_id = (await this.$axios.$post(`/posts.json`,payload)).name
        const post = {id: post_id, ...payload, created_at}
        const putData = {id: post_id, ...payload, created_at}
        delete putData.user
        await this.$axios.$put(`/users/${user.id}/posts.json`,[...(user.posts || []),putData])
        commit('addPost',{post})
    }
}