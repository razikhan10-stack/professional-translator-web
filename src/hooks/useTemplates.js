import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Mock data fallback if supabase is not configured yet
const MOCK_DATA = [
  {
    id: '1',
    title_ur: 'بیع نامہ',
    title_en: 'Sale Deed',
    language: 'urdu',
    category: 'Property',
    form_fields: [
      { key: 'party1', label: 'فروخت کنندہ کا نام' },
      { key: 'party2', label: 'خریدار کا نام' },
      { key: 'price', label: 'قیمت فروخت (روپے)' },
      { key: 'date', label: 'تاریخ', type: 'date' }
    ],
    html_template: '<div class="doc-header"><div class="doc-title-urdu">بیع نامہ</div></div><div class="doc-body"><p class="urdu-text" dir="rtl">یہ بیع نامہ آج بتاریخ <b>{{date}}</b> کو تحریر کیا گیا۔</p><p class="urdu-text" dir="rtl">فروخت کنندہ: {{party1}}</p><p class="urdu-text" dir="rtl">خریدار: {{party2}}</p><p class="urdu-text" dir="rtl">قیمت: {{price}}</p></div>'
  },
  {
    id: '2',
    title_ur: 'حلف نامہ',
    title_en: 'Sworn Affidavit',
    language: 'english',
    category: 'Legal',
    form_fields: [
      { key: 'deponent', label: 'Deponent Name' },
      { key: 'subject', label: 'Subject of Affidavit' },
      { key: 'date', label: 'Date', type: 'date' }
    ],
    html_template: '<div class="doc-header"><div class="doc-title-eng">SWORN AFFIDAVIT</div></div><div class="doc-body"><p>This Affidavit is sworn on <b>{{date}}</b>.</p><p>I, {{deponent}}, do hereby solemnly affirm and declare that:</p><p>{{subject}}</p></div>'
  }
];

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [groupedTemplates, setGroupedTemplates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        let data = [];
        
        if (supabase) {
          const { data: dbData, error: dbError } = await supabase
            .from('templates')
            .select('*');
          
          if (dbError) throw dbError;
          data = dbData || [];
        } else {
          // Fallback to mock data if supabase env vars are missing
          console.warn('Supabase not configured. Using mock data.');
          data = MOCK_DATA;
        }

        setTemplates(data);

        // Group: Language -> Category -> Templates
        const grouped = data.reduce((acc, curr) => {
          const lang = curr.language || 'uncategorized';
          const cat = curr.category || 'uncategorized';

          if (!acc[lang]) acc[lang] = {};
          if (!acc[lang][cat]) acc[lang][cat] = [];

          acc[lang][cat].push(curr);
          return acc;
        }, {});

        setGroupedTemplates(grouped);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  return { templates, groupedTemplates, loading, error };
}
