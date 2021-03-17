<template>
  <a :href="url">{{ text }}</a>
</template>

<script>
export default {
    name: 'NavLink',
    props: {
        url: String,
        text: String
    }
}

</script>

<style>

</style>