<template>
    <v-list  flat class="pt-0">
        <task
          v-for="task in tasksFiltered"
          :key="task.id"
          :task="task" />
    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
import Task from '@/components/Todo/Task';

export default {
    name: 'ListTasks',
    components: {
        Task
    },
    computed: {
        ...mapGetters(['tasksFiltered'])
    },

}
</script>

<style></style>
