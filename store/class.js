export const state = () => ({
  bodyClass: ''
})

export const mutations = {
  SetClass (state, bodyClass) {
    console.log("2");
    state.bodyClass = bodyClass
  }
}
