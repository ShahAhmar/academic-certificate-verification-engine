import React, { useState } from 'react';

export default function AdminIssuer({ onAddCertificate }) {
  const [formData, setFormData] = useState({
    recipientName: '',
    role: 'Presenter',
    paperTitle: '',
    conferenceName: 'International Conference on Advanced Computing & Architecture',
    location: 'Zurich, Switzerland',
    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  const [createdCert, setCreatedCert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.recipientName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCert = {
      ...formData,
      certificateId: `ACAD-2026-${randomSuffix}`,
      verificationStatus: "VERIFIED",
      issuer: "Academic Review Council",
      hash: `sha256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 8)}`
    };

    onAddCertificate(newCert);
    setCreatedCert(newCert);
    setFormData({
      recipientName: '',
      role: 'Presenter',
      paperTitle: '',
      conferenceName: 'International Conference on Advanced Computing & Architecture',
      location: 'Zurich, Switzerland',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 sm:space-y-5">
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          Provision Academic Credential (Admin)
        </h3>
        <p className="text-xs text-slate-500">
          Simulate institutional registry record creation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-xs font-medium text-slate-700">
        <div>
          <label className="block uppercase text-slate-500 mb-1 font-semibold text-[11px]">
            Recipient Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Dr. Alexander Wright"
            value={formData.recipientName}
            onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block uppercase text-slate-500 mb-1 font-semibold text-[11px]">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs sm:text-sm"
            >
              <option value="Keynote Speaker">Keynote Speaker</option>
              <option value="Session Chair">Session Chair</option>
              <option value="Presenter">Presenter</option>
              <option value="Peer Reviewer">Peer Reviewer</option>
            </select>
          </div>

          <div>
            <label className="block uppercase text-slate-500 mb-1 font-semibold text-[11px]">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block uppercase text-slate-500 mb-1 font-semibold text-[11px]">
            Conference Title
          </label>
          <input
            type="text"
            value={formData.conferenceName}
            onChange={(e) => setFormData({ ...formData, conferenceName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs sm:text-sm"
          />
        </div>

        <div>
          <label className="block uppercase text-slate-500 mb-1 font-semibold text-[11px]">
            Paper Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Distributed Consensus in Asynchronous Networks"
            value={formData.paperTitle}
            onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition"
        >
          Create Record
        </button>
      </form>

      {createdCert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1 break-words">
          <p className="font-semibold text-emerald-800">
            Record committed: {createdCert.certificateId}
          </p>
          <p className="text-emerald-700">
            Registered for {createdCert.recipientName}. Return to Verification to inspect the document.
          </p>
        </div>
      )}
    </div>
  );
}
