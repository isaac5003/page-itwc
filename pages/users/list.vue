<template>
  <div class="bg-gray-200 h-full w-full p-20">
    <h1 class="text-lg font-mono font-light py-4">Lista de usuarios</h1>
    <div class="flex flex-col space-y-3">
      <el-table
        :data="users"
        stripe
        size="mini"
        v-loading="tableloading"
        ref="multipleTable"
      >
        <el-table-column prop="id_user" width="50" label="#" />
        <el-table-column label="Nombre" prop="name" width="200" />
        <el-table-column label="Telefono" prop="phone_number" width="100" />
        <el-table-column label="Correo" prop="email" min-width="100" />
        <el-table-column label="Email 2" prop="email2" width="200" />
        <el-table-column label width="110" align="center">
          <!-- dropdown 1 -->
          <template slot-scope="scope">
            <el-dropdown trigger="click" szie="mini">
              <el-button icon="el-icon-more" size="mini" />
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item
                  @click.native="
                    $router.push(`/users/edit?ref=${scope.row.id}`)
                  "
                >
                  <i class="el-icon-edit-outline"></i> Editar cliente
                </el-dropdown-item> -->

                <!-- <el-dropdown-item>
                    <i class="el-icon-notebook-1"></i> Directorio
                </el-dropdown-item> -->
                <el-dropdown-item
                  :divided="true"
                  class="text-red-500 font-semibold"
                  @click.native="deleteUser(scope.row)"
                >
                  <i class="el-icon-delete"></i> Eliminar cliente
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  fetch() {
    const users = () => {
      return this.$axios.get("/getUsers");
    };

    Promise.all([users()])
      .then((res) => {
        const [users] = res;
        this.users = users.data.data;
      })
      .catch((err) => {
        this.errorMessage = err.response.data.message;
      })
      .then((alw) => (this.pageloading = false));
  },
  fetchOnServer: false,
  data() {
    return {
      tableloading: false,
      users: [],
    };
  },
  methods: {
    deleteUser({ id_user }) {
      console.log(id_user);
      this.$confirm(
        `¿Estás seguro que deseas eliminar este usuario?`,
        "Confirmación",
        {
          confirmButtonText: `Si, eliminar`,
          cancelButtonText: "Cancelar",
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "Procesando...";
              this.$axios
                .delete(`/userDelete/${id_user}`)
                .then((res) => {
                  this.$notify.success({
                    title: "Éxito",
                    message: res.data.message,
                  });
                  this.getAllUsers();
                })
                .catch((err) => {
                  this.$notify.error({
                    title: "Error",
                    dangerouslyUseHTMLString: true,
                    message: parseErrors(err.response.data.message),
                  });
                })
                .then((alw) => {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = `Si, eliminar`;
                  done();
                });
            }
            done();
          },
        }
      );
    },
    getAllUsers() {
      this.$axios.get("/getUsers").then((res) => {
        this.users = res.data.data;
      });
    },
  },
};
</script>