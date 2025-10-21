<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Invoice::query()->where('user_id', Auth::id());

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhere('activity_name', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });
        }

        $sortField = $request->input('sort_field', 'submission_date');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSorts = ['submission_date', 'invoice_date', 'activity_name', 'base_amount', 'amount_paid'];
        if (! in_array($sortField, $allowedSorts, true)) {
            $sortField = 'submission_date';
        }

        $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');

        $invoices = $query->paginate($request->integer('per_page', 10));

        return response()->json([
            'data' => $invoices->items(),
            'pagination' => [
                'current_page' => $invoices->currentPage(),
                'last_page' => $invoices->lastPage(),
                'per_page' => $invoices->perPage(),
                'total' => $invoices->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'invoice_number' => ['nullable', 'string', 'max:255', 'unique:invoices,invoice_number'],
            'submission_date' => ['required', 'date'],
            'invoice_date' => ['required', 'date'],
            'activity_name' => ['required', 'string', 'max:255'],
            'base_amount' => ['required', 'numeric', 'min:0'],
            'vat_option' => ['required', Rule::in(['include', 'exclude', 'tanpa'])],
            'amount_paid' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', Rule::in(['Pending', 'Partial', 'Paid', 'Overdue'])],
            'status_note' => ['nullable', 'string'],
            'ope_items' => ['nullable', 'array'],
            'ope_items.*.description' => ['required_with:ope_items', 'string', 'max:255'],
            'ope_items.*.quantity' => ['required_with:ope_items', 'numeric', 'min:0'],
            'ope_items.*.unit_price' => ['required_with:ope_items', 'numeric', 'min:0'],
            'timeline' => ['nullable', 'array'],
            'timeline.*.label' => ['required_with:timeline', 'string', 'max:255'],
            'timeline.*.date' => ['required_with:timeline', 'date'],
            'timeline.*.note' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'payment_link' => ['nullable', 'string', 'max:255'],
        ]);

        $invoice = Invoice::create(array_merge(
            $data,
            [
                'invoice_number' => $data['invoice_number'] ?? $this->generateInvoiceNumber(),
                'amount_paid' => $data['amount_paid'] ?? 0,
                'user_id' => Auth::id(),
            ]
        ));

        return response()->json([
            'message' => 'Invoice created successfully.',
            'data' => $invoice->fresh(),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $invoice = Invoice::where('user_id', Auth::id())->findOrFail($id);

        return response()->json([
            'data' => $invoice,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $invoice = Invoice::where('user_id', Auth::id())->findOrFail($id);

        $data = $request->validate([
            'invoice_number' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('invoices', 'invoice_number')->ignore($invoice->id),
            ],
            'submission_date' => ['sometimes', 'date'],
            'invoice_date' => ['sometimes', 'date'],
            'activity_name' => ['sometimes', 'string', 'max:255'],
            'base_amount' => ['sometimes', 'numeric', 'min:0'],
            'vat_option' => ['sometimes', Rule::in(['include', 'exclude', 'tanpa'])],
            'amount_paid' => ['sometimes', 'numeric', 'min:0'],
            'status' => ['sometimes', Rule::in(['Pending', 'Partial', 'Paid', 'Overdue'])],
            'status_note' => ['nullable', 'string'],
            'ope_items' => ['nullable', 'array'],
            'ope_items.*.description' => ['required_with:ope_items', 'string', 'max:255'],
            'ope_items.*.quantity' => ['required_with:ope_items', 'numeric', 'min:0'],
            'ope_items.*.unit_price' => ['required_with:ope_items', 'numeric', 'min:0'],
            'timeline' => ['nullable', 'array'],
            'timeline.*.label' => ['required_with:timeline', 'string', 'max:255'],
            'timeline.*.date' => ['required_with:timeline', 'date'],
            'timeline.*.note' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'payment_link' => ['nullable', 'string', 'max:255'],
        ]);

        $invoice->update($data);

        return response()->json([
            'message' => 'Invoice updated successfully.',
            'data' => $invoice->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $invoice = Invoice::where('user_id', Auth::id())->findOrFail($id);
        $invoice->delete();

        return response()->json([
            'message' => 'Invoice deleted successfully.',
        ]);
    }

    private function generateInvoiceNumber(): string
    {
        $prefix = 'INV-' . now()->format('Ymd');

        do {
            $candidate = $prefix . '-' . Str::upper(Str::random(4));
        } while (Invoice::where('invoice_number', $candidate)->exists());

        return $candidate;
    }
}
