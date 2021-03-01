<template>
    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name : 'FieldAddTask',
  data() {
    return {
      newTaskTitle: ''
    }
  }, 
  methods: {
    ...mapMutations(['addTodo']),
    addTask() {
      this.addTodo(this.newTaskTitle);
      this.newTaskTitle = '';
    }      
  }      
}
</script>

<style>

</style>