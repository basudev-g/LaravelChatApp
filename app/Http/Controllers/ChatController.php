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

    public function send(Request $request)
    {
        $user = User::find(Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message, $user));
    }

    public function saveToSession(Request $request) 
    {
        session()->put('chat', $request->chat);
    }

    public function getOldMessages()
    {
        return session('chat');   
    }

    function deleteChatHistory()
    {
        session()->forget('chat');
    }
}
