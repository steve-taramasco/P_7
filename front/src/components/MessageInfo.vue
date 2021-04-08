<template>
     <div class="d-flex justify-content-end">
        <span class="small mr-1">commentaires {{ comments }}</span>
        <span class="small mr-1" @click="like(id, '1')">like {{ likes }}</span>
        <span class="small mr-1" @click="like(id, '-1')">dislike {{ dislikes }}</span>
        <span class="small mr-1" @click="trash(id)" v-if="isAdmin">supprimer</span>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
    name: 'InfoMessage',
    props: ['comments', 'id', 'likes', 'dislikes'],
    
    computed: {
        ...mapState(['token', 'isAdmin'])
    },

    methods: {

        ...mapActions(['getMessages']),

        like(id, value) {
            axios.post('http://localhost:3000/api/messages/' + id + '/like', { value: value },
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => this.getMessages())
            .catch(error => console.log(error));
        },

        trash(id) {
            axios.delete('http://localhost:3000/api/messages/' + id,
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => this.getMessages())
            .catch(error => console.log(error));
        }
    }
}
</script>