<template>
  <v-app id="inspire">
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> ITWC </v-list-item-title>
          <v-list-item-subtitle> company </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav class="pt-10">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <!-- <v-list-item link to="/company">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item> -->

        <v-list-group no-action prepend-icon="mdi-home-city" class="pt-5">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Empresa</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/company/list">
            <v-list-item-title>Lista de empresas</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-file-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link to="/company/new">
            <v-list-item-title>Nueva Empresa</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action prepend-icon="mdi-account" class="pt-5">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/users/list">
            <v-list-item-title>Lista de usuarios</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-file-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link to="/users/new">
            <v-list-item-title>Nuevo usuario</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      /* items: [
        { id: 1, title: "Inicio", icon: "mdi-home-outline", to: "/" },
        {
          id: 2,
          title: "Providers",
          icon: "mdi-truck-outline",
          to: "/providers",
        },
        { id: 3, title: "Graphic", icon: "mdi-chart-line", to: "/graphic" },
        {
          id: 4,
          title: "Sctock",
          icon: "mdi-clipboard-check-multiple-outline",
          to: "/stock",
        },
        {
          id: 5,
          title: "Users",
          icon: "mdi-account-supervisor-outline",
          to: "/user",
        },
        {
          id: 6,
          title: "Settings",
          icon: "mdi-cog-outline",
          to: "/settings",
        },
      ], */

      admins: [
        { Management: "mdi-account-multiple-outline" },
        { Settings: "mdi-cog-outline" },
      ],
      cruds: [
        { Create: "mdi-plus-outline" },
        { Read: "mdi-file-outline" },
        { Update: "mdi-update" },
        { Delete: "mdi-delete" },
      ],
    };
  },
};
</script>
