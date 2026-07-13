import { DifficultyBadge } from '../Utils/DifficultyBadge';
import { Modal } from '../Utils/Modal';
import Button from '../Utils/Button';
import Badge from '../Utils/Badge';
import useApp from '../../customHook/useApp';
import { ExternalLinkIcon, RefreshIcon } from '../Utils/Icons';

function RandomProbModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    randomProblem,
    handlePracticeRandom
  } = useApp();

  return (
    <>
      <Modal
        isOpen={activeModal === MODALS.NO_PROBLEMS_ERROR}
        title="No Problems Available"
        description="Add a problem before starting a random practice session."
        onClose={() => setActiveModal(MODALS.NONE)}
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setActiveModal(MODALS.NONE)}>Cancel</Button>
          <Button onClick={() => setActiveModal(MODALS.ADD_PROBLEM)}>Add Problem</Button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === MODALS.RANDOM_PROBLEM}
        title="Random Practice"
        onClose={() => setActiveModal(MODALS.NONE)}
      >
        {randomProblem && (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Problem</p>
              <h3 className="mt-1 text-lg font-semibold text-neutral-950 dark:text-neutral-50">{randomProblem.title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Difficulty</p>
                <DifficultyBadge difficulty={randomProblem.difficulty} />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Status</p>
                <Badge variant={randomProblem.status}>{randomProblem.status}</Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={!randomProblem.link}
                onClick={() => {
                  if (randomProblem.link) window.open(randomProblem.link, '_blank', 'noopener,noreferrer');
                }}
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Start
              </Button>
              <Button variant="outline" size="icon" onClick={handlePracticeRandom} aria-label="Pick another problem">
                <RefreshIcon />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default RandomProbModal;
