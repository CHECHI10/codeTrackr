import ProblemRow from './ProblemRow.jsx';
import useApp from '../../customHook/useApp.js';
import Button from '../Utils/Button.jsx';
import EmptyState from '../Utils/EmptyState.jsx';

function TableSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}

function ProblemTable() {
  const {
    problemsLoading,
    currentProblems,
    error,
    refreshData,
    setActiveModal,
    MODALS
  } = useApp();

  if (problemsLoading) return <TableSkeleton />;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-100">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm font-medium">{error}</p>
          <Button variant="outline" onClick={() => refreshData()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (currentProblems.length === 0) {
    return (
      <EmptyState
        title="No problems found"
        description="Add your first problem or adjust the filters to bring existing problems back into view."
        actionLabel="Add Problem"
        onAction={() => setActiveModal(MODALS.ADD_PROBLEM)}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Problem</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Revisions</th>
              <th className="px-4 py-3">Last Solved</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {currentProblems.map((problem) => (
              <ProblemRow key={problem._id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProblemTable;
