<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Region;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    function readAll(Request $request) {
        return response(['users' => User::with('region')->get()]);
    }


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


        DB::beginTransaction();


        try {
            $user = User::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'email' => $fields['email'],
                'phone' => $fields['phone'],
                'password' => bcrypt($fields['password']),
                'region_id' => $fields['region_id'],
                'gender' => $fields['gender'],
                'address' => $fields['address']
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['message'=>'Something went wrong during creating'], 500);
        }

        return response(['createdUser'=>$user], 201);
    }



    function update(Request $request, int $id) {
        $fields = $request->validate([
            'first_name'=>'min: 3 | max: 50',
            'last_name'=>' min:3 | max: 50',
            'email'=>'unique:users,email',
            'phone'=>'unique:users,phone',
            'password'=>'min: 5 | max: 255',
            'region_id'=>'exists:regions,id',
            'address'=>'max: 2000',
            'gender'=>''
        ]);


        if(isset($fields['password'])) {
            $fields['password'] = bcrypt($fields['password']);
        }

        $user = User::where('id', $id)->first();


        if(!$user) {
            return response(['message'=>'There is no user with such id'], 400);
        }

        $user = $user->fill($fields);

        DB::beginTransaction();
        try {
            $user->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['message'=>'Something went wrong during updating'], 500);
        }
        return response(['updatedUser'=>$user]);
    }


    function delete(int $id) {
        $user = User::where('id', $id)->first();

        if($user) {
            DB::beginTransaction();
            try {
                $user->delete();
                DB::commit();
                return response(['message' => 'User successfully deleted']);
            } catch (\Exception $e) {
                DB::rollBack();
                return response(['message'=>'Something went wrong during deleting'], 500);
            }
        } else {
            return response(['message'=>'There is user with such id'], 400);
        }
    }
}
