<template>

    <b-list-group-item tag="article" class="bg-light rounded border mb-5">

        <div class="d-flex mb-3">                
            <b-avatar class="mr-2" size="3rem" :src="message.avatar"></b-avatar>

            <div class="text-sm-left">
                <p class="m-0 font-weight-bold">{{ message.username }}</p>
                <span class="small">{{ message.date }}</span>
            </div>
        </div>

        <div class="d-flex-column text-sm-left">
            <p v-if="message.content && !message.attachment">{{ message.content }}</p>
            <p v-else-if="!message.content && message.attachment">
                <img class="w-100 rounded" :src="message.attachment" :alt="message.attachment"/>
            </p>
            <div v-else>
                <img class="w-100 rounded" :src="message.attachment" :alt="message.attachment"/>
                <p>{{ message.content }}</p>
            </div>
        </div>
        
        <div class="d-flex align-items-center justify-content-between border-top pt-1">
            <div class="d-flex align-items-center">
                <b-button type="button" class="btn-sm btn-light" @click="like(message.id, '1')" aria-label="j'aime">
                    <b-icon-hand-thumbs-up class="mr-1"></b-icon-hand-thumbs-up>
                    <span>{{ message.likes }}</span>
                </b-button>
                
                 <b-button type="button" class="btn-sm btn-light" @click="like(message.id, '-1')" aria-label="j'aime pas">
                    <b-icon-hand-thumbs-down class="mr-1"></b-icon-hand-thumbs-down>
                    <span>{{ message.dislikes }}</span>
                </b-button>

                <b-icon-chat-square class="mr-1 ml-3"></b-icon-chat-square>
                <span>{{ message.comments.length }}</span>
            </div>
        </div>

    </b-list-group-item>

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
