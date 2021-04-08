<template>

    <b-form role="form" class="container d-flex flex-wrap justify-content-center">

        <label class="sr-only" for="message">message</label>

        <b-form-input
        id="message"
        type="text"
        aria-label="ecrire un message"
        v-model.trim="message"
        placeholder="Aa"
        class="col-10 col-sm-8 mr-sm-3"
        ></b-form-input>

        <label class="col-2 col-sm-1 p-0 mr-sm-3 label-file" tabindex="0" for="file">
            <b-icon-image font-scale="2.5" title="ajouter une image" aria-label="selectionner un fichier"></b-icon-image>
        </label>

        <input
        id="file"
        class="input-file"
        type="file"
        accept=".jpg, .png, .gif"
        @change="onFileChange"
        />

        <b-button class="h-100 col-sm-2 font-weight-bold" variant="primary" @click="send">Envoyer</b-button>

    </b-form>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "MessageForm",

    data () {
        return {
            message: null,
            file: null
        }
    },

    computed: {
        ...mapState(['token'])
    },

    methods: {
        ...mapActions(['getMessages']),

        send() {
            const input = document.getElementById('file');
            const formData = new FormData();
            this.file && formData.append('image', this.file);
            this.message && formData.append('content', this.message);

            axios.post('http://localhost:3000/api/messages/new', formData,
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => {
                this.message = null,
                this.file = null,
                input.value = '',
                this.getMessages()
            })
            .catch(error => console.log(error));   
        },

        onFileChange(e) {
            let files = e.target.files;
            if (!files.length) return;
            this.file = files[0];
        }
    }
}
</script>

<style scoped>

.label-file {
    cursor: pointer;
    
}
.label-file:hover {
    color: #25a5c4; 
}

.input-file {
    display: none;
}
</style>