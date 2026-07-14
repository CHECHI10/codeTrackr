import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import Select from '../Utils/Select';
import SortDropdown from '../Utils/SortDropdown';
import { DiceIcon, FilterIcon, PlusIcon, TrashIcon } from '../Utils/Icons';

function Actionbar() {
  const {
    setActiveModal,
    MODALS,
    handlePracticeRandom,
    deleteAllProblems,
    pagination,
    filters,
    updateFilter,
    clearFilters,
    problemsLoading
  } = useApp();

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Problems</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Problem Library
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => setActiveModal(MODALS.ADD_PROBLEM)}>
              <PlusIcon className="h-4 w-4" />
              Add Problem
            </Button>
            <Button variant="secondary" onClick={handlePracticeRandom}>
              <DiceIcon className="h-4 w-4" />
              Practice
            </Button>
            <Button
              variant="danger"
              onClick={deleteAllProblems}
              disabled={pagination.total === 0 || problemsLoading}
            >
              <TrashIcon className="h-4 w-4" />
              Delete All
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            <FilterIcon className="h-4 w-4" />
            Filters
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto_auto] xl:items-end">
            <Select label="Status" value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
              <option value="">All statuses</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
            </Select>

            <Select label="Difficulty" value={filters.difficulty} onChange={(event) => updateFilter('difficulty', event.target.value)}>
              <option value="">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>

            <Input
              label="Platform"
              value={filters.platform}
              onChange={(event) => updateFilter('platform', event.target.value)}
              placeholder="LeetCode"
            />

            <Input
              label="Topic"
              value={filters.topic}
              onChange={(event) => updateFilter('topic', event.target.value)}
              placeholder="Trees"
            />

            <SortDropdown />

            <Button variant="outline" onClick={clearFilters}>
              Reset
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Actionbar;
