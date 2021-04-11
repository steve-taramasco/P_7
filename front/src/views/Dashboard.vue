<template>
  <main>

    <h1 class="border-bottom bg-white h4 mb-4 p-2 sticky-top">Mon compte</h1>

    <section class="container" v-if="user">
        <b-tabs content-class="mt-3">
            <b-tab :title-link-class="linkClass" title="Mes infos" active>
                <b-container>
                    <b-row class="justify-content-between">

                        <b-col class=" col-12 col-md-4 mb-5">
                            <b-card>
                                <b-card-body>
                                    <b-avatar id="avatar" size="5rem" :src="user.avatar"></b-avatar>
                                </b-card-body>

                                <label for="file" class="label-file" tabindex="0">
                                    <b-icon-person-bounding-box font-scale="2" title="changer l'image" aria-label="changer l'image profil"></b-icon-person-bounding-box>
                                </label>

                                <input
                                id="file"
                                class="input-file"
                                type="file"
                                accept=".jpg, .png, .gif"
                                @change="updateAvatar"
                                />

                            </b-card>
                        </b-col>

                        <b-col class=" col-12 col-md-7">
                            <b-form @submit.prevent="infoValid" @reset.prevent="clear">

                                <b-form-group label-align-sm="right" label-cols-sm="2" label-for="email" label="email :">
                                    <b-form-input id="email" type="email" :value="user.email" :state="isEmail" @input="updateEmail"></b-form-input>
                                </b-form-group>

                                <b-form-group label-align-sm="right" label-cols-sm="2" label-for="username" label="nom :">
                                    <b-form-input id="username" type="text" :value="user.username" :state="isUsername" @input="updateUsername"></b-form-input>
                                </b-form-group>

                                <b-form-group label-align-sm="right" label-cols-sm="2" label-for="bio" label="bio :">
                                    <b-form-textarea id="bio" type="text" :value="user.bio" rows="3" max-rows="6" :state="isBio" @input="updateBio"></b-form-textarea>
                                </b-form-group>

                                <b-button class="col-12 col-md-4 m-1 ml-md-3 font-weight-bold btn-lg" type="reset" variant="danger" aria-label="annuler">Annuler</b-button>
                                <b-button class="col-12 col-md-4 m-1 font-weight-bold btn-lg" type="submit" variant="success" aria-label="appliquer">Appliquer</b-button>
                                
                            </b-form>
                        </b-col>
                    </b-row>
                </b-container>
            </b-tab>

            <b-tab :title-link-class="linkClass" title="Mot de passe">
                <b-form @submit.prevent="passValid">

                    <b-form-group label-align-sm="right" label-cols-sm="5" label-for="pass" label="mot de passe actuel :">
                        <b-form-input id="pass" type="password" v-model.trim="password" :state="isPass" required></b-form-input>
                    </b-form-group>

                    <b-form-group label-align-sm="right" label-cols-sm="5" label-for="pass1" label="nouveau mot de passe :">
                        <b-form-input id="pass1" type="password" v-model.trim="newPass" :state="isNewPass" required></b-form-input>
                    </b-form-group>

                    <b-form-group label-align-sm="right" label-cols-sm="5" label-for="pass2" label="confirmation mot de passe :">
                        <b-form-input id="pass2" type="password" v-model.trim="confirm" :state="isConfirm" required></b-form-input>
                    </b-form-group>

                    <b-button class="col-12 col-md-auto font-weight-bold btn-lg" type="submit" variant="success">Appliquer</b-button>

                </b-form>
            </b-tab>

            <b-tab :title-link-class="linkClass" title="Déconnexion">
                <b-button class="col-12 col-md-5 m-1 font-weight-bold btn-lg" variant="warning" @click="logout">Se déconnecter</b-button>
                <b-button class="col-12 col-md-5 m-1 font-weight-bold btn-lg" variant="danger" @click="deleted">Supprimer mon compte</b-button>
            </b-tab>
        </b-tabs>
    </section>

    <div v-else>
        <loading></loading>
    </div>

  </main>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import axios from 'axios'
import Loading from '../components/Loading.vue';

export default {
  components: { Loading },
    name: "Dashboard",
    data () {
        return {
            file: null,
            password: null,
            newPass: null,
            confirm: null,
            valid: null
        }
    },

    computed: {

        ...mapState(['user', 'token']),

        linkClass() {
          return 'text-dark'
        },
    
        isEmail() {
            const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
            return email_valid.test(this.user.email)
        },

        isUsername() {
            const text_valid = /^[\w\s.',-]{5,}$/i
            return text_valid.test(this.user.username)
        },

        isBio() {
            const text_valid = /^[\w\sÜ-ü,!?-_]{5,}/i;
            return text_valid.test(this.user.bio)
        },

        isPass() {
            const pass_valid  = /^[\w]{5,}/i;
            return pass_valid.test(this.password);
        },

        isNewPass() {
            const pass_valid  = /^[\w]{5,}/i;
            return pass_valid.test(this.newPass);
        },

        isConfirm() {
            const pass_valid  = /^[\w]{5,}/i;
            if (this.newPass == this.confirm && pass_valid.test(this.newPass)) {
                return true
            }
            return false
        }
    },

    methods: { 

        ...mapActions(['getUser', 'clearUser']),

        ...mapMutations([

            'UPDATE_EMAIL',
            'UPDATE_USERNAME',
            'UPDATE_BIO',
            'UPDATE_AVATAR',
            'STORE_USER',
            'STORE_ERROR'
        ]),

        passValid() {
            const pass_valid  = /^[\w]{5,}/i;
            const pass = document.getElementById("pass").value;
            const pass1 = document.getElementById("pass1").value;
            const pass2 = document.getElementById("pass2").value;
            
            if (!pass_valid.test(pass) || !pass_valid.test(pass1) || !pass_valid.test(pass2)) {
                return
            } else if (pass1 != pass2) {
                return
            }
            this.updatePass()
        },

        infoValid() {
            if (!this.isEmail || !this.isUsername || !this.isBio) {
                return
            }
            return this.saveUser();
        },
    
        updateEmail(e) {
            this.UPDATE_EMAIL(e)
        },

        updateUsername(e) {
            this.UPDATE_USERNAME(e)
        },

        updateBio(e) {
            this.UPDATE_BIO(e)
        },

        updateAvatar(e) {
            let files = e.target.files;
            if (!files.length) return;
            this.file = files[0];
            this.UPDATE_AVATAR(files[0]);
        },
    
        updatePass() {
            axios.post('http://localhost:3000/api/users/password',
            {
                password: this.password,
                newPass: this.newPass
            },
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then((res) => this.STORE_USER(res.data.user))
            .catch(error => console.log(error))
        },

        saveUser() {
            const formdata = new FormData();
            formdata.append("email", this.user.email),
            formdata.append("username", this.user.username),
            formdata.append("bio", this.user.bio),
            formdata.append("image", this.file),

            axios.put('http://localhost:3000/api/users/me', formdata,
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then((res) => this.STORE_USER(res.data.user))
            .catch(error => this.STORE_ERROR(error));
        },

        clear() {
            return this.getUser();
        },

        deleted() {
            axios.delete('http://localhost:3000/api/users/me',
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => {
                this.clearUser();
                sessionStorage.removeItem('user_token');
                this.$router.push({ name: 'Connexion' });
            })
            .catch(error => console.log(error))
        },

        logout() {
            this.clearUser();
            sessionStorage.removeItem('user_token');
            this.$router.push({ name: 'Connexion' });
        }
    },

    mounted() {
        this.getUser();
    }
}
</script>

<style lang="scss" scoped>

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