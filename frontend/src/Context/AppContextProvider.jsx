import { useCallback, useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';
import MODALS from '../constants/modals';
import useLocalStorage from '../customHook/useLocalStorage';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../api/auth';
import { getDashboardStats } from '../api/dashboard';
import {
  getProblems,
  addProblem,
  deleteProblem,
  updateProblem,
  deleteProblems,
  addRevision
} from '../api/problems';

const defaultProblemForm = {
  title: '',
  platform: 'LeetCode',
  status: 'unsolved',
  difficulty: 'medium',
  topic: '',
  notes: '',
  timeComplexity: '',
  spaceComplexity: '',
  link: ''
};

const defaultStats = {
  total: 0,
  solved: 0,
  attempted: 0,
  unsolved: 0,
  revisionCount: 0,
  currentStreak: 0,
  longestStreak: 0,
  difficulty: {
    easy: { total: 0, solved: 0 },
    medium: { total: 0, solved: 0 },
    hard: { total: 0, solved: 0 }
  },
  platformDistribution: [],
  recentActivity: []
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

const getProblemId = (problem) => problem?._id || problem?.id;

const getErrorMessage = (error, fallback = 'Something went wrong') => {
  return error?.response?.data?.message || error?.response?.data?.error || error?.message || fallback;
};

const AppContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('codetrackr-theme-dark', getInitialTheme());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(MODALS.NONE);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const [problems, setProblems] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(defaultStats);
  const [problemsLoading, setProblemsLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState(defaultProblemForm);
  const [randomProblem, setRandomProblem] = useState(null);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [updateStatusProblem, setUpdateStatusProblem] = useState(null);
  const [problemToEdit, setProblemToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    difficulty: '',
    platform: '',
    topic: ''
  });
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [probPerPage, setProbPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setCurrentPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetProblemState = useCallback(() => {
    setProblems([]);
    setDashboardStats(defaultStats);
    setPagination({ page: 1, limit: probPerPage, total: 0, totalPages: 1 });
    setSearchTerm('');
    setDebouncedSearch('');
    setFilters({ status: '', difficulty: '', platform: '', topic: '' });
    setSortBy('updatedAt');
    setSortOrder('desc');
    setCurrentPage(1);
  }, [probPerPage]);

  const loadCurrentUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const buildQueryParams = useCallback((overrides = {}) => {
    return {
      page: overrides.page ?? currentPage,
      limit: overrides.limit ?? probPerPage,
      search: overrides.search ?? debouncedSearch,
      status: filters.status,
      difficulty: filters.difficulty,
      platform: filters.platform,
      topic: filters.topic,
      sortBy,
      sortOrder
    };
  }, [currentPage, debouncedSearch, filters, probPerPage, sortBy, sortOrder]);

  const fetchProblems = useCallback(async (overrides = {}) => {
    if (!user) return;

    setProblemsLoading(true);
    setError('');

    try {
      const res = await getProblems(buildQueryParams(overrides));
      setProblems(res.data.data || []);
      setPagination(res.data.pagination || {
        page: overrides.page ?? currentPage,
        limit: probPerPage,
        total: 0,
        totalPages: 1
      });
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load problems'));
    } finally {
      setProblemsLoading(false);
    }
  }, [buildQueryParams, currentPage, probPerPage, user]);

  const fetchDashboardStats = useCallback(async () => {
    if (!user) return;

    setDashboardLoading(true);

    try {
      const res = await getDashboardStats();
      setDashboardStats(res.data.data || defaultStats);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load dashboard statistics'));
    } finally {
      setDashboardLoading(false);
    }
  }, [user]);

  const refreshData = useCallback(async (overrides = {}) => {
    await Promise.all([
      fetchProblems(overrides),
      fetchDashboardStats()
    ]);
  }, [fetchDashboardStats, fetchProblems]);

  useEffect(() => {
    if (user) {
      fetchProblems();
    }
  }, [fetchProblems, user]);

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [fetchDashboardStats, user]);

  const handleLogin = useCallback(async (credentials) => {
    setAuthSubmitting(true);
    setAuthError('');

    try {
      const res = await loginUser(credentials);
      setUser(res.data.user);
      addToast('Welcome back.', 'success');
      return true;
    } catch (err) {
      const message = getErrorMessage(err, 'Login failed');
      setAuthError(message);
      addToast(message, 'error');
      return false;
    } finally {
      setAuthSubmitting(false);
    }
  }, [addToast]);

  const handleRegister = useCallback(async (payload) => {
    setAuthSubmitting(true);
    setAuthError('');

    try {
      const res = await registerUser(payload);
      setUser(res.data.user);
      addToast('Account created.', 'success');
      return true;
    } catch (err) {
      const message = getErrorMessage(err, 'Registration failed');
      setAuthError(message);
      addToast(message, 'error');
      return false;
    } finally {
      setAuthSubmitting(false);
    }
  }, [addToast]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (err) {
      addToast(getErrorMessage(err, 'Logout failed'), 'error');
    } finally {
      setUser(null);
      resetProblemState();
      addToast('Signed out.', 'success');
    }
  }, [addToast, resetProblemState]);

  const resetForm = useCallback(() => {
    setFormData(defaultProblemForm);
    setProblemToEdit(null);
  }, []);

  const handleAddProblem = useCallback(async () => {
    if (!formData.title.trim()) {
      addToast('Problem title is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      await addProblem(formData);
      setActiveModal(MODALS.NONE);
      resetForm();
      setCurrentPage(1);
      await refreshData({ page: 1 });
      addToast('Problem added.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to add problem'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, formData, refreshData, resetForm]);

  const handleOpenEdit = useCallback((problem) => {
    setProblemToEdit(problem);
    setFormData({
      ...defaultProblemForm,
      title: problem.title || '',
      platform: problem.platform || 'LeetCode',
      status: problem.status || 'unsolved',
      difficulty: problem.difficulty || 'medium',
      topic: problem.topic || '',
      notes: problem.notes || '',
      timeComplexity: problem.timeComplexity || '',
      spaceComplexity: problem.spaceComplexity || '',
      link: problem.link || ''
    });
    setActiveModal(MODALS.EDIT_PROBLEM);
  }, []);

  const handleConfirmEdit = useCallback(async () => {
    if (!problemToEdit || !formData.title.trim()) {
      addToast('Problem title is required.', 'error');
      return;
    }

    setActionLoading(true);
    try {
      await updateProblem(getProblemId(problemToEdit), formData);
      setActiveModal(MODALS.NONE);
      resetForm();
      await refreshData();
      addToast('Problem updated.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to update problem'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, formData, problemToEdit, refreshData, resetForm]);

  const handleUpdateStatus = useCallback(async (newStatus) => {
    if (!updateStatusProblem) return;

    setActionLoading(true);
    try {
      await updateProblem(getProblemId(updateStatusProblem), { status: newStatus });
      setActiveModal(MODALS.NONE);
      setUpdateStatusProblem(null);
      await refreshData();
      addToast('Status updated.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to update status'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, refreshData, updateStatusProblem]);

  const handleAddRevision = useCallback(async (problem) => {
    setActionLoading(true);
    try {
      await addRevision(getProblemId(problem));
      await refreshData();
      addToast('Revision recorded.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to record revision'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, refreshData]);

  const handleDeleteProblem = useCallback((problem) => {
    setProblemToDelete(problem);
    setActiveModal(MODALS.DELETE_SINGLE);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!problemToDelete) return;

    setActionLoading(true);
    try {
      await deleteProblem(getProblemId(problemToDelete));
      setActiveModal(MODALS.NONE);
      setProblemToDelete(null);
      const nextPage = problems.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      setCurrentPage(nextPage);
      await refreshData({ page: nextPage });
      addToast('Problem deleted.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to delete problem'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, currentPage, problemToDelete, problems.length, refreshData]);

  const deleteAllProblems = useCallback(() => {
    setActiveModal(MODALS.DELETE_ALL);
  }, []);

  const handleConfirmDeleteAll = useCallback(async () => {
    setActionLoading(true);
    try {
      await deleteProblems();
      setCurrentPage(1);
      await refreshData({ page: 1 });
      setActiveModal(MODALS.NONE);
      addToast('All problems deleted.', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Failed to delete problems'), 'error');
    } finally {
      setActionLoading(false);
    }
  }, [addToast, refreshData]);

  const handlePracticeRandom = useCallback(() => {
    if (problems.length === 0) {
      setActiveModal(MODALS.NO_PROBLEMS_ERROR);
      return;
    }

    const random = problems[Math.floor(Math.random() * problems.length)];
    setRandomProblem(random);
    setActiveModal(MODALS.RANDOM_PROBLEM);
  }, [problems]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearch('');
    setFilters({ status: '', difficulty: '', platform: '', topic: '' });
    setCurrentPage(1);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  }, []);

  const updateSortBy = useCallback((value) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const formatTimeAgo = useCallback((date) => {
    if (!date) return 'Never';

    const now = Date.now();
    const diff = Math.floor((now - new Date(date)) / 1000);

    if (diff < 60) return 'Just now';

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }, []);

  const calculateStats = useCallback(() => dashboardStats, [dashboardStats]);

  const themeClasses = useMemo(() => ({
    bgClass: 'bg-gray-50 dark:bg-neutral-950',
    textClass: 'text-neutral-950 dark:text-neutral-50',
    secondaryBg: 'bg-white dark:bg-neutral-900',
    borderClass: 'border-neutral-200 dark:border-neutral-800',
    hoverBg: 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
  }), []);

  const value = useMemo(() => ({
    MODALS,
    activeModal,
    setActiveModal,

    isDark,
    setIsDark,
    toggleTheme: () => setIsDark((prev) => !prev),
    ...themeClasses,

    sidebarOpen,
    setSidebarOpen,

    user,
    authLoading,
    authSubmitting,
    authError,
    setAuthError,
    handleLogin,
    handleRegister,
    handleLogout,

    problems,
    setProblems,
    loading: problemsLoading,
    problemsLoading,
    dashboardLoading,
    actionLoading,
    error,
    dashboardStats,
    pagination,
    refreshData,

    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    sortBy,
    setSortBy: updateSortBy,
    sortOrder,
    setSortOrder,
    toggleSortOrder,

    currentProblems: problems,
    currentPage,
    setCurrentPage,
    probPerPage,
    setProbPerPage,

    randomProblem,
    setRandomProblem,
    problemToDelete,
    setProblemToDelete,
    problemToEdit,
    setProblemToEdit,
    updateStatusProblem,
    setUpdateStatusProblem,

    formData,
    setFormData,
    resetForm,

    handleAddProblem,
    handlePracticeRandom,
    handleOpenEdit,
    handleConfirmEdit,
    handleUpdateStatus,
    handleAddRevision,
    formatTimeAgo,
    handleConfirmDelete,
    handleDeleteProblem,
    deleteAllProblems,
    handleConfirmDeleteAll,
    calculateStats,
    getProblemId,

    toasts,
    addToast,
    removeToast
  }), [
    activeModal,
    actionLoading,
    addToast,
    authError,
    authLoading,
    authSubmitting,
    calculateStats,
    clearFilters,
    currentPage,
    dashboardLoading,
    dashboardStats,
    deleteAllProblems,
    error,
    filters,
    formData,
    formatTimeAgo,
    handleAddProblem,
    handleAddRevision,
    handleConfirmDelete,
    handleConfirmDeleteAll,
    handleConfirmEdit,
    handleDeleteProblem,
    handleLogin,
    handleLogout,
    handleOpenEdit,
    handlePracticeRandom,
    handleRegister,
    handleUpdateStatus,
    isDark,
    pagination,
    probPerPage,
    problemToDelete,
    problemToEdit,
    problems,
    problemsLoading,
    randomProblem,
    refreshData,
    removeToast,
    resetForm,
    searchTerm,
    setIsDark,
    sidebarOpen,
    sortBy,
    sortOrder,
    toggleSortOrder,
    themeClasses,
    toasts,
    updateFilter,
    updateSortBy,
    updateStatusProblem,
    user
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
