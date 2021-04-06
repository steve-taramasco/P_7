<template>
    <header class="mb-4" role="banner">

      <b-navbar toggleable="md" type="dark" variant="info" role="navigation" aria-label="main navigation">
        
        <b-navbar-brand tag="h1" class="mb-0">
            <router-link class="navbar-brand" to="/">Groupomania</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-between">
            <b-navbar-nav>
                <router-link exact-active-class="active" class="nav-link font-weight-bold" to="/">Accueil</router-link>
                <router-link active-class="active" class="nav-link font-weight-bold" to="/messages">Messages</router-link>
            </b-navbar-nav>
            <b-navbar-nav>
                <router-link active-class="active" class="nav-link" to="/dashboard">
                    <b-avatar :src="avatar" aria-label="image profil" alt="avatar"></b-avatar>
                </router-link>
            </b-navbar-nav>
        </b-collapse>
        
      </b-navbar>
    </header>
</template>

<script>

export default {
  name: 'TheHeader',
  props: ['avatar']
}
</script>