<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app mobile-breakpoint="768">
            <v-img
            class="pa-4 pt-7"
            src="mountains.jpg"
            :height="dynamicDrawerHeight"
            gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
            >
                <v-avatar size="70" class="mb-2">
                <img
                    src="https://placekitten.com/800/600"
                    size="170"
                    alt="Me"
                >
                </v-avatar>
                <div class="white--text text-subtitle-1 font-weight-bold">
                    Oscar Gtz
                </div>
                <div class="white--text text-subtitle-2">
                    serosgb
                </div>
            </v-img>

            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark
            src="mountains.jpg"
            prominent
            :height="dynamicDrawerHeight"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
                ></v-img>
            </template>

            <v-container class="header-container pq-12">
                <v-row>
                    <v-app-bar-nav-icon
                        @click="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <search />
                </v-row>
                <v-row>
                    <v-app-bar-title class="text-h4 ml-4">
                        {{ $store.state.appTitle }}
                    </v-app-bar-title>
                </v-row>
                <v-row>
                    <live-date-time />
                </v-row>
                <v-row v-if="displaySearchField">
                    <field-add-task />
                </v-row>
            </v-container>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
            <snackbar />
        </v-main>
    </v-app>
</template>

<script>
import Snackbar from '@/components/Shared/Snackbar';
import Search from '@/components/Tools/Search';
import LiveDateTime from '@/components/Tools/LiveDateTime';
import FieldAddTask from '@/components/Todo/FieldAddTask';

export default {
    name: 'App',
    components: {
        Snackbar,
        Search,
        LiveDateTime,
        'field-add-task': FieldAddTask   
    },
    computed: {
        displaySearchField() {
            return this.$route.path === '/';
        },
        dynamicDrawerHeight() {
            return(this.displaySearchField ? 236 : 170)
        }
    },
    data: () => ({
        drawer: null,
        items: [
            { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
            { title: 'About', icon: 'mdi-help-box', to: '/about' },
        ],
    }),
    mounted() {
        this.$store.dispatch('getTasks')
    }
};
</script>

<style lang="sass">
    .header_container
        max-width: none !important
</style>
