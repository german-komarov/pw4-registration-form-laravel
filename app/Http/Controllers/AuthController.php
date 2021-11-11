<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {

        $fields = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user) {
            return response(['message'=>'Email does not exist'], 401);
        }

        if(!Hash::check($fields['password'], $user->password)) {
            return response(['message'=>'Wrong password'], 401);
        }
        $token = $user->createToken('super_secret_key_that_is_taken_from_env_variables')->plainTextToken;;
        return response(['token'=>$token], 200);
    }


    public function logout() {
        auth()->user()->tokens()->delete();

        return [
            'message'=>'Logged out'
        ];
    }
}
