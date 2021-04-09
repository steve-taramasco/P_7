<template>
    <main>

        <h1 class="border-bottom bg-white h4 mb-4 p-2 sticky-top">Contactez-nous !</h1>

        <section class="contact container">
            <b-card  bg-variant="light" class="mb-4">
                <b-card-title title-tag="h2" class="h5">
                    Des idées innoventes ?
                </b-card-title>

                <b-card-text>
                    Nous sommes ravis que vous souhaitiez collaborer avec notre agence.
                </b-card-text>

                <b-card-text>
                    Parlez-nous de votre projet
                    <b-link class="font-weight-bold text-dark" href="#" title="nous contacter ?" aria-label="proposer un projet" >ici</b-link>
                </b-card-text>
            </b-card>

            <b-card  bg-variant="light" class="mb-4">
                <b-card-title title-tag="h2" class="h5">
                    Un problème rencontré ?
                </b-card-title>

                <b-card-text>
                    Nos équipes s'efforcent de vous repondre dans les plus brefs délais.
                </b-card-text>

                <b-card-text>
                    N'hesitez pas à nous remonter tout problème constaté
                    <b-link class="font-weight-bold text-dark" href="#" title="nous contacter ?" aria-label="signaler un problème">ici</b-link>
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

<style lang="scss" scoped>
.contact {
  margin-bottom: 8rem;
}
</style>