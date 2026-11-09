import React from 'react';

export default function CertificateViewer({ cert, onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Responsive Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition text-left"
        >
          &larr; Return to Search
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="px-2.5 py-1 rounded text-[11px] sm:text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
            RECORD VERIFIED
          </span>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition whitespace-nowrap"
          >
            Export Document / Print
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container (Mobile Responsive) */}
      <div 
        id="certificate-paper"
        className="bg-white rounded-xl p-5 sm:p-10 md:p-14 border border-slate-300 shadow-md text-center font-serif text-slate-800 w-full overflow-hidden"
      >
        {/* Header Institution */}
        <div className="space-y-1 mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] font-sans font-semibold text-slate-500">
            International Academic Credentials Registry
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-sans break-words">
            Certificate of Recognition
          </h1>
          <p className="text-[11px] sm:text-xs font-mono text-slate-500 break-all">
            Identifier: {cert.certificateId}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="space-y-4 sm:space-y-5 max-w-xl mx-auto my-6 sm:my-8 font-sans">
          <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider">
            This credential certifies that
          </p>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight break-words">
            {cert.recipientName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            has fulfilled all professional requirements and served as <strong className="text-slate-900">{cert.role}</strong> at
          </p>
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 italic break-words">
            "{cert.conferenceName}"
          </h3>
          {cert.paperTitle && (
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded border border-slate-200 text-xs text-slate-700 break-words text-left">
              <span className="font-semibold text-slate-900">Registered Topic:</span> "{cert.paperTitle}"
            </div>
          )}
          <p className="text-[11px] sm:text-xs text-slate-500">
            Recorded at {cert.location} on {cert.issueDate}
          </p>
        </div>

        {/* Responsive Footer */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 font-sans text-xs text-slate-600">
          <div className="text-center sm:text-left space-y-0.5">
            <p className="font-semibold text-slate-900">{cert.issuer}</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Institutional Governance Committee</p>
          </div>

          <div className="text-center sm:text-right space-y-0.5 max-w-full">
            <p className="font-mono text-[10px] sm:text-[11px] text-slate-700 truncate max-w-[240px] sm:max-w-[200px] mx-auto sm:ml-auto">
              {cert.hash}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">SHA-256 Ledger Record</p>
          </div>
        </div>
      </div>
    </div>
  );
}
