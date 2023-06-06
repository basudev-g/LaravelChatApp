import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';

const app = createApp({
    data() {
        return {
            message: '',
            chat: {
                message: [],
                user: [],
                color: [],
            },
            typing: '',
        }
    },

    watch: {
        message() {
            Echo.private(`chat`)
                .whisper('typing', {
                    message: this.message
                });
        }
    },

    methods: {
        send() {
            if (this.message.length !== 0) {
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');
                axios.post('/send', {
                    message: this.message,
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
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
            })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing = 'typing...';
                }else{
                    this.typing = '';
                }
            });
    },
});

import Message from './components/Message.vue';
app.component('message', Message);

app.mount('#app');
