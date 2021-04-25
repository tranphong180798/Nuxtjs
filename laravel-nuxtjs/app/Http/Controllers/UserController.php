<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function listUser(){
        $listUser=User::orderBy('id','desc')->get();
        return $listUser;
    }

    public  function  store(Request $request){
        $user=new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->age=$request->age;
        $user->street=$request->street;
        $user->company=$request->company;
        $user->password=bcrypt($request->password);
        $user->save();
        return response()->json($user);
    }
    public function edit($id)
    {
        $customer = User::find($id);
        return response()->json($customer);

    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $user->name = $request->get('name');
        $user->age = $request->get('age');
        $user->email = $request->get('email');
        $user->street = $request->get('street');
        $user->company = $request->get('company');

        $user->save();


        return response()->json('Successfully Updated');

    }

    public function destroy($id)
    {
        $customer = User::find($id);
        $customer->delete();

        return response()->json('Successfully Deleted');

    }

}
