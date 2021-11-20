<template>
  <div class="bg-gray-300 h-full w-full p-20">
    <h1 class="text-lg font-mono font-light py-4">Nueva empresa</h1>
    <div class="flex flex-col space-y-3">
      <el-form
        :model="companyNewForm"
        :rules="companyNewFormRules"
        status-icon
        @submit.native.prevent="
          submitNewEcharge('companyNewForm', companyNewForm)
        "
        ref="companyNewForm"
      >
        <!-- firstRow -->
        <div class="grid grid-cols-12 gap-4">
          <!-- nombre -->
          <div class="col-span-4">
            <el-form-item
              class="col-span-12"
              label="Introduzca Nombre:"
              prop="name"
            >
              <el-input
                v-model="companyNewForm.name"
                size="small"
                class="w-full"
                placeholder="Nombre"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <!-- Direccion -->
          <div class="col-span-4">
            <el-form-item label="Direccion" prop="direction">
              <el-input
                v-model="companyNewForm.direction"
                size="small"
                placeholder="Direccion"
              >
              </el-input>
            </el-form-item>
          </div>
          <!-- Numero de Telefono -->
          <div class="col-span-4">
            <el-form-item label="Numero de Telefono" prop="phone_numer">
              <el-input
                clearable
                type="number"
                size="small"
                v-model="companyNewForm.phone_numer"
                autocomplete="off"
                placeholder="####-####"
                :v-mask="'####-####'"
              >
              </el-input>
            </el-form-item>
          </div>
          <!-- Web Site -->
          <div class="col-span-4">
            <el-form-item label="Web Site" prop="web_site">
              <el-input
                size="small"
                placeholder="Web"
                v-model="companyNewForm.web_site"
              >
              </el-input>
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
import { inputValidation } from "../../tools/index";
export default {
  fetch() {},
  fetchOnServer: false,
  data() {
    return {
      companyNewForm: {
        name: "",
        direction: "",
        phone_numer: "",
        web_site: "",
      },
      companyNewFormRules: {
        name: inputValidation(true, 5, 50),
        direction: inputValidation(true, 5, 50),
        web_site: inputValidation(true, 5, 50),
      },
    };
  },
  methods: {
    submitNewEcharge(formName, formData) {
      if (formData.phone_numer.length == 8) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return false;
          }
          this.$confirm(
            "¿Estás seguro que deseas guardar esta nueva empresa?",
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
                    .post("/companyPost", {
                      ...formData,
                    })
                    .then((res) => {
                      this.$notify.success({
                        title: "Exito",
                        message: res.data.message,
                      });
                      setTimeout(() => {
                        this.$confirm(
                          "¿Deseas crear una nueva empresa?",
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
                            this.$router.push("/company/list");
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