<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;

use App\Group;
use Illuminate\Http\Request;
use App\Http\Resources\GroupResource;

class GroupController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $group = Group::find(1)->get();
        return response()->json(["groups" => $group->toTree()->toArray(), "groups_flat" => $group->toFlatTree()->toArray()]);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Group $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        return new GroupResource($group);
    }
    
    public function update(Request $request)
    {
        $groups = Group::rebuildTree($request->groups, true);
        return response()->json(["success" => true]);
    }
}