<template>

    <b-list-group-item tag="article" class="bg-light rounded border mb-5">

        <div class="d-flex mb-3">                
            <b-avatar class="mr-2" size="3rem" :src="message.avatar"></b-avatar>

            <div class="text-left">
                <span class="m-0 font-weight-bold">{{ message.username }}</span><br>
                <span class="small">{{ message.date }}</span>
            </div>
        </div>

        <div class="d-flex-column text-sm-left">
            <p v-if="message.content && !message.attachment">{{ message.content }}</p>
            <p v-else-if="!message.content && message.attachment">
                <img class="mw-100 rounded" :src="message.attachment" :alt="message.attachment"/>
            </p>
            <div v-else>
                <img class="mw-100 rounded" :src="message.attachment" :alt="message.attachment"/>
                <p>{{ message.content }}</p>
            </div>
        </div>
        
        <div class="d-flex justify-content-between border-top pt-1">
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
                <span>{{ message.comments }}</span>
            </div>

            <div class="d-flex align-items-center">
                <router-link class="text-dark mr-1" :to="{ name: 'MessageDetails', params: { id: message.id }}" title="répondre" aria-label="repondre">
                    <b-icon-reply font-scale="1.2"></b-icon-reply>
                </router-link>

                <b-button type="button" class="btn-sm btn-light" v-if="auth" @click="trash(message.id)" aria-label="supprimer">
                    <b-icon-trash></b-icon-trash>
                </b-button>
            </div>
        </div>
        
    </b-list-group-item>

</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
    name: "Messages",
    props: ['message', 'userId', 'isAdmin'],
    computed: {
        ...mapState(['token']),

         auth () {
            if(this.message.userId == this.userId) {
                return true
            }
            return this.isAdmin
        }
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
