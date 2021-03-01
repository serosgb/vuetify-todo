<template>
  <div class="home">
    <field-add-task />

    <list-tasks v-if="tasks.length" />

    <no-tasks  v-else />

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import FieldAddTask from '@/components/Todo/FieldAddTask';
import ListTasks from '@/components/Todo/ListTasks';
import NoTasks from '@/components/Todo/NoTasks';

export default {
  name: 'Todo',
  components: {
    'field-add-task': FieldAddTask,
    'list-tasks': ListTasks,
    NoTasks
  },
  computed: {
    ...mapState(['tasks'])
  },
  data() {
    return {
    }
  }
}
</script>