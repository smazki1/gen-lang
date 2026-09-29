import type { LandingPageData } from "./types";

export const PALETTE_OPTIONS = [
    { value: "Modern & Minimalistic (slate, white, black)", label: "מודרני ומינימליסטי" },
    { value: "Vibrant & Energetic (orange, yellow, pink)", label: "תוסס ואנרגטי" },
    { value: "Corporate & Professional (blue, gray, white)", label: "תאגידי ומקצועי" },
    { value: "Elegant & Luxurious (gold, black, cream)", label: "אלגנטי ויוקרתי" },
    { value: "Friendly & Approachable (cyan, green, light-gray)", label: "ידידותי ונגיש" },
    { value: "Nature & Eco-friendly (green, brown, beige)", label: "טבעי וידידותי לסביבה" },
];

export const PAGE_TYPE_OPTIONS = [
    { value: "Lead Generation (form-focused)", label: "איסוף לידים (מבוסס טופס)" },
    { value: "SaaS Signup", label: "הרשמה ל-SaaS" },
    { value: "Product Showcase", label: "הצגת מוצר" },
    { value: "Event Promotion", label: "קידום אירוע" },
    { value: "Click-through to another page", label: "הקלקה לדף אחר (Click-through)" },
];

export const TONE_OF_VOICE_OPTIONS = [
    { value: "Professional & Corporate", label: "מקצועי ותאגידי" },
    { value: "Friendly & Casual", label: "ידידותי וקליל" },
    { value: "Persuasive & High-energy", label: "משכנע ואנרגטי" },
    { value: "Humorous & Witty", label: "הומוריסטי ושנון" },
    { value: "Calm & Reassuring", label: "רגוע ומרגיע" },
];

export const generatePrompt = (data: LandingPageData): string => {
    const featuresList = data.features.filter(f => f.trim() !== '').map(f => `- ${f}`).join('\n');

    return `
אתה מומחה בפיתוח אתרים ועיצוב UI/UX, המתמחה ביצירת דפי נחיתה מרהיבים עם אחוזי המרה גבוהים.
המשימה שלך היא לייצר מסמך HTML שלם בקובץ יחיד עבור דף נחיתה, בהתבסס על המפרט המפורט של המשתמש.

**הוראות קריטיות:**
1.  **פלט בקובץ יחיד:** כל התגובה שלך חייבת להיות מסמך HTML יחיד. אל תכלול עיצוב Markdown כמו \`\`\`html או כל הסבר, הקדמה או סיום. התגובה שלך צריכה להתחיל ב-\`<!DOCTYPE html>\` ולהסתיים ב-\`</html>\`.
2.  **עיצוב:** השתמש ב-Tailwind CSS באופן בלעדי לעיצוב. עליך לכלול את סקריפט ה-CDN של Tailwind CSS, \`<script src="https://cdn.tailwindcss.com"></script>\`, בתוך תג ה-\`<head>\` של מסמך ה-HTML.
3.  **רספונסיביות:** הפריסה חייבת להיות רספונסיבית לחלוטין ולהיראות יוצאת דופן בכל גדלי המסכים, ממכשירים ניידים קטנים ועד לצגי מחשב גדולים. השתמש באופן נרחב בכלי עזר רספונסיביים (למשל, \`md:\`, \`lg:\`).
4.  **מבנה סמנטי:** השתמש בתגי HTML5 סמנטיים כמו \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`. המבנה צריך להיות מותאם למטרת הדף שצוינה (למשל, דף איסוף לידים יתמקד בטופס בולט).
5.  **שילוב תוכן:** שלב בצורה חלקה את הפרטים שסופקו על ידי המשתמש בעיצוב. התוכן צריך להיות כתוב בטון ובסגנון שהוגדר, ולזרום באופן הגיוני ומשכנע.
6.  **אסתטיקה ואינטראקטיביות:**
    *   העיצוב חייב להיות מודרני, נקי ושובה עין.
    *   שים לב היטב לטיפוגרפיה, ריווח לבן והיררכיה חזותית.
    *   שלב את העדפת פלטת הצבעים של המשתמש בעיצוב.
    *   הוסף אנימציות ומעברים עדינים וטובים (למשל, במעבר עכבר, בגלילה) כדי לגרום לדף להרגיש דינמי ואינטראקטיבי.
7.  **תמונות:** השתמש בתמונות placeholder מ-\`https://picsum.photos/seed/{some_random_word}/width/height\` כדי להפוך את הדף לעשיר ויזואלית. השתמש ב-seeds שונים ויצירתיים לכל תמונה כדי להבטיח גיוון.
8.  **לוגו:** השתמש ב-"לוגו טקסט" שסופק כדי ליצור לוגו מבוסס טקסט בכותרת העליונה (header). עצב אותו בצורה בולטת.

**מפרט המשתמש המלא:**

---

**1. זהות המותג:**
-   **לוגו טקסט:** ${data.logoText || data.businessName}
-   **שם העסק:** ${data.businessName}
-   **תיאור המוצר/שירות:** ${data.description}
-   **אימייל ליצירת קשר (לפוטר):** ${data.contactEmail}

**2. אסטרטגיה ותוכן:**
-   **מטרת הדף:** ${data.pageType}
-   **קהל יעד:** ${data.targetAudience}
-   **טון וסגנון הכתיבה:** ${data.toneOfVoice}
-   **תכונות/יתרונות מרכזיים:**
${featuresList}
-   **טקסט קריאה לפעולה (CTA):** ${data.cta}

**3. עיצוב וחזותיות:**
-   **העדפת פלטת צבעים:** ${data.palette}

---

כעת, ייצר את קובץ ה-HTML המלא והמרהיב כפי שהונחית.
`;
};