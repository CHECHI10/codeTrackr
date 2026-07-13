import Badge from './Badge';

export const DifficultyBadge = ({ difficulty }) => {
  return (
    <Badge variant={difficulty || 'neutral'}>
      {difficulty || 'unknown'}
    </Badge>
  );
};
