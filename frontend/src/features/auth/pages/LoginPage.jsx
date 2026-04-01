function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
        />
        <button type="submit" className="btn-primary-custom w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;