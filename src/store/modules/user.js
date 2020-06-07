const state={
    userName:"unknow"
};
const getters={ 
    getUserName: (state) => {
    return state.userName;
    }
};
const actions={
    setUserName(context,name){
        context.commit("setUserName",name);
        console.log('action');console.log('action');
    }
};
const mutations={
    setUserName(state,name){
        state.userName=name;
        console.log('mutactions');
    }
};

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}