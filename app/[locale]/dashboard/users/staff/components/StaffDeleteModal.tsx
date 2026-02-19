'use client';

import type { StaffRecord } from './types';

type StaffDeleteModalProps = {
  isOpen: boolean;
  staff: StaffRecord | null;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function StaffDeleteModal({
  isOpen,
  staff,
  submitError,
  isSubmitting,
  onClose,
  onConfirm,
}: StaffDeleteModalProps) {
  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">Delete staff member</h2>
        <p className="mt-1 text-xs text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{staff.name}</span>?
        </p>

        {submitError ? <p className="mt-3 text-xs text-red-600">{submitError}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="h-8 rounded-md border border-red-600 bg-red-600 px-4 text-xs font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

