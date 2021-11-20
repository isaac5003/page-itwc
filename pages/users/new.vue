<template>
  <div class="bg-gray-200 h-full w-full p-20">
    <h1 class="text-lg font-mono font-light py-4">Nuevo usuario</h1>
    <div class="flex flex-col space-y-3">
      <el-form
        :model="userNewForm"
        :rules="userNewFormRules"
        status-icon
        @submit.native.prevent="submitNewUser('userNewForm', userNewForm)"
        ref="userNewForm"
      >
        <!-- firstRow -->
        <div class="grid grid-cols-12 gap-4">
          <!-- nombre -->
          <div class="col-span-4">
            <el-form-item
              class="col-span-12"
              label="Introduzca el nombre:"
              prop="name"
            >
              <el-input
                v-model="userNewForm.name"
                size="small"
                class="w-full"
                placeholder="Nombre"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <!-- Numero de Telefono -->
          <div class="col-span-4">
            <el-form-item label="Numero de Telefono" prop="phone_numer">
              <el-input
                clearable
                type="number"
                size="small"
                v-model="userNewForm.phone_number"
                autocomplete="off"
                placeholder="####-####"
                :v-mask="'####-####'"
                minlength="8"
                maxlength="8"
              >
              </el-input>
            </el-form-item>
          </div>

          <!-- Email -->
          <div class="col-span-4">
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="userNewForm.email"
                size="small"
                placeholder="Email"
              >
              </el-input>
            </el-form-item>
          </div>
          <!-- Email2 -->
          <div class="col-span-4">
            <el-form-item label="Email2" prop="email2">
              <el-input
                size="small"
                placeholder="Email2"
                v-model="userNewForm.email2"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="col-span-4">
            <el-form-item label="Compañia" prop="company_id">
              <el-select
                class="w-full"
                v-model="userNewForm.company_id"
                size="small"
                placeholder="Seleccionar la compañia"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="ct in companiesData"
                  :key="ct.id_company"
                  :label="ct.name"
                  :value="ct.id_company"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex justify-end">
          <el-button type="primary" size="small" native-type="submit"
            >Guardar</el-button
          >
          <el-button size="small" @click="$router.push('/echarges')"
            >Cancelar</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { inputValidation, selectValidation } from "../../tools/index";
export default {
  fetch() {
    const companies = () => {
      return this.$axios.get("/getCompany");
    };

    Promise.all([companies()])
      .then((res) => {
        const [company] = res;
        console.log(company.data.data);
        this.companiesData = company.data.data;
      })
      .catch((err) => {
        this.errorMessage = err.response.data.message;
      })
      .then((alw) => (this.pageloading = false));
  },
  fetchOnServer: false,
  data() {
    return {
      userNewForm: {
        name: "",
        phone_number: "",
        email: "",
        email2: "",
        company_id: "",
      },
      userNewFormRules: {
        name: inputValidation(true, 5, 50),
        email: inputValidation(true, null, null, "email"),
        company_id: selectValidation(true),
      },
      companiesData: [],
    };
  },
  methods: {
    submitNewUser(formName, formData) {
      if (formData.phone_number.length == 8) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return false;
          }
          this.$confirm(
            "¿Estás seguro que deseas guardar este nuevo usuario?",
            "Confirmación",
            {
              confirmButtonText: "Si, guardar",
              cancelButtonText: "Cancelar",
              type: "warning",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "Procesando...";
                  this.$axios
                    .post("/usersPost", {
                      ...formData,
                    })
                    .then((res) => {
                      this.$notify.success({
                        title: "Exito",
                        message: res.data.message,
                      });
                      setTimeout(() => {
                        this.$confirm(
                          "¿Deseas crear un nuevo usuarioa?",
                          "Confirmación",
                          {
                            confirmButtonText: "Si, porfavor",
                            cancelButtonText: "No, gracias",
                            type: "warning",
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                          }
                        )
                          .then(() => {
                            this.$refs[formName].resetFields();
                          })
                          .catch(() => {
                            this.$router.push("/users/list");
                          });
                      }, 1000);
                    })
                    .catch((err) => {
                      instance.confirmButtonLoading = false;
                      instance.confirmButtonText = "Si, guardar";
                      this.$notify.error({
                        title: "Error",
                        dangerouslyUseHTMLString: true,
                        message: parseErrors(err.response.data.message),
                      });
                    })
                    .then((alw) => {
                      instance.confirmButtonLoading = false;
                      instance.confirmButtonText = "Si, guardar";
                      done();
                    });
                } else {
                  done();
                }
              },
            }
          );
        });
      } else {
        this.$notify.error({
          title: "Error",
          message: "Numero de telefono tiene que ser de 8 digitos",
        });
      }
    },
  },
};
</script>