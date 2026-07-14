import useApp from '../../customHook/useApp';
import Badge from '../Utils/Badge';
import Button from '../Utils/Button';
import Card from '../Utils/Card';
import ProgressBar from '../MainContent/ProgressBar';

function DashboardView() {
  const { problems, formatTimeAgo, navigate } = useApp();
  const recentProblems = problems.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
            My DSA Progress
          </h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/problems')}>
          View Problems
        </Button>
      </div>

      <ProgressBar />

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">Recent Problems</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Latest items from your library.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/problems')}>
            Manage
          </Button>
        </div>

        <div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
          {recentProblems.length > 0 ? (
            recentProblems.map((problem) => (
              <div key={problem._id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-950 dark:text-neutral-50">{problem.title}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {problem.platform} / {problem.topic || 'General'} / {formatTimeAgo(problem.updatedAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
                  <Badge variant={problem.status}>{problem.status}</Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-sm text-neutral-500 dark:text-neutral-400">No problems yet. Add one from the Problems page.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default DashboardView;
