<template>
  <main>
    <header>
      <nav id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/messages">Messages</router-link> |
        <router-link to="/login">Connection</router-link> |
        <router-link to="/signin">Inscription</router-link> |
        <router-link to="/users/me">Mon compte</router-link>
      </nav>
    </header>

    <router-view/>
  </main>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
