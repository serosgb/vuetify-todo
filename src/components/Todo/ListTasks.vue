<template>
    <v-list  flat class="pt-0">
        <draggable
          v-model="tasks"
          handle=".handle"
          >
            <task
                v-for="task in tasks"
                :key="task.id"
                :task="task" />
        </draggable>
    </v-list>
</template>

<script>
import Draggable from 'vuedraggable';
import { mapGetters } from 'vuex';
import Task from '@/components/Todo/Task';

export default {
    name: 'ListTasks',
    components: {
        Task,
        Draggable
    },
    computed: {
        ...mapGetters(['tasksFiltered']),
        tasks: {
            get(){
                return this.tasksFiltered
            },
            set(value){
                this.$store.commit('setTasks', value)
            }
        }
    }
}
</script>

<style></style>
