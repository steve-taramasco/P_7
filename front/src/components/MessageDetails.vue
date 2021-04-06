<template>
    <div class="mb-3">

        <b-list-group-item  tag="article" class="bg-light align-items-center">

            <div class="d-flex justify-content-end">
                <time class="">{{ message.date }}</time>
            </div>

            <div class="d-flex align-items-center">
                <div class="d-flex-column w-25">
                    <b-avatar :src="message.avatar"></b-avatar>
                    <p>{{ message.username }}</p>
                </div>

                <div class="d-flex-column w-75">
                    <p v-if="message.content && !message.attachment">{{ message.content }}</p>
                    <p v-else-if="!message.content && message.attachment">
                        <img :src="message.attachment" :alt="message.attachment" width="100" />
                    </p>
                    <div v-else>
                        <img :src="message.attachment" :alt="message.attachment" width="100" />
                        <p>{{ message.content }}</p>
                    </div>
                </div>
            </div>
            
        </b-list-group-item>
        
        <div class="d-flex justify-content-end">
            <span class="small mr-1">commentaires {{ message.comments.length }}</span>
            <span class="small mr-1" @click="like(message.id, '1')">like {{ message.likes }}</span>
            <span class="small mr-1" @click="like(message.id, '-1')">dislike {{ message.dislikes }}</span>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
    name: "MessageDetails",
    props: ['message'],

    computed: {
        ...mapState(['token'])
    },

    methods: {
        ...mapActions(['getMessage']),

            like(id, value) {
            axios.post('http://localhost:3000/api/messages/' + id + '/like',
            {
                value: value
            },
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => this.getMessage(id))
            .catch(error => console.log(error));
        }
    }
}

</script>