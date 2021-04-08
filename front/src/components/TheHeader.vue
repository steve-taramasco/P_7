<template>
    <header class="mb-4" role="banner">

      <b-navbar toggleable="md" type="dark" variant="info">
        
        <b-navbar-brand>
            <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania" width="200">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-end" tag="nav" role="navigation" aria-label="main navigation">
            <b-navbar-nav class="d-flex">
                <li>
                    <router-link exact-active-class="active" class="nav-link font-weight-bold" to="/" aria-label="accueil">
                        <b-icon-house-fill></b-icon-house-fill>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" class="nav-link font-weight-bold" to="/messages" aria-label="messages">
                        <b-icon-envelope-fill></b-icon-envelope-fill>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" class="nav-link" to="/dashboard"  aria-label="profil">
                        <b-avatar class="border" size="sm" :src="avatar"></b-avatar>
                    </router-link>
                </li>
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