import './bootstrap';
import '../sass/app.scss';
import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
// import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp({
    data() {
        return {
            message: '',
            chat: {
                message: [],
                user: [],
                color: [],
                time: [],
            },
            typing: '',
            numberOfUsers: 0,
        }
    },

    watch: {
        message() {
            Echo.private(`chat`)
                .whisper('typing', {
                    name: this.message
                });
        }
    },

    methods: {
        send() {
            if (this.message.length !== 0) {
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
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
        },

        getTime(){
            let time = new Date;
            
            return time.getHours()+":"+time.getMinutes();
        }
    },

    mounted() {
        Echo.private('chat')
            .listen('.App\\Providers\\ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());
            })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing = 'typing...';
                }else{
                    this.typing = '';
                }
            });

            Echo.join(`chat`)
            .here((users) => {
                this.numberOfUsers = users.length;
                // console.log(users);
            })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toast.success(user.name + ' joined in this chat room!', {
                    duration: 4000,
                });
                // console.log(user.name);
            })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toast.warning(user.name + ' leaved from this chat room!', {
                    duration: 4000,
                })
                // console.log(user.name);
            })
            .error((error) => {
                console.error(error);
            });
    },
});

import Message from './components/Message.vue';
app.component('message', Message);
app.use(ToastPlugin, {
    position: 'top-right',
});

app.mount('#app');
