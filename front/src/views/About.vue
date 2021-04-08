<template>
<main role="main">

    <h1 class="border-bottom bg-white h4 mb-4 p-2 sticky-top">Qui sommes-nous..</h1>

    <section role="region" class="about container">
        <b-card  bg-variant="light" title-tag="h2" class="mb-4">
            <b-card-text>
                Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion.
                Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années.
                Nous étions uniquement 300 il y a 3 ans.
            </b-card-text>

            <b-card-text>
                Pour plus d'informations rendez-vous sur notre
                <b-link class="font-weight-bold text-dark" href="#" title="groupomania.fr" aria-label="consulter notre site web">
                  site web
                </b-link>
            </b-card-text>
        </b-card>
    </section>
  <the-footer></the-footer>
</main>
</template>

<script>
import TheFooter from '../components/TheFooter.vue'
export default {
  components: { TheFooter },
  name: "About"
}
</script>

<style lang="scss" scoped>
.about {
  margin-bottom: 8rem;
}
</style>