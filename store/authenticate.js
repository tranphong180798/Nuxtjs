export const state =()=> ({
    users: [],
    currentUser: {}
  })

export const mutations= {
    LOGOUT_USER(state) {
      state.currentUser = {}
      window.localStorage.currentUser = JSON.stringify({});
          },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      console.log("GOOD");
      window.localStorage.currentUser = JSON.stringify(user);
          },
    LOAD_USER(user) {
      state.user = user;
      console.log("LOADING");
    },
  }


export const actions = {
  logoutUser({commit}) {
    commit('LOGOUT_USER');
  },
  loginUser({commit}, user) {
    commit('SET_CURRENT_USER', user);
  },
  listUser({commit},user){
    commit('LOAD_USER', user);
  }
}

export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },

    loggedInUser(state) {
      return state.auth.user
    }
  }
