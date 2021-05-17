<template>
  <v-app id='inspire'>
    <v-navigation-drawer
      v-model='drawer'
      app
    >
      <v-list shaped>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-btn icon fab>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider light></v-divider>
        <v-list-group
          v-for='item in items'
          :key='item.title'
          :prepend-icon='item.action'
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text='item.title'></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for='child in item.items'
            :key='child.title'
            link
            router
            :to='child.router'
          >
            <v-list-item-content>
              <v-list-item-title v-text='child.title'></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>

      <v-toolbar-title>BACK OFFICE</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator='{ on }'>
          <v-btn class='hidden-sm-and-down' v-on='on'>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click='logout()'>
            <v-list-item-icon>
              <v-icon right>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class='grey lighten-3'>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        id: 1,
        title: 'Machine',
        action: 'mdi-star',
        items: [
          {
            id: 1,
            title: 'Manage Machine',
            action: 'mdi-star-outline',
            router: { name: 'admin-machine' }
          }
        ]
      }
    ]
  }),
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/admin/signin')
    }
  }
}
</script>
