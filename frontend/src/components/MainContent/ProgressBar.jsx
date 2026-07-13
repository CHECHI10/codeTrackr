import useApp from '../../customHook/useApp';
import Card from '../Utils/Card';
import ProgressCard from '../Utils/ProgressCard.jsx';

function StatCard({ label, value, helper }) {
  return (
    <Card className="p-4">
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">{value}</p>
      {helper && <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{helper}</p>}
    </Card>
  );
}

function Progressbar() {
  const { dashboardStats, dashboardLoading, formatTimeAgo } = useApp();
  const stats = dashboardStats;
  const solvedPercent = stats.total === 0 ? 0 : Math.round((stats.solved / stats.total) * 100);

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Problems" value={dashboardLoading ? '...' : stats.total} helper="Tracked in your workspace" />
        <StatCard label="Solved" value={dashboardLoading ? '...' : stats.solved} helper={`${stats.attempted} attempted`} />
        <StatCard label="Current Streak" value={dashboardLoading ? '...' : `${stats.currentStreak}d`} helper={`Best: ${stats.longestStreak}d`} />
        <StatCard label="Revision Count" value={dashboardLoading ? '...' : stats.revisionCount} helper="Total solved revisions" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressCard label="Overall" value={`${stats.solved} / ${stats.total}`} percent={solvedPercent} />
          {['easy', 'medium', 'hard'].map((difficulty) => {
            const item = stats.difficulty?.[difficulty] || { total: 0, solved: 0 };
            const percent = item.total === 0 ? 0 : Math.round((item.solved / item.total) * 100);

            return (
              <ProgressCard
                key={difficulty}
                label={difficulty}
                value={`${item.solved} / ${item.total}`}
                percent={percent}
              />
            );
          })}
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">Recent Activity</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{stats.recentActivity?.length || 0} updates</span>
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentActivity?.length > 0 ? (
              stats.recentActivity.map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.title}</p>
                    <p className="text-xs capitalize text-neutral-500 dark:text-neutral-400">{item.status} on {item.platform}</p>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">{formatTimeAgo(item.updatedAt)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No activity yet.</p>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default Progressbar;
