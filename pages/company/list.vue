<template>
  <div class="bg-gray-300 h-full w-full p-20">
    <h1 class="text-lg font-mono font-light py-4">Lista de empresas</h1>
    <div class="flex flex-col space-y-3">
      <el-table
        :data="companies"
        stripe
        size="mini"
        v-loading="tableloading"
        ref="multipleTable"
      >
        <el-table-column prop="id_company" width="50" label="#" />
        <el-table-column label="Nombre" prop="name" width="200" />
        <el-table-column label="Dirección" prop="direction" min-width="100" />
        <el-table-column label="Telefono" prop="phone_numer" width="100" />
        <el-table-column label="Sitio Web" prop="web_site" width="200" />
        <el-table-column label width="110" align="center">
          <!-- dropdown 1 -->
          <!-- <template slot-scope="scope">
            <el-dropdown trigger="click" szie="mini">
              <el-button icon="el-icon-more" size="mini" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="
                    $router.push(`/company/edit?ref=${scope.row.id}`)
                  "
                >
                  <i class="el-icon-edit-outline"></i> Editar cliente
                </el-dropdown-item> 

                 <el-dropdown-item>
                    <i class="el-icon-notebook-1"></i> Directorio
                </el-dropdown-item> 
                <el-dropdown-item
                  :divided="true"
                  class="text-red-500 font-semibold"
                  @click.native="deleteCompany(scope.row)"
                >
                  <i class="el-icon-delete"></i> Eliminar empresa
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  fetch() {
    const companies = () => {
      return this.$axios.get("/getCompany");
    };

    Promise.all([companies()])
      .then((res) => {
        const [company] = res;
        this.companies = company.data.data;
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
      companies: [],
    };
  },
  methods: {
    deleteCompany({ id_company }) {
      console.log(id_company);
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
                .delete(`/companyDelete/${id_company}`)
                .then((res) => {
                  this.$notify.success({
                    title: "Éxito",
                    message: res.data.message,
                  });
                  this.getAllCompanies();
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
    getAllCompanies() {
      this.$axios.get("/getCompany").then((res) => {
        this.users = res.data.data;
      });
    },
  },
};
</script>