import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthAdminStore = defineStore(
  "AuthAdminStore",
  () => {
    const userInfo = ref({
      token: "",
    });
    const saveToken = (token) => {
      console.log(token);
      userInfo.value.token = token;
    };
    const isAuthenticated = () => {
      return !!userInfo.value.token;
    };

    return {
      userInfo,
      saveToken,
      isAuthenticated,
    };
  },
  {
    persist: true,
  }
);
