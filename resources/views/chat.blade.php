<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}">
    @vite(['resources/js/app.js'])
    <title>Document</title>
</head>

<body>
    <div class="container my-3" id="app">
        <div class="row">
            <ul class="col-4 offset-4 list-group">
                <li class="list-group-item active" aria-current="true">Chat Room</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
                <input type="text" name="message" placeholder="Type your message here...">
            </ul>
        </div>
    </div>
</body>

</html>