<?php
namespace App\Http\Controllers;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, $courseId)
    {
        $request->validate(['title' => 'required|string']);
        $module = Module::create(['course_id' => $courseId, 'title' => $request->title, 'position' => $request->position ?? 0]);
        return response()->json(['module' => $module], 201);
    }

    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);
        $module->update($request->only('title', 'description', 'position'));
        return response()->json(['module' => $module]);
    }

    public function destroy($id)
    {
        Module::findOrFail($id)->delete();
        return response()->json(['message' => 'Module deleted']);
    }
}
