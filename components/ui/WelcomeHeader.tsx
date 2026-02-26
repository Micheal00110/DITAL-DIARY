export function WelcomeHeader() {
  return (
    <div className="px-6 pt-12 pb-8"
    style={{ background: 'linear-gradient(135deg, rgb(44, 95, 138) 0%, rgb(26, 61, 92) 100%)' }}>
      <div className="text-white/70 text-sm mb-1">Welcome to</div>
      <h1 className="text-4xl font-bold text-white mb-2"
           style={{ fontFamily: 'cursive, sans-serif' }}>
        MyChild Diary
      </h1>
      <p className="text-white/80 text-sm">
        Your digital school diary. Choose how you&apos;ll use this app.
      </p>
    </div>
  );
}
