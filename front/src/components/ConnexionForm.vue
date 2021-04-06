<template>
  
    <main role="main" class="container">
        
        <b-tabs content-class="mt-3">

            <b-tab title="Connection" active>

                <b-form role="form" @submit="login">
                    <b-form-group>
                        <b-form-input v-model.trim="form.email" type="email" placeholder="email" :state="isEmail" aria-required="true"></b-form-input>
                        <b-form-invalid-feedback :state="isEmail">
                            l'email doit être au format : exemple@email.com
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="isEmail"></b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input v-model.trim="form.password" type="password" placeholder="password" :state="isPass" aria-required="true"></b-form-input>
                        <b-form-invalid-feedback :state="isPass">
                            "lettre et/ou chiffre" 5 caractères min. 
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="isPass"></b-form-valid-feedback>
                    </b-form-group>

                    <b-button class="col-12 col-md-auto" type="submit" variant="primary">Connection</b-button>
                </b-form>
            </b-tab>

            <b-tab title="Incription">

                <b-form role="form" @submit="signup">
                    
                    <b-form-group>
                        <b-form-input v-model.trim="form.email" type="email" placeholder="email" :state="isEmail" aria-required="true"></b-form-input>
                        <b-form-invalid-feedback :state="isEmail">
                            l'email doit être au format : exemple@email.com
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="isEmail"></b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input v-model.trim="form.username" type="text" placeholder="username" :state="isValid" aria-required="true"></b-form-input>
                        <b-form-invalid-feedback :state="isValid">
                            "lettre et/ou chiffre" 5 caractères min.  
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="isValid"></b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input v-model.trim="form.password" type="password" placeholder="password" :state="isPass" aria-required="true"></b-form-input>
                        <b-form-invalid-feedback :state="isPass">
                            "lettre et/ou chiffre" 5 caractères min. 
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="isPass"></b-form-valid-feedback>
                    </b-form-group>

                    <b-button class="col-12 col-md-auto" type="submit" variant="primary">Inscription</b-button>

                </b-form>
            </b-tab>
        </b-tabs>
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
            const isValid  = /^[\w\s]{5,}/i;
            return isValid.test(this.form.username)
        },

        isPass() {
            const pass_valid  = /^[\w]{5,}/i;
            return pass_valid.test(this.form.password)
        }
    },

    methods: {

        login(event) {
            event.preventDefault()
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
