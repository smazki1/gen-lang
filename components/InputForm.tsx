import React from 'react';
import type { LandingPageData } from '../types';
import { PALETTE_OPTIONS, PAGE_TYPE_OPTIONS, TONE_OF_VOICE_OPTIONS } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface InputFormProps {
  formData: LandingPageData;
  setFormData: React.Dispatch<React.SetStateAction<LandingPageData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center space-x-3 space-x-reverse mb-4">
    <div className="bg-primary/10 text-primary p-2 rounded-lg">{icon}</div>
    <h3 className="text-xl font-bold text-text-primary">{title}</h3>
  </div>
);

const FormField: React.FC<{ label: string; htmlFor: string; children: React.ReactNode }> = ({ label, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
    {children}
  </div>
);


const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };
  
  const inputClasses = "w-full px-3 py-2 bg-slate-50 border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow";

  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-slate-200 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">פרטי דף הנחיתה</h2>
        <p className="text-text-secondary mt-1">מלאו את הפרטים למטה, וה-AI שלנו ייצר עבורכם דף נחיתה מדהים.</p>
      </div>
      
      {/* Section 1: Basic Info */}
      <div className="space-y-4">
        <SectionHeader title="מידע בסיסי" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <FormField label="לוגו טקסט (יופיע בכותרת)" htmlFor="logoText">
          <input type="text" name="logoText" id="logoText" value={formData.logoText} onChange={handleChange} className={inputClasses} placeholder="לדוגמה: Innovate" />
        </FormField>
        <FormField label="שם העסק" htmlFor="businessName">
          <input type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} className={inputClasses} placeholder="לדוגמה: InnovateTech" />
        </FormField>
        <FormField label="תיאור המוצר/שירות" htmlFor="description">
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className={inputClasses} placeholder="תארו בכמה משפטים מה אתם מציעים."></textarea>
        </FormField>
      </div>

      {/* Section 2: Content & Style */}
      <div className="space-y-4">
        <SectionHeader title="תוכן וסגנון" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>} />
        <FormField label="מטרת הדף" htmlFor="pageType">
          <select name="pageType" id="pageType" value={formData.pageType} onChange={handleChange} className={`${inputClasses} bg-white`}>
            {PAGE_TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </FormField>
        <FormField label="טון וסגנון הכתיבה" htmlFor="toneOfVoice">
          <select name="toneOfVoice" id="toneOfVoice" value={formData.toneOfVoice} onChange={handleChange} className={`${inputClasses} bg-white`}>
            {TONE_OF_VOICE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </FormField>
        <FormField label="קהל יעד" htmlFor="targetAudience">
          <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={handleChange} className={inputClasses} placeholder="לדוגמה: סטארטאפים, עסקים קטנים, יוצרי תוכן" />
        </FormField>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">תכונות / יתרונות מרכזיים</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 space-x-reverse mb-2">
              <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className={inputClasses} placeholder={`תכונה ${index + 1}`} />
              <button onClick={() => removeFeature(index)} disabled={formData.features.length <= 1} className="p-2 text-slate-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full hover:bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
              </button>
            </div>
          ))}
          <button onClick={addFeature} className="text-sm font-medium text-primary hover:text-indigo-700">+ הוסף תכונה נוספת</button>
        </div>
        <FormField label="טקסט קריאה לפעולה (CTA)" htmlFor="cta">
          <input type="text" name="cta" id="cta" value={formData.cta} onChange={handleChange} className={inputClasses} placeholder="לדוגמה: התחילו בחינם, הירשמו עכשיו" />
        </FormField>
        <FormField label="פלטת צבעים" htmlFor="palette">
          <select name="palette" id="palette" value={formData.palette} onChange={handleChange} className={`${inputClasses} bg-white`}>
            {PALETTE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </FormField>
      </div>

      {/* Section 3: Contact Info */}
      <div className="space-y-4">
         <SectionHeader title="פרטי יצירת קשר" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
        <FormField label="אימייל (יופיע בפוטר)" htmlFor="contactEmail">
            <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleChange} className={inputClasses} placeholder="contact@example.com" />
        </FormField>
      </div>
      
      <button onClick={onSubmit} disabled={isLoading} className="w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-wait text-lg">
        {isLoading ? (
          <>
            <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            יוצר דף...
          </>
        ) : (
          <>
            <SparklesIcon className="ml-2" />
            ייצר דף נחיתה
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;