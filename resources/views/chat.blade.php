<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}">
    @vite(['resources/js/app.js'])
    <title>Document</title>
    <style>
        .list-group {
            overflow-y: scroll;
            height: 300px;
        }
    </style>
</head>

<body>
    <div class="container my-3" id="app">
        <div class="row">
            <div class="col-4 offset-4">
                <p class="bg-primary text-white p-2">Chat Room  <small class="badge badge-pill bg-danger d-inline">@{{ numberOfUsers }}</small></p>
                <div class="badge badge-pill bg-primary">@{{typing}}</div>
                <ul class="list-group" ref="scroll">
                    <message v-for="value,index in chat.message" :key=value.index :color=chat.color[index] :user = chat.user[index] :time=chat.time[index]>
                        @{{value}}
                    </message>
                </ul>
                <input type="text" v-model="message" @keyup.enter="send" class="form-control" placeholder="Type your message here..."><br>
                <a href="" class="btn btn-sm btn-warning" @click.prevent="deleteChatHistory">Delete Chat</a>
            </div>
        </div>
    </div>
</body>
</html>