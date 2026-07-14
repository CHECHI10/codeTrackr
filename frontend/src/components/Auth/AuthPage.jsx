import { useState } from 'react';
import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import { MoonIcon, SunIcon } from '../Utils/Icons';

export default function AuthPage() {
  const {
    isDark,
    toggleTheme,
    handleLogin,
    handleRegister,
    authSubmitting,
    authError,
    setAuthError
  } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    identifier: '',
    email: '',
    password: ''
  });

  const isRegistering = mode === 'register';

  const updateForm = (field, value) => {
    setAuthError('');
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      await handleRegister(form);
      return;
    }

    await handleLogin({
      identifier: form.identifier,
      password: form.password
    });
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950 transition-colors dark:bg-neutral-950 dark:text-neutral-50">
      {/* <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/front-logo.png"
          alt=""
          aria-hidden="true"
          className="
              absolute
              inset-0
              m-auto
              w-[900px]
              opacity-[0.1]
              pointer-events-none
              select-none
          "
        />
      </div> */}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <section className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-6 h-12 w-12 overflow-hidden rounded-full border border-neutral-200 bg-neutral-950 shadow-sm dark:border-neutral-800">
                <img src="/codeTrackr_Logo.png" alt="CodeTrackr" className="h-full w-full object-cover" />
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                Track DSA progress without losing the thread.
              </h1>
              <p className="mt-5 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                CodeTrackr keeps your solved problems, revisions, notes, and streaks in one quiet dashboard.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-950 shadow-sm dark:border-neutral-800">
                  <img src="/codeTrackr_Logo.png" alt="CodeTrackr" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">CodeTrackr</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    {isRegistering ? 'Create account' : 'Welcome back'}
                  </h2>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? <SunIcon /> : <MoonIcon />}
              </Button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegistering && (
                <Input
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={(event) => updateForm('username', event.target.value)}
                  autoComplete="username"
                  required
                />
              )}
              <Input
                label={isRegistering ? 'Email' : 'Email or username'}
                name={isRegistering ? 'email' : 'identifier'}
                type={isRegistering ? 'email' : 'text'}
                value={isRegistering ? form.email || '' : form.identifier}
                onChange={(event) => updateForm(isRegistering ? 'email' : 'identifier', event.target.value)}
                autoComplete={isRegistering ? 'email' : 'username'}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={(event) => updateForm('password', event.target.value)}
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                required
              />

              {authError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  {authError}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={authSubmitting}>
                {authSubmitting ? 'Please wait...' : isRegistering ? 'Create account' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {isRegistering ? 'Already have an account?' : 'New to CodeTrackr?'}{' '}
              <button
                type="button"
                className="font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-white"
                onClick={() => {
                  setAuthError('');
                  setMode(isRegistering ? 'login' : 'register');
                }}
              >
                {isRegistering ? 'Sign in' : 'Create one'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
