<template>
  <div class="home">


    <list-tasks v-if="tasks.length" />

    <no-tasks  v-else />

    <button-done-sorting v-if="$store.state.sorting"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import ListTasks from '@/components/Todo/ListTasks';
import NoTasks from '@/components/Todo/NoTasks';
import ButtonDoneSorting from '@/components/Todo/ButtonDoneSorting';

export default {
  name: 'Todo',
  components: {
    'list-tasks': ListTasks,
    NoTasks,
    ButtonDoneSorting
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