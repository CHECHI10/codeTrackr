import useApp from '../../customHook/useApp';
import Badge from '../Utils/Badge';
import Card from '../Utils/Card';

function BarRow({ label, value, total }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium capitalize text-neutral-700 dark:text-neutral-300">{label}</span>
        <span className="text-neutral-500 dark:text-neutral-400">{value} / {percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div className="h-full rounded-full bg-neutral-950 dark:bg-white" style={{ width: `${Math.max(percent, value > 0 ? 3 : 0)}%` }} />
      </div>
    </div>
  );
}

function AnalyticsView() {
  const { dashboardStats } = useApp();
  const stats = dashboardStats;
  const statusRows = [
    ['Solved', stats.solved, 'solved'],
    ['Attempted', stats.attempted, 'attempted'],
    ['Unsolved', stats.unsolved, 'unsolved']
  ];
  const difficultyRows = ['easy', 'medium', 'hard'].map((difficulty) => {
    const item = stats.difficulty?.[difficulty] || { total: 0, solved: 0 };
    return [difficulty, item.total, item.solved];
  });
  const maxPlatformCount = Math.max(...(stats.platformDistribution || []).map((item) => item.total), 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Analytics</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          Performance Overview
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Current Streak</p>
          <p className="mt-2 text-3xl font-semibold text-neutral-950 dark:text-white">{stats.currentStreak}d</p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Longest streak: {stats.longestStreak}d</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Revisions</p>
          <p className="mt-2 text-3xl font-semibold text-neutral-950 dark:text-white">{stats.revisionCount}</p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Across solved practice sessions</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Completion</p>
          <p className="mt-2 text-3xl font-semibold text-neutral-950 dark:text-white">
            {stats.total === 0 ? 0 : Math.round((stats.solved / stats.total) * 100)}%
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{stats.solved} solved of {stats.total}</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">Status Breakdown</h2>
          <div className="mt-5 space-y-4">
            {statusRows.map(([label, value, variant]) => (
              <div key={label} className="flex items-center justify-between">
                <Badge variant={variant}>{label}</Badge>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">Difficulty Breakdown</h2>
          <div className="mt-5 space-y-4">
            {difficultyRows.map(([difficulty, total, solved]) => (
              <BarRow key={difficulty} label={`${difficulty} solved`} value={solved} total={total} />
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">Platform Distribution</h2>
        <div className="mt-5 space-y-4">
          {stats.platformDistribution?.length > 0 ? (
            stats.platformDistribution.map((item) => (
              <BarRow key={item.platform} label={item.platform} value={item.total} total={maxPlatformCount} />
            ))
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No platform data yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default AnalyticsView;
