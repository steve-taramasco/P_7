<template>
    <div class="overflow-auto">
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['messages'],
    computed: {

        lists () {
            const items = this.messages;
            return items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
        },

        rows() {
            return this.messages.length
        }
    },

    data() {
        return {
            perPage: 3,
            currentPage: 1
        }
    }
  }
</script>