import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';

const app = createApp({
    data() {
        return {
            message: '',
            chat: {
                message: [],
            }
        }
    },

    methods: {
        send() {
            if (this.message.length !== 0) {
                this.chat.message.push(this.message);
                axios.post('/send', {
                    message : this.message,
                })
                .then(response => {
                    console.log(response);
                    this.message = '';
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    },

    mounted() {
        Echo.private('chat')
            .listen('.App\\Providers\\ChatEvent', (e) => {
                this.chat.message.push(e.message);
            });
    },
});

import Message from './components/Message.vue';
app.component('message', Message);

app.mount('#app');
