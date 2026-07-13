import useApp from '../../customHook/useApp';
import Button from './Button';
import Select from './Select';
import { ArrowDownIcon, ArrowUpIcon } from './Icons';

function SortDropdown() {
  const { sortBy, setSortBy, sortOrder, toggleSortOrder } = useApp();

  return (
    <div className="flex items-end gap-2">
      <Select
        label="Sort"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="min-w-36"
      >
        <option value="updatedAt">Last update</option>
        <option value="lastSolved">Last solved</option>
        <option value="revisionCount">Revisions</option>
        <option value="status">Status</option>
        <option value="difficulty">Difficulty</option>
        <option value="title">Title</option>
        <option value="platform">Platform</option>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSortOrder}
        aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
    </div>
  );
}

export default SortDropdown;
