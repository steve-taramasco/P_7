<template>
  <div>

    <header>
      <aside>
        <div class="profil">
          <img class="icon" src="./assets/user.png" alt="icon">
          <p v-if="user">{{ user.username }}</p>
          <p v-else>{{ "inconnu" }}</p>
        </div>
      </aside>

        <h1>Groupomania</h1>

        <NavLink/>

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

header {
  background-color: #f5f5f5f5;
  border-bottom: solid 1px lightgray;
  position: fixed;
  width: -webkit-fill-available;
  top: 0;
  aside {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    height: 100%;
    .profil {
      padding: .5em;
    }
    .icon {
      width: 2em;
    }
    p {
      margin: auto;
    }
  }
}

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
