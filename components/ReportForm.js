import { useState } from 'react';
import { uploadToPinata } from '../utils/pinata';

export default function ReportForm({ contract, account }) {
  const [reportText, setReportText] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload PDF, TXT, or JPEG files only.');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        validateFile(selectedFile);
        setFile(selectedFile);
        setError('');
      } catch (error) {
        setError(error.message);
        setFile(null);
        e.target.value = null;
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!reportText.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      setStatus('Uploading to IPFS...');
      console.log('Preparing report data...');
      
      // Prepare report data
      const reportData = {
        text: reportText,
        timestamp: new Date().toISOString(),
      };

      // Create a file from the report data
      const blob = new Blob([JSON.stringify(reportData)], { type: 'application/json' });
      const reportFile = new File([blob], 'report.json');

      // Upload report to IPFS
      console.log('Uploading to IPFS...');
      const ipfsHash = await uploadToPinata(reportFile);
      console.log('IPFS hash received:', ipfsHash);

      // If there's an additional file, upload it too
      let additionalFileHash = null;
      if (file) {
        console.log('Uploading additional file to IPFS...');
        additionalFileHash = await uploadToPinata(file);
        console.log('Additional file IPFS hash:', additionalFileHash);
      }

      setStatus('Submitting to blockchain...');
      console.log('Submitting to blockchain...');
      console.log('Contract:', contract);
      console.log('Account:', account);
      
      // Submit the report hash to the smart contract
      const tx = await contract.methods.submitReport(ipfsHash).send({ from: account });
      console.log('Transaction successful:', tx);
      
      setStatus('Report submitted successfully!');
      setReportText('');
      setFile(null);
    } catch (error) {
      console.error('Error submitting report:', error);
      setError(error.message || 'Failed to submit report');
      setStatus('Error: ' + (error.message || 'Failed to submit report'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-blue-50/90 p-8 rounded-2xl shadow-xl border border-blue-300">
      <div className="space-y-4">
        <div>
          <label htmlFor="report" className="block text-sm font-semibold text-blue-900 mb-2">
            Issue Details
          </label>
          <textarea
            id="report"
            value={reportText}
            onChange={e => setReportText(e.target.value)}
            placeholder="Describe the issue you are facing at your university. Your submission is anonymous. But if you want you can reveal your identity."
            required
            className="w-full px-4 py-2 bg-blue-100 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-900 placeholder-blue-500 h-48 resize-none font-medium"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Supporting Documents (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer bg-blue-100 hover:bg-blue-200 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-sm text-blue-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-blue-500">PDF, DOC, TXT, JPEG (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.txt,.doc,.docx,.jpeg,.jpg"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 font-semibold">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting || !reportText.trim()}
          className="relative px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                Submitting...
              </span>
            </>
          ) : (
            <>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                Submit Issue
              </span>
            </>
          )}
        </button>

        {status && (
          <div className={`text-sm font-semibold ${status.includes('Error') ? 'text-red-700' : 'text-blue-700'}`}>
            {status}
          </div>
        )}
      </div>
    </form>
  );
}