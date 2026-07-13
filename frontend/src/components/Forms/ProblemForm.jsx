import Input from '../Utils/Input';
import Select from '../Utils/Select';

const platforms = ['LeetCode', 'GeeksforGeeks', 'CodeForces', 'HackerRank', 'InterviewBit', 'CodeChef'];

export default function ProblemForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Two Sum"
          required
        />
      </div>

      <Select label="Platform" value={formData.platform} onChange={(event) => updateField('platform', event.target.value)}>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </Select>

      <Input
        label="Topic"
        value={formData.topic}
        onChange={(event) => updateField('topic', event.target.value)}
        placeholder="Arrays"
      />

      <Select label="Status" value={formData.status} onChange={(event) => updateField('status', event.target.value)}>
        <option value="unsolved">Unsolved</option>
        <option value="attempted">Attempted</option>
        <option value="solved">Solved</option>
      </Select>

      <Select label="Difficulty" value={formData.difficulty} onChange={(event) => updateField('difficulty', event.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Select>

      <Input
        label="Time Complexity"
        value={formData.timeComplexity}
        onChange={(event) => updateField('timeComplexity', event.target.value)}
        placeholder="O(n)"
      />

      <Input
        label="Space Complexity"
        value={formData.spaceComplexity}
        onChange={(event) => updateField('spaceComplexity', event.target.value)}
        placeholder="O(1)"
      />

      <div className="md:col-span-2">
        <Input
          label="Problem Link"
          type="url"
          value={formData.link}
          onChange={(event) => updateField('link', event.target.value)}
          placeholder="https://leetcode.com/problems/two-sum"
        />
      </div>

      <label className="block space-y-2 md:col-span-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Notes</span>
        <textarea
          value={formData.notes}
          onChange={(event) => updateField('notes', event.target.value)}
          rows={4}
          placeholder="Approach, pitfalls, or revision notes"
          className="w-full resize-y rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
        />
      </label>
    </div>
  );
}
