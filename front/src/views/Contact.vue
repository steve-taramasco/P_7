<template>
  <main role="main">

    <section role="region" class="contact container">
      <b-jumbotron header-tag="h2" header="Contactez-nous !" header-level="5"></b-jumbotron>

      <b-card  bg-variant="light" title="Des idées innoventes ?" title-tag="h3" class="mb-4">
        <b-card-text>
          Nous sommes ravis que vous souhaitiez collaborer avec notre agence.
        </b-card-text>

        <b-card-text>
          Parlez-nous de votre projet
          <b-link class="font-weight-bold text-dark" href="#" title="nous contacter ?">ici</b-link>
        </b-card-text>
      </b-card>

      <b-card  bg-variant="light" title="Un problème rencontré ?" title-tag="h3" class="mb-4">
        <b-card-text>
          Nos équipes s'efforcent de vous repondre dans les plus brefs délais.
        </b-card-text>

        <b-card-text>
          N'hesitez pas à nous remonter tout problème constaté
          <b-link class="font-weight-bold text-dark" href="#" title="nous contacter ?">ici</b-link>
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
  name: "Contact"
}
</script>