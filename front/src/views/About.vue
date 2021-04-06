<template>
<main>
  <div class="about container">
    <b-jumbotron header="GROUPOMANIA" header-level="5" lead="Qui sommes nous..."></b-jumbotron>

    <b-card  bg-variant="light" title-tag="h2" class="mb-4">
        <b-card-text>
          Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion.
          Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années.
          Nous étions uniquement 300 il y a 3 ans.
        </b-card-text>

        <b-card-text>
          Pour plus d'informations rendez-vous sur notre
          <b-link href="#" title="groupomania.fr">site web</b-link>
        </b-card-text>
      </b-card>
  </div>
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