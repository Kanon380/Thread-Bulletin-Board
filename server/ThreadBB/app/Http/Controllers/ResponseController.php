<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResponseRequest;
use App\Http\Requests\UpdateResponseRequest;
use App\Models\Response;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreResponseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->all();
        Response::create([
            'user_id' => Auth::id(),
            'thread_id' => $params['thread_id'],
            'content' => $params['content'],
        ]);
        return Redirect::route('thread.show', ['id' => $params['thread_id']]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function show(Response $response)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $params = $request->all();
        $response = Response::where('id', $params['response_id'])->with('thread')->first();
        return Inertia::render('Response/Edit', [
            'response' => $response,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateResponseRequest  $request
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $params = $request->all();
        Response::where('id', $params['response_id'])->update(['content' => $params['content']]);
        $response = Response::where('id', $params['response_id'])->first();
        return Redirect::route('thread.show', ['id' => $response['thread_id']]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $params = $request->all();
        Response::where('id', $params['response_id'])->delete();
        return Redirect::route('thread.show', ['id' => $params['thread_id']]);
    }
}
