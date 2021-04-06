<template>
  <div id="app">
    <Header :avatar="user.avatar"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from './components/Header'

export default {
  components: {
    Header
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    ...mapActions(['getUser'])
  },

  mounted() {
    this.getUser()
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
