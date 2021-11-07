<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Region;

class UserController extends Controller
{
    function create(Request $request) {
        $fields = $request->validate([
            'first_name'=>'required | min: 3 | max: 50',
            'last_name'=>'required | min:3 | max: 50',
            'email'=>'required | unique:users,email',
            'phone'=>'required | unique:users,phone',
            'password'=>'required | confirmed | min: 5 | max: 255',
            'region_id'=>'required | exists:regions,id',
            'address'=>'required | max: 2000',
            'gender'=>'required'
        ]);


        $user = User::create([
            'first_name'=>$fields['first_name'],
            'last_name'=>$fields['last_name'],
            'email'=>$fields['email'],
            'phone'=>$fields['phone'],
            'password'=>bcrypt($fields['password']),
            'region_id'=>$fields['region_id'],
            'gender'=>$fields['gender'],
            'address'=>$fields['address']
        ]);


        return $user;
    }
}
