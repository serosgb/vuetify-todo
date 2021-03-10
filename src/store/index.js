import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

const TASKS_COLLECTION = 'tasks';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks:  [],
    snackbar: {
      show: false,
      message: ''
    },
    sorting: false
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(tsk => tsk.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(tsk => tsk.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      state.tasks = tasks
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
    },
    setSearch(state, value) {
      state.search = value;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    }
  },
  actions: {
    addTask({commit}, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      db.collection(TASKS_COLLECTION).add(newTask).then(() => {

      });
      commit('addTask', newTask);
      commit('showSnackbar', 'Task added!');
    },
    deleteTask({commit}, id) {
      db.collection(TASKS_COLLECTION).doc({ id: id }).delete().then(() => {
        commit('deleteTask', id);
        commit('showSnackbar', 'Task deleted!');
      });         
    },
    updateTaskTitle({commit}, payload) {
      db.collection(TASKS_COLLECTION).doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload);
        commit('showSnackbar', 'Task updated!');
      });      
    },
    updateTaskDueDate({commit}, payload) {
      db.collection(TASKS_COLLECTION).doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload);
        commit('showSnackbar', 'Due date updated!');
      });        

    },
    getTasks({commit}) {
      db.collection(TASKS_COLLECTION).get().then(tasks => {
        commit('setTasks', tasks);
      });
    },
    doneTask({state, commit}, id) {
      let task = state.tasks.filter(tsk => tsk.id === id)[0];
      db.collection(TASKS_COLLECTION).doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      });
    },
    setTasks({commit}, tasks) {
      db.collection(TASKS_COLLECTION).set(tasks);      
      commit('setTasks', tasks);
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      } 

      return state.tasks.filter(
        task => task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  modules: {
  }
})
