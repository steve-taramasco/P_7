<template>
    <header class="mb-4">
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-brand>
            <router-link class="navbar-brand" to="/">Groupomania</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-between">
          <NavLink />
          <router-link active-class="active" class="nav-link" to="/dashboard">
            <b-avatar id="avatar" :src="avatar"></b-avatar>
          </router-link>
        </b-collapse>
        
      </b-navbar>
    </header>
</template>

<script>
import NavLink from './NavLink'

export default {
  name: 'Header',
  props: ['avatar'],
  components: {
    NavLink
  }
}

</script>