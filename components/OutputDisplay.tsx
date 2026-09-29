
import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import ClipboardIcon from './icons/ClipboardIcon';

interface OutputDisplayProps {
  htmlContent: string;
  isLoading: boolean;
  error: string | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ htmlContent, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (htmlContent && iframeRef.current) {
        iframeRef.current.srcdoc = htmlContent;
    }
  }, [htmlContent]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="p-8 text-center text-red-600">
          <h3 className="text-xl font-semibold mb-2">אירעה שגיאה</h3>
          <p>{error}</p>
        </div>
      );
    }
    if (!htmlContent) {
      return (
        <div className="p-8 text-center text-text-secondary">
          <h3 className="text-xl font-semibold mb-2">הדף שלכם ממתין</h3>
          <p>מלאו את הטופס כדי לייצר תצוגה מקדימה של דף הנחיתה.</p>
        </div>
      );
    }
    return (
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 border-b border-slate-200">
            <div className="p-2 flex space-x-2 space-x-reverse">
                <button onClick={() => setActiveTab('preview')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'preview' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-slate-100'}`}>תצוגה מקדימה</button>
                <button onClick={() => setActiveTab('code')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'code' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-slate-100'}`}>קוד</button>
            </div>
        </div>
        <div className="flex-grow overflow-auto">
            {activeTab === 'preview' ? (
                <iframe
                    ref={iframeRef}
                    title="Generated Landing Page"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                ></iframe>
            ) : (
                <div className="relative h-full">
                    <button onClick={handleCopy} className="absolute top-2 left-2 bg-slate-700 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-600 flex items-center">
                        {showCopySuccess ? <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> הועתק!</> : <><ClipboardIcon className="ml-1.5" /> העתק קוד</>}
                    </button>
                    <pre className="h-full w-full overflow-auto bg-slate-800 text-white p-4 text-sm rounded-b-lg text-left" dir="ltr"><code className="language-html">{htmlContent}</code></pre>
                </div>
            )}
        </div>
      </div>
    );
  };

  return <div className="h-full">{renderContent()}</div>;
};

export default OutputDisplay;
