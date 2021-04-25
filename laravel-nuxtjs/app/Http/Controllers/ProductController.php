<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function listProduct(){
      $listProduct=Product::orderBy('id','desc')->get();
      return $listProduct;
    }

    public function store(Request $request)
    {
        $product=new Product();
        $product->name=$request->name;
        $product->email=$request->email;
        $product->password =bcrypt($request->password);
        $product->save();
        return response()->json("Save Success!");

    }

    public function edit($id)
    {
        $customer = Product::find($id);
        return response()->json($customer);

    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->name = $request->get('name');
        $product->price = $request->get('price');
        $product->content = $request->get('content');
        $product->country = $request->get('country');
        $product->company = $request->get('company');
        $product->save();

        return response()->json('Successfully Updated');

    }


    public function destroy($id)
    {
        $customer = Product::find($id);
        $customer->delete();

        return response()->json('Successfully Deleted');

    }
}
