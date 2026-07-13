import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';

function Pagination() {
  const {
    pagination,
    currentPage,
    setCurrentPage,
    probPerPage,
    setProbPerPage,
    problemsLoading
  } = useApp();

  const totalPages = pagination.totalPages || 1;

  if (pagination.total === 0) return null;

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
      return pages;
    }

    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row">
      <p className="text-neutral-500 dark:text-neutral-400">
        Showing page {pagination.page} of {totalPages} for {pagination.total} problems
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <select
          value={probPerPage}
          onChange={(event) => {
            setProbPerPage(Number(event.target.value));
            setCurrentPage(1);
          }}
          className="h-9 rounded-md border border-neutral-200 bg-white px-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
          aria-label="Problems per page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || problemsLoading}
        >
          Prev
        </Button>

        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={`dots-${index}`} className="px-1 text-neutral-400">...</span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              disabled={problemsLoading}
            >
              {page}
            </Button>
          )
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || problemsLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
