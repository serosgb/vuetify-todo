<template>
    <div>
        <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'blue lighten-5': task.done }"
            class="white"
            :ripple="false"
        >
            <template v-slot:default>
                <v-list-item-action>
                    <v-checkbox
                        :input-value="task.done"
                        color="primary"
                    ></v-checkbox>
                </v-list-item-action>


                <v-list-item-content>
                    <v-list-item-title
                        :class="{
                            'text-decoration-line-through': task.done,
                        }"
                        >{{ task.title }}</v-list-item-title
                    >
                </v-list-item-content>

                <v-list-item-action v-if="task.dueDate" >
                    <v-list-item-action-text>
                        <v-icon small>mdi-calendar</v-icon>
                        {{ task.dueDate | niceDate }}
                    </v-list-item-action-text>
                </v-list-item-action>

                <v-list-item-action>
                    <task-menu :task="task" />
                </v-list-item-action>

                <v-list-item-action v-if="$store.state.sorting">
                    <v-btn
                      color="primary"
                      icon
                      class="handle">
                        <v-icon>mdi-drag-horizontal-variant</v-icon>
                    </v-btn> 
                </v-list-item-action>
            </template>
        </v-list-item>

        <v-divider></v-divider>
    </div>
</template>

<script>
import { format } from 'date-fns';
import { mapActions } from 'vuex';
import TaskMenu from '@/components/Todo/TaskMenu';

export default {
    name: 'Task',
    components: {
        TaskMenu,
    },
    props: ['task'],
    filters: {
        niceDate(value) {
            let parts = value.split('-');
            let dateValue = new Date(parts[0], parts[1] - 1, parts[2])
            return format(dateValue, 'MMM dd, yyyy')
        }
    },
    methods: {
        ...mapActions(['doneTask']),
    },
};
</script>

<style lang="sass">
    .sortable-ghost
        opacity: 0
    .sortable-drag
        box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>