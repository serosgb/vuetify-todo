import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks:  [
      {
        id: 1,
        title: 'Wake Up',
        done: false,
        dueDate: '2021-03-05'
      },
      {
        id: 2,
        title: 'Get bananas',
        done: false,
        dueDate: '2021-03-15'
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
        dueDate: null
      },
      {
        id: 4,
        title: 'Shopping more bananas',
        done: false,
        dueDate: '2021-03-27'
      }
    ],
    snackbar: {
      show: false,
      message: ''
    }
  },
  mutations: {
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };

      state.tasks.push(newTask);
    },
    updateTask(state, payload) {
      let task = state.tasks.filter(tsk => tsk.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(tsk => tsk.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    doneTask(state, id) {
      let task = state.tasks.filter(tsk => tsk.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(tsk => tsk.id !== id);
    },
    showSnackbar(state, message) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false; 
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.message = message;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    }
  },
  actions: {
    addTask({commit}, newTaskTitle) {
      commit('addTask', newTaskTitle);
      commit('showSnackbar', 'Task added!');
    },
    deleteTask({commit}, id) {
      commit('deleteTask', id);
      commit('showSnackbar', 'Task deleted!');
    },
    updateTask({commit}, payload) {
      commit('updateTask', payload);
      commit('showSnackbar', 'Task updated!');
    },
    updateTaskDueDate({commit}, payload){
      commit('updateTaskDueDate', payload);
      commit('showSnackbar', 'Due date updated!');
    }
  },
  modules: {
  }
})
