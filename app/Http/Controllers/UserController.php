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
        $user->load('region');
        return response(['createdUser'=>$user], 201);
    }



    function update(Request $request, int $id) {

        if(User::where('email','superuser@example.com')->first()->id===$id && auth()->user()->id!==$id) {
            return response(['message'=>'Only superuser can change itself'], 403);
        }

        $fields = $request->validate([
            'first_name'=>'min: 3 | max: 50',
            'last_name'=>' min:3 | max: 50',
            'phone'=>'unique:users,phone',
            'password'=>'confirmed | min: 5 | max: 255',
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
            if($user->email==='superuser@example.com') {
                return response(['message'=>'It is forbidden to delete superuser'], 403);
            }
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
