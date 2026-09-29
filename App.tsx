import React, { useState, useCallback } from 'react';
import type { LandingPageData } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { generateLandingPageHtml } from './services/geminiService';
import { PALETTE_OPTIONS, PAGE_TYPE_OPTIONS, TONE_OF_VOICE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<LandingPageData>({
    logoText: '',
    businessName: '',
    description: '',
    targetAudience: '',
    features: [''],
    cta: '',
    palette: PALETTE_OPTIONS[0].value,
    pageType: PAGE_TYPE_OPTIONS[0].value,
    toneOfVoice: TONE_OF_VOICE_OPTIONS[0].value,
    contactEmail: '',
  });
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedHtml('');
    try {
      const html = await generateLandingPageHtml(formData);
      setGeneratedHtml(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);
  

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans antialiased">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 h-full">
          <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-2">
            <InputForm 
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto bg-surface rounded-xl shadow-lg border border-slate-200">
            <OutputDisplay 
              htmlContent={generatedHtml}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;