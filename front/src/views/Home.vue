<template>
    <main role="main" class="container">

        <b-card-group deck>
            <b-card no-body bg-variant="primary" text-variant="white">
                <b-card-body>
                    <router-link to="/messages" class="text-white">
                        <h2 class="h4">Message</h2>
                    </router-link>
                </b-card-body>
            </b-card>

            <b-card no-body bg-variant="success">
                <b-card-body>
                    <router-link to="/dashboard" class="text-white">
                        <h2 class="h4">Mon compte</h2>
                    </router-link>
                </b-card-body>
            </b-card>
        </b-card-group>

        <b-card-group deck class="mt-3">
            <b-card no-body bg-variant="warning" text-variant="white">
                <b-card-body>
                    <router-link to="/contact" class="text-dark">
                        <h2 class="h4">Contact</h2>
                    </router-link>
                </b-card-body>
            </b-card>

            <b-card no-body bg-variant="danger" text-variant="white">
                <b-card-body>
                    <router-link to="/about" class="text-white">
                        <h2 class="h4">A propos</h2>
                    </router-link>
                </b-card-body>
            </b-card>
        </b-card-group>

    </main>
</template>

<script>
export default {
  name: 'Home',
}
</script>
