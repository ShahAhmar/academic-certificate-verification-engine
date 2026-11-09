import React, { useState } from 'react';
import { initialCertificates } from './data/mockCertificates';
import VerificationForm from './components/VerificationForm';
import CertificateViewer from './components/CertificateViewer';
import AdminIssuer from './components/AdminIssuer';

export default function App() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [activeCert, setActiveCert] = useState(null);
  const [activeTab, setActiveTab] = useState('verify'); // 'verify' | 'issue'

  const handleVerify = (query) => {
    const q = query.toLowerCase().trim();
    const found = certificates.find(
      (c) =>
        c.certificateId.toLowerCase() === q ||
        c.recipientName.toLowerCase().includes(q)
    );

    if (found) {
      setActiveCert(found);
      return true;
    }
    return false;
  };

  const handleAddCertificate = (newCert) => {
    setCertificates([newCert, ...certificates]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 w-full overflow-x-hidden">
      {/* Responsive Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-auto py-2.5 sm:py-0 sm:h-14 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <span className="font-semibold text-slate-900 text-xs sm:text-sm tracking-tight truncate">
              Academic Credential Verification Engine
            </span>
            <span className="text-[11px] text-slate-400 font-mono ml-2 sm:hidden">
              v1.0.4
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs font-medium text-slate-600 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('verify');
                  setActiveCert(null);
                }}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition text-center ${
                  activeTab === 'verify' && !activeCert ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Verification
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('issue');
                  setActiveCert(null);
                }}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition text-center ${
                  activeTab === 'issue' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Admin Issuance
              </button>
            </div>

            <a
              href="https://github.com/ShahAhmar"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-500 hover:text-slate-900 font-medium px-2 py-1 rounded transition whitespace-nowrap hidden sm:inline-block"
            >
              Source Code
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-1 w-full">
        {activeCert ? (
          <CertificateViewer cert={activeCert} onBack={() => setActiveCert(null)} />
        ) : activeTab === 'verify' ? (
          <VerificationForm onVerify={handleVerify} sampleCerts={certificates} />
        ) : (
          <AdminIssuer onAddCertificate={handleAddCertificate} />
        )}
      </main>

      {/* Responsive Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500 print:hidden">
        <p className="leading-relaxed">
          Architected by Syed Ahmar Ali &bull; Full-Stack Systems & Architecture
        </p>
      </footer>
    </div>
  );
}
