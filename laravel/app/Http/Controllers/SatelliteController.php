<?php

namespace App\Http\Controllers;

use App\Satellite;
use Illuminate\Http\Request;

class SatelliteController extends Controller
{
    public function index()
    {
        return response()->json(Satellite::paginate(5), 200);
    }

    public function show($id)
    {
        return response()->json(Satellite::findOrFail($id), 200);
    }

    public function store(Request $request)
    {
        $satellite = Satellite::create($request->all());
        return response()->json($satellite, 201);
    }

    public function update(Request $request, Satellite $satellite)
    {
        $satellite->update($request->all());
        return response()->json($satellite, 200);
    }

    public function delete(Request $request, Satellite $satellite)
    {
        $satellite->delete();
        return response()->json(null, 204);
    }
}
