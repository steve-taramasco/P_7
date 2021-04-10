<template>
  
    <main>
        <section class="container">
            <b-tabs content-class="mt-3">

                <b-tab :title-link-class="linkClass" title="Connexion" active>
                    <b-form @submit="login">
                        
                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="email" label="email :">
                            <b-form-input id="email" v-model.trim="form.email" type="email" placeholder="adresse email" :state="isEmail" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isEmail">
                                l'email doit être au format : exemple@email.com
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isEmail"></b-form-valid-feedback>
                        </b-form-group>

                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="pass" label="mot de passe :">
                            <b-form-input id="pass" v-model.trim="form.password" type="password" placeholder="mot de passe" :state="isPass" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isPass">
                                "lettre et/ou chiffre" 5 caractères min. 
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isPass"></b-form-valid-feedback>
                        </b-form-group>

                        <b-button class="col-12 col-sm-auto" type="submit" variant="primary">Connexion</b-button>
                    </b-form>
                </b-tab>

                <b-tab :title-link-class="linkClass" title="Incription">
                    <b-form @submit="signup">
                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="email2" label="email :">
                            <b-form-input id="email2" v-model.trim="form.email" type="email" placeholder="adresse email" :state="isEmail" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isEmail">
                                l'email doit être au format : exemple@email.com
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isEmail"></b-form-valid-feedback>
                        </b-form-group>

                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="username" label="username :">
                            <b-form-input id="username" v-model.trim="form.username" type="text" placeholder="nom d'utilisateur" :state="isValid" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isValid">
                                "lettre et/ou chiffre" 5 caractères min.  
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isValid"></b-form-valid-feedback>
                        </b-form-group>

                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="pass2" label="mot de passe :">
                            <b-form-input id="pass2" v-model.trim="form.password" type="password" placeholder="mot de passe" :state="isPass" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isPass">
                                "lettre et/ou chiffre" 5 caractères min. 
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isPass"></b-form-valid-feedback>
                        </b-form-group>

                        <b-form-group label-align-sm="right" label-cols-sm="3" label-for="confirm" label="confirmation mdp :">
                            <b-form-input id="confirm" v-model.trim="form.confirm" type="password" placeholder="confirmation mdp" :state="isConfirm" aria-required="true"></b-form-input>
                            <b-form-invalid-feedback :state="isConfirm">
                                "les deux mdp doivent correspondre." 
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="isConfirm"></b-form-valid-feedback>
                        </b-form-group>

                        <b-button class="col-12 col-sm-auto" type="submit" variant="primary">Inscription</b-button>
                    </b-form>
                </b-tab>

            </b-tabs>
        </section>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    name: "Form",

    data() {
        return {
            form: {
                email: '',
                password: '',
                confirm:'',
                username: ''
            }
        }
    },

    computed: {
        isEmail() {
            const email_valid = /^[\w._-]+@[\w._-]+\.[a-z]{2,6}$/i;
            return email_valid.test(this.form.email)
        },

        isValid() {
            const user_valid = /^[\w\s-]{5,15}$/i;
            return user_valid.test(this.form.username)
        },

        isPass() {
            const pass_valid  = /^[\w]{5,}/i;
            return pass_valid.test(this.form.password)
        },

        isConfirm() {
            const pass_valid  = /^[\w]{5,}/i;
            if (this.form.confirm == this.form.password && pass_valid.test(this.form.confirm)) {
                return true
            }
            return false
        },

        linkClass() {
          return 'text-dark'
        },
    },

    methods: {

        login(event) {
            event.preventDefault()
            if (!this.isEmail || !this.isPass) {
                return
            }
            axios.post('http://localhost:3000/api/users/login', {
                email: this.form.email,
                password: this.form.password
            })
            .then((res) => {
                this.$store.commit('STORE_USER', res.data.user)
                this.$router.push({ name: "Home"});
            })
            .catch(error => this.$store.commit('STORE_USER', error))
        },

        signup(event) {
            event.preventDefault()
            if (!this.isEmail || !this.isValid || !this.isPass || !this.isConfirm) {
                return
            }
            axios.post('http://localhost:3000/api/users/signup', {
                email: this.form.email,
                username: this.form.username,
                password: this.form.password
            })
            .then((res) => {
                this.$store.commit('STORE_USER', res.data.user)
                this.$router.push({ name: "Home"});
            })
            .catch(error => this.$store.commit('STORE_USER', error))
        }
    }
}
</script>
