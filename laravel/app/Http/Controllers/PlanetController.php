<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Planet;

class PlanetController extends Controller
{
    public function index()
    {
        return response()->json(Planet::paginate(5), 200);
    }

    public function show($id)
    {
        return response()->json(Planet::findOrFail($id), 200);
    }

    public function store(Request $request)
    {
        $planet = Planet::create($request->all());
        return response()->json($planet, 201);
    }

    public function update(Request $request, Planet $planet)
    {
        $planet->update($request->all());
        return response()->json($planet, 200);
    }

    public function delete(Request $request, Planet $planet)
    {
        $planet->delete();
        return response()->json(null, 204);
    }

    public function satellites(Request $request, Planet $planet)
    {
        $satellites = $planet->satellites;
        return response()->json($satellites, 200);
    }
}
