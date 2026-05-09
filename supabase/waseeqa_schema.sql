CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ur TEXT,
  title_en TEXT,
  language TEXT CHECK (language IN ('urdu', 'english')),
  category TEXT,
  form_fields JSONB,
  html_template TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert Dummy Data
INSERT INTO templates (title_ur, title_en, language, category, form_fields, html_template)
VALUES (
  'بیع نامہ',
  'Sale Deed',
  'urdu',
  'Property',
  '[
    {"key": "party1", "label": "فروخت کنندہ کا نام"},
    {"key": "party2", "label": "خریدار کا نام"},
    {"key": "price", "label": "قیمت فروخت (روپے)"},
    {"key": "date", "label": "تاریخ", "type": "date"}
  ]',
  '<div class="doc-header"><div class="doc-title-urdu">بیع نامہ</div></div><div class="doc-body"><p class="urdu-text" dir="rtl">یہ بیع نامہ آج بتاریخ <b>{{date}}</b> کو تحریر کیا گیا۔</p><p class="urdu-text" dir="rtl">فروخت کنندہ: {{party1}}</p><p class="urdu-text" dir="rtl">خریدار: {{party2}}</p><p class="urdu-text" dir="rtl">قیمت: {{price}}</p></div>'
),
(
  'حلف نامہ',
  'Sworn Affidavit',
  'english',
  'Legal',
  '[
    {"key": "deponent", "label": "Deponent Name"},
    {"key": "subject", "label": "Subject of Affidavit"},
    {"key": "date", "label": "Date", "type": "date"}
  ]',
  '<div class="doc-header"><div class="doc-title-eng">SWORN AFFIDAVIT</div></div><div class="doc-body"><p>This Affidavit is sworn on <b>{{date}}</b>.</p><p>I, <b>{{deponent}}</b>, do hereby solemnly affirm and declare that:</p><div class="scope-box"><p>{{subject}}</p></div></div>'
);
