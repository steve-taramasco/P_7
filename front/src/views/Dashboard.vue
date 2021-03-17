<template>
    <div v-if="user">
        <p>{{ user.username }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.bio }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['user'])
    },
    methods: {
    }
}
</script>

<style>
</style>