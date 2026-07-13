import useApp from '../../customHook/useApp';
import Badge from '../Utils/Badge';
import Button from '../Utils/Button';
import { DifficultyBadge } from '../Utils/DifficultyBadge';
import {
  EditIcon,
  ExternalLinkIcon,
  RefreshIcon,
  StatusIcon,
  TrashIcon
} from '../Utils/Icons';

function ProblemRow({ problem }) {
  const {
    setUpdateStatusProblem,
    setActiveModal,
    MODALS,
    formatTimeAgo,
    handleOpenEdit,
    handleDeleteProblem,
    handleAddRevision,
    actionLoading
  } = useApp();

  return (
    <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-950">
      <td className="px-4 py-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => {
            setUpdateStatusProblem(problem);
            setActiveModal(MODALS.UPDATE_STATUS);
          }}
        >
          <StatusIcon status={problem.status} />
          <Badge variant={problem.status}>{problem.status}</Badge>
        </button>
      </td>

      <td className="px-4 py-4">
        <div className="max-w-xs">
          <p className="truncate text-sm font-semibold text-neutral-950 dark:text-neutral-50">{problem.title}</p>
          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
            {problem.timeComplexity || 'Time not set'} / {problem.spaceComplexity || 'Space not set'}
          </p>
        </div>
      </td>

      <td className="px-4 py-4">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>

      <td className="px-4 py-4 text-sm text-neutral-700 dark:text-neutral-300">{problem.platform}</td>
      <td className="px-4 py-4 text-sm text-neutral-700 dark:text-neutral-300">{problem.topic || 'General'}</td>
      <td className="px-4 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">{problem.revisionCount || 0}</td>
      <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
        {formatTimeAgo(problem.lastSolved || problem.lastUpdate || problem.updatedAt)}
      </td>

      <td className="px-4 py-4">
        <div className="flex justify-end gap-1">
          {problem.link && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(problem.link, '_blank', 'noopener,noreferrer')}
              aria-label={`Open ${problem.title}`}
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAddRevision(problem)}
            disabled={actionLoading}
            aria-label={`Record revision for ${problem.title}`}
          >
            <RefreshIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenEdit(problem)}
            aria-label={`Edit ${problem.title}`}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteProblem(problem)}
            aria-label={`Delete ${problem.title}`}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ProblemRow;
