import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: sessionStorage.getItem('token'),
    }),
    actions: {
        clearToken() {
            this.token = null;
        },
        getToken() {
            return this.token;
        }
    },
})
