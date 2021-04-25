
export const state = () => ({
  listUser: [],
  loading:false
})

export const getters = {
  isLoading:(state)=>{
    return state.loading;
  }

}
export const mutations = {
  setLoading(state){
    state.loading = !state.loading;
  },
}
export const actions = {
    setLoading(){
      commit('setLoading');
    }
}
