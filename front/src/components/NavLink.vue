<template>
        <nav>
          <router-link :to="{ name: 'Home'}">Home</router-link> | 
          <router-link :to="{ name: 'Signup'}">Inscription</router-link> | 
          <router-link :to="{ name: 'Login'}">Connection</router-link> | 
          <!-- <router-link :to="{ name: 'User'}">Dashboard</router-link> |  -->
          <router-link :to="{ name: 'Posts'}">Posts</router-link>
        </nav>
</template>

<script>
export default {
  name: 'NavLink'
}
</script> 