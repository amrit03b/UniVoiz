export default function ReportList() {
  return (
    <div className="text-center py-12 bg-primary-50 animate-fade-in rounded-xl shadow-glow-lg transition-all duration-700">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-primary-900 text-lg font-semibold animate-pulse">Report viewing is currently disabled</p>
        <p className="text-primary-700 text-sm animate-fade-in animation-delay-2000">Check back later for updates</p>
      </div>
    </div>
  );
}