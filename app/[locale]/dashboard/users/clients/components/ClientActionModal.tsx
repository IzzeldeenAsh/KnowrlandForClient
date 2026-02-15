'use client';

import { ClientAction, ClientRecord } from '../../../types';

type ClientActionModalProps = {
  isOpen: boolean;
  action: ClientAction;
  client: ClientRecord | null;
  staffNotes: string;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onStaffNotesChange: (value: string) => void;
};

export default function ClientActionModal({
  isOpen,
  action,
  client,
  staffNotes,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
  onStaffNotesChange,
}: ClientActionModalProps) {
  if (!isOpen || !client) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          {action === 'deactivate' ? 'Deactivate' : 'Delete'} {client.name}
        </h2>
        <p className="mt-1 text-xs text-slate-500">Add staff notes before submitting this action.</p>

        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="staff-notes" className="mb-1 block text-xs font-semibold text-slate-700">
              Staff notes
            </label>
            <textarea
              id="staff-notes"
              value={staffNotes}
              onChange={(event) => onStaffNotesChange(event.target.value)}
              rows={4}
              placeholder="Type your notes..."
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-xs text-slate-700 shadow-sm outline-none focus:border-blue-400"
            />
          </div>

          {submitError ? <p className="text-xs text-red-600">{submitError}</p> : null}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-8 rounded-md border border-blue-600 bg-blue-600 px-3 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
