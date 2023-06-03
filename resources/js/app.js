import './bootstrap';
import '../sass/app.scss'
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
          send(){
              if (this.message.length !== 0) {
                  this.chat.message.push(this.message);
              }
              this.message = '';
          }
      },
});

import Message from './components/Message.vue';
app.component('message', Message);

app.mount('#app');
