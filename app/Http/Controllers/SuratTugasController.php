<?php

namespace App\Http\Controllers;

use App\Models\SuratTugas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SuratTugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = SuratTugas::query();

        $user = $request->user();

        if (! $user || ! $user->is_admin) {
            $query->where('user_id', Auth::id());
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('letter_number', 'like', "%{$search}%")
                    ->orWhere('activity_name', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        $sortField = $request->input('sort_field', 'submitted_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSorts = ['submitted_at', 'activity_name', 'event_start', 'companion_fee'];
        if (! in_array($sortField, $allowedSorts, true)) {
            $sortField = 'submitted_at';
        }

        $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');

        $suratTugas = $query->paginate($request->integer('per_page', 10));

        return response()->json([
            'data' => $suratTugas->items(),
            'pagination' => [
                'current_page' => $suratTugas->currentPage(),
                'last_page' => $suratTugas->lastPage(),
                'per_page' => $suratTugas->perPage(),
                'total' => $suratTugas->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'submitted_at' => ['required', 'date'],
            'event_start' => ['required', 'date'],
            'event_end' => ['required', 'date', 'after_or_equal:event_start'],
            'activity_name' => ['required', 'string', 'max:255'],
            'activity_type' => ['required', Rule::in(['offline', 'online'])],
            'status' => [
                'required',
                Rule::in(['Draft', 'Pengajuan', 'Persetujuan', 'Selesai', 'Menunggu Persetujuan', 'Disetujui', 'Revisi']),
            ],
            'status_note' => ['nullable', 'string'],
            'pic' => ['nullable', 'string', 'max:255'],
            'companion_name' => ['nullable', 'string', 'max:255'],
            'companion_fee' => ['nullable', 'numeric', 'min:0'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'pics' => ['nullable', 'array'],
            'pics.*.id' => ['nullable', 'string'],
            'pics.*.name' => ['required_with:pics', 'string', 'max:255'],
            'pics.*.role' => ['nullable', 'string', 'max:255'],
            'instructors' => ['nullable', 'array'],
            'instructors.*.name' => ['required_with:instructors', 'string', 'max:255'],
            'instructors.*.fee' => ['required_with:instructors', 'numeric', 'min:0'],
        ]);

        $suratTugas = SuratTugas::create(array_merge(
            $data,
            [
                'letter_number' => $request->input('letter_number'),
                'user_id' => Auth::id(),
            ]
        ));

        return response()->json([
            'message' => 'Surat tugas created successfully.',
            'data' => $suratTugas->fresh(),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $user = $request->user();

        $suratTugas = SuratTugas::query()
            ->when(! $user?->is_admin, fn ($q) => $q->where('user_id', Auth::id()))
            ->findOrFail($id);

        return response()->json([
            'data' => $suratTugas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        $suratTugas = SuratTugas::query()
            ->when(! $user?->is_admin, fn ($q) => $q->where('user_id', Auth::id()))
            ->findOrFail($id);

        $data = $request->validate([
            'submitted_at' => ['sometimes', 'date'],
            'event_start' => ['sometimes', 'date'],
            'event_end' => ['sometimes', 'date', 'after_or_equal:event_start'],
            'activity_name' => ['sometimes', 'string', 'max:255'],
            'activity_type' => ['sometimes', Rule::in(['offline', 'online'])],
            'status' => [
                'sometimes',
                Rule::in(['Draft', 'Pengajuan', 'Persetujuan', 'Selesai', 'Menunggu Persetujuan', 'Disetujui', 'Revisi']),
            ],
            'status_note' => ['nullable', 'string'],
            'pic' => ['nullable', 'string', 'max:255'],
            'companion_name' => ['nullable', 'string', 'max:255'],
            'companion_fee' => ['nullable', 'numeric', 'min:0'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'pics' => ['nullable', 'array'],
            'pics.*.id' => ['nullable', 'string'],
            'pics.*.name' => ['required_with:pics', 'string', 'max:255'],
            'pics.*.role' => ['nullable', 'string', 'max:255'],
            'instructors' => ['nullable', 'array'],
            'instructors.*.name' => ['required_with:instructors', 'string', 'max:255'],
            'instructors.*.fee' => ['required_with:instructors', 'numeric', 'min:0'],
            'letter_number' => ['nullable', 'string', 'max:255'],
        ]);

        $suratTugas->update($data);

        return response()->json([
            'message' => 'Surat tugas updated successfully.',
            'data' => $suratTugas->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $suratTugas = SuratTugas::where('user_id', Auth::id())->findOrFail($id);
        $suratTugas->delete();

        return response()->json([
            'message' => 'Surat tugas deleted successfully.',
        ]);
    }
}
