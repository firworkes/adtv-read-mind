import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {
      id: "Modeling Methods",
      children: [
        {
          id: "Classification",
          children: [
            {
              id: "Logistic regression"
            },
            {
              id: "Decision trees"
            },
            {
              id: "Probabilistic neural network"
            },
            {
              id: "Support vector machine",
              children: [{ id: "新增节点111" }, { id: "新增节点222" }]
            }
          ]
        },
        {
          id: "Consensus",
          children: [
            {
              id: "Models diversity",
              children: [
                {
                  id: "Different initializations"
                },
                {
                  id: "Different training sets"
                },
                {
                  id: "Different feature sets"
                }
              ]
            },
            {
              id: "Methods",
              children: [
                {
                  id: "Classifier selection"
                },
                {
                  id: "Classifier fusion"
                }
              ]
            },
            {
              id: "Common",
              children: [
                {
                  id: "Bagging"
                },
                {
                  id: "Boosting"
                },
                {
                  id: "AdaBoost"
                }
              ]
            }
          ]
        },
        {
          id: "Regression",
          children: [
            {
              id: "Multiple linear regression"
            },
            {
              id: "General regression neural network"
            },
            {
              id: "Support vector regression"
            }
          ]
        }
      ]
    }
  },
  mutations: {
    mindData(state, val) {
      state.data.children[0].children.push(val);
      console.log(state.data.children[0].children)
    }
  },
  actions: {
  },
  modules: {
  }
})
