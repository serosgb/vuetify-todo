<template>
    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTodo"
      @keyup.enter="addTodo"
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name : 'FieldAddTask',
  data() {
    return {
      newTaskTitle: ''
    }
  }, 
  methods: {
    ...mapActions(['addTask']),
    addTodo() {
      this.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
    }      
  }      
}
</script>

<style>

</style>