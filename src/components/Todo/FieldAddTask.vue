<template>
    <v-text-field
      v-model="newTaskTitle"
      @keyup.enter="addTodo"
      class="field-add-task pa-3"
      outlined
      placeholder="Add Task"
      hide-details
      clearable
    >
    <template v-slot:append>
      <v-fade-transition leave-absolute>
        <v-icon
          @click="addTodo"
          :disabled="taskTitleInvalid"
          >mdi-plus</v-icon>
      </v-fade-transition>
    </template>    
    </v-text-field>
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
  computed: {
      taskTitleInvalid() {
          return !this.newTaskTitle || (this.newTaskTitle.trim().length === 0)
      }
  },
  methods: {
    ...mapActions(['addTask']),
    addTodo() {
      if (!this.taskTitleInvalid) {
        this.addTask(this.newTaskTitle);
        this.newTaskTitle = '';
      }
    }      
  }      
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(19, 82, 123, .5) !important

</style>>

</style>