<template>
  <div>

    <header>
        <h1>Groupomania</h1>
        <NavLink/>
        <aside>
          <div>
            <p v-if="user">{{ user.username }}</p>
            <p v-else>{{ "inconnu" }}</p>
          </div>
        </aside>
    </header>

    <router-view/>

  </div>
</template>

<script>
import NavLink from './components/NavLink.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavLink
  },

  computed: {
  ...mapState(['user'])
  },
  methods: {
    ...mapActions(['storeUser'])
  },
  mounted () {
    this.storeUser()
  }
}
</script>


<style lang="scss">

a {
    text-decoration: none;
    color: inherit;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
