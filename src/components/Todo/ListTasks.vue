<template>
    <v-list  flat class="pt-0">
        <task
          v-for="task in tasks"
          :key="task.id"
          :task="task" />
    </v-list>
</template>

<script>
import { mapState } from 'vuex';
import Task from '@/components/Todo/Task';

export default {
    name: 'ListTasks',
    components: {
        Task
    },
    computed: {
        ...mapState(['tasks'])
    },

}
</script>

<style></style>
