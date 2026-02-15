'use client';

type InsighterAction = 'activate' | 'deactivate' | 'delete';

type InsighterActionModalProps = {
  isOpen: boolean;
  action: InsighterAction;
  insighterName: string;
  staffNotes: string;
  submitError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onStaffNotesChange: (value: string) => void;
};

function getActionLabel(action: InsighterAction): string {
  if (action === 'activate') return 'Activate';
  if (action === 'deactivate') return 'Deactivate';
  return 'Delete';
}

export default function InsighterActionModal({
  isOpen,
  action,
  insighterName,
  staffNotes,
  submitError,
  isSubmitting,
  onClose,
  onSubmit,
  onStaffNotesChange,
}: InsighterActionModalProps) {
  if (!isOpen) {
    return null;
  }

  const actionLabel = getActionLabel(action);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-900">
          {actionLabel} {insighterName}
        </h2>
        <p className="mt-1 text-xs text-slate-500">Add staff notes before submitting this action.</p>

        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="insighter-staff-notes" className="mb-1 block text-xs font-semibold text-slate-700">
              Staff notes
            </label>
            <textarea
              id="insighter-staff-notes"
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
