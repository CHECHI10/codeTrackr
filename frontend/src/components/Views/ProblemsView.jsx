import Actionbar from '../MainContent/Actionbar';
import Pagination from '../Pagination/Pagination';
import ProblemTable from '../MainContent/ProblemTable';

function ProblemsView() {
  return (
    <div className="space-y-6">
      <Actionbar />
      <ProblemTable />
      <Pagination />
    </div>
  );
}

export default ProblemsView;
