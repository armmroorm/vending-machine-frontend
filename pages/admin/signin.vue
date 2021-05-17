<template>
  <div id='app'>
    <v-app id='inspire'>
      <v-app id='inspire'>
        <v-main>
          <v-container
            class='fill-height'
            fluid
          >
            <v-row
              align='center'
              justify='center'
            >
              <v-col
                cols='12'
                sm='8'
                md='4'
              >
                <v-card class='elevation-12'>
                  <v-toolbar
                    color='primary'
                    dark
                    flat
                  >
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref='form' v-model='valid'>
                      <v-text-field
                        label='Username'
                        name='username'
                        v-model='username'
                        prepend-icon='mdi-account'
                        type='text'
                        :rules='usernameRules'
                        required
                      ></v-text-field>

                      <v-text-field
                        id='password'
                        label='Password'
                        name='password'
                        v-model='password'
                        prepend-icon='mdi-lock'
                        :rules='passwordRules'
                        type='password'
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='primary' @click='login'>Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import MainServices from '~/services/MainServices'

export default {
  name: 'SingInPage',
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
      valid: true,
      usernameRules: [v => !!v || 'Username is required'],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters'
      ]
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        const payload = {
          username: this.username,
          password: this.password
        }

        try {
          const resp = await this.$auth.loginWith('local', {
            data: payload
          })
          console.log(resp)

          if (resp.data.success) {
            this.$router.push('/admin')
          }

        } catch (err) {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.data.message}`
          })
          this.$router.push('/admin/signin')
        }
      }
    }
  }
}
</script>
