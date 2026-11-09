import React, { useState } from 'react';

export default function VerificationForm({ onVerify, sampleCerts }) {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setErrorMsg('Please enter a valid certificate identifier or recipient name.');
      return;
    }
    const found = onVerify(inputCode.trim());
    if (!found) {
      setErrorMsg(`No record located matching "${inputCode}". Verify identifier format and retry.`);
    } else {
      setErrorMsg('');
    }
  };

  const handleQuickDemo = (certId) => {
    setInputCode(certId);
    setErrorMsg('');
    onVerify(certId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-6 pt-2 sm:pt-4">
      {/* Title */}
      <div className="text-center space-y-1.5 px-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Academic Credential Verification
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Public verification interface for conference credentials, peer-reviewed publications, and committee appointments.
        </p>
      </div>

      {/* Responsive Search Input Box */}
      <form onSubmit={handleSubmit} className="bg-white p-2.5 sm:p-3 rounded-xl shadow-sm border border-slate-200 w-full">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="Enter ID (e.g. ACAD-2026-0891) or Name..."
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-medium rounded-lg text-xs sm:text-sm transition whitespace-nowrap text-center"
          >
            Verify
          </button>
        </div>

        {errorMsg && (
          <p className="mt-2 text-xs text-rose-600 font-medium px-1 break-words">
            {errorMsg}
          </p>
        )}
      </form>

      {/* Responsive Sample Records for Evaluators */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2.5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium text-slate-500 gap-1">
          <span>Sample Evaluation Records:</span>
          <span className="text-[11px] text-slate-400">Click identifier to load</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
          {sampleCerts.map((c) => (
            <button
              key={c.certificateId}
              type="button"
              onClick={() => handleQuickDemo(c.certificateId)}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-xs font-mono text-slate-700 transition text-left flex flex-wrap items-center gap-1 max-w-full"
            >
              <span className="font-semibold text-slate-900">{c.certificateId}</span>
              <span className="text-slate-400 font-sans text-[11px] truncate">({c.recipientName})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
