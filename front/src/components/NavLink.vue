<template>
  <b-navbar-nav>
    <router-link exact-active-class="active" class="nav-link" to="/">Accueil</router-link>
    <router-link active-class="active" class="nav-link" to="/messages">Messages</router-link>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'NavLink'
  
}
</script>