<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat()
    {
        return view('chat');
    }

    // public function send(Request $request)
    // {
    //     $user = User::findOrFail(Auth::id());
    //     event(new ChatEvent($request->message, $user));
    // }

    public function send()
    {
        $message = "Hello";
        $user = User::findOrFail(Auth::id());
        event(new ChatEvent($message, $user));
    }
}
