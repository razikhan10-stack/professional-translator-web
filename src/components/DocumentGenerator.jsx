import React, { useState, useEffect } from "react";
import html2pdf from 'html2pdf.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewModal from "./PreviewModal";

const getPrintStyle = (paperSize = 'A4', orientation = 'portrait') => `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
    body { font-family: 'Noto Nastaliq Urdu', serif; }
    .doc-header { text-align: center; border-bottom: 3px double #333; padding-bottom: 12px; margin-bottom: 20px; }
    .doc-title-urdu { font-size: 28px; font-weight: 700; direction: rtl; }
    .doc-title-eng { font-size: 18px; font-weight: 600; letter-spacing: 2px; direction: ltr; font-family: Arial; }
    .doc-sub { font-size: 13px; color: #555; direction: ltr; font-family: Arial; }
    .doc-body { font-size: 14px; line-height: 2; }
    .urdu-text { direction: rtl; text-align: right; font-family: 'Noto Nastaliq Urdu', serif; }
    .section-title { background: #2c3e50; color: white; padding: 4px 12px; margin: 16px 0 8px; font-size: 13px; font-weight: 600; direction: ltr; font-family: Arial; }
    .party-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    .party-table td { border: 1px solid #ccc; padding: 5px 10px; font-size: 13px; }
    .party-table td:first-child { width: 40%; background: #f5f5f5; font-weight: 600; }
    .clauses { margin: 16px 0; padding: 12px; border: 1px solid #ddd; }
    .scope-box { background: #f9f9f9; border-left: 3px solid #2c3e50; padding: 8px 12px; margin: 8px 0; }
    .signature-section, .witness-section { display: flex; justify-content: space-around; margin-top: 40px; }
    .sig-box { text-align: center; min-width: 200px; font-size: 12px; }
    .sig-line { border-bottom: 1px solid #333; height: 40px; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; table-layout: fixed; page-break-inside: auto; }
    tr { page-break-inside: avoid; page-break-after: auto; }
    thead { display: table-header-group; }
    tfoot { display: table-footer-group; }
    th, td { border: 1px solid #ccc; padding: 8px; font-size: 13px; position: relative; word-wrap: break-word; }
    th { background: #f5f5f5; font-weight: 600; }
  </style>
`;

function injectTemplate(htmlTemplate, vals) {
  if (!htmlTemplate) return "";
  let injected = htmlTemplate;
  const placeholders = htmlTemplate.match(/{{(.*?)}}/g) || [];
  placeholders.forEach(ph => {
    const key = ph.replace(/{{|}}/g, '').trim();
    const val = vals[key] || "_________________";
    injected = injected.replace(new RegExp(ph, 'g'), val);
  });
  return injected;
}

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-col gap-3 mb-4 p-3 bg-muted/50 rounded-md border border-muted">
      <div className="flex flex-wrap items-start justify-between gap-4 w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-muted' : ''}>Bold</Button>
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-muted' : ''}>Italic</Button>
          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>Undo</Button>
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>Redo</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}>Left</Button>
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}>Center</Button>
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}>Right</Button>
          <Button variant="outline" size="sm" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}>Justify</Button>
        </div>
      </div>
      <div className="w-full h-px bg-border my-1" />
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Table</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}>+Col Before</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}>+Col After</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}>-Col</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}>+Row Before</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}>+Row After</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}>-Row</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}>-Table</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}>Merge</Button>
        <Button variant="outline" size="sm" className="cursor-pointer disabled:cursor-not-allowed" onMouseDown={(e) => e.preventDefault()} onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}>Split</Button>
      </div>
    </div>
  );
};

export default function DocumentGenerator() {
  const [templates, setTemplates] = useState([]);
  const [groupedTemplates, setGroupedTemplates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [vals, setVals] = useState({});
  const [paperSize, setPaperSize] = useState("A4");
  const [orientation, setOrientation] = useState("portrait");
  const [selectionUpdate, setSelectionUpdate] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fields = selectedTemplate?.form_fields || [];
  const isUrdu = selectedTemplate?.language === 'urdu';

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setIsLoading(true);
        const { data, error: dbError } = await supabase.from('templates').select('*');
        if (dbError) throw dbError;
        
        setTemplates(data || []);
        
        const grouped = (data || []).reduce((acc, template) => {
          const cat = template.category || 'Uncategorized';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(template);
          return acc;
        }, {});
        
        setGroupedTemplates(grouped);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching templates:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    onTransaction: () => {
      setSelectionUpdate(prev => prev + 1);
    },
    editorProps: {
      attributes: {
        className: 'focus:outline-none min-h-[297mm] p-10 bg-white shadow-md print:shadow-none print:p-0 text-black [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-400 [&_table]:table-fixed [&_table_td]:border [&_table_td]:border-gray-300 [&_table_td]:p-2 [&_table_td]:relative [&_table_td]:break-words [&_table_th]:border [&_table_th]:border-gray-300 [&_table_th]:p-2 [&_table_th]:bg-gray-100 [&_table_th]:relative [&_table_th]:font-bold [&_table_th]:break-words',
      },
    },
  });

  useEffect(() => {
    if (editor && selectedTemplate) {
      const newHtml = injectTemplate(selectedTemplate.html_template, vals);
      editor.commands.setContent(newHtml);
    }
  }, [vals, selectedTemplate, editor]);

  function handleChange(key, val) {
    setVals((v) => ({ ...v, [key]: val }));
  }

  function clearForm() {
    setVals({});
  }

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-mold');
    const opt = {
      margin:       0, // Margins are handled by the Tailwind padding in the mold
      filename:     'Document.pdf',
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true }, // Scale 2 for crisp text
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (isLoading) return <div className="flex items-center justify-center h-full bg-background text-foreground">Loading templates...</div>;
  if (error) return <div className="flex items-center justify-center h-full bg-background text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-full w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Sidebar - Templates List Grouped */}
      <div className="w-72 flex-shrink-0 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b bg-muted/50">
          <h2 className="text-xl font-bold font-['Noto_Nastaliq_Urdu',_serif] text-right" dir="rtl">وثیقہ نویس سافٹ ویئر</h2>
          <p className="text-xs text-muted-foreground mt-1 text-right">Waseeqa Navees</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {Object.keys(groupedTemplates).length === 0 && !isLoading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No templates found.</div>
          ) : (
            Object.keys(groupedTemplates).map((category) => (
              <div key={category} className="mb-2">
                <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/20 border-y border-muted/50 sticky top-0 z-10">
                  {category}
                </h3>
                {groupedTemplates[category].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => { setSelectedTemplate(template); setVals({}); }}
                    className={`w-full text-right px-6 py-3 border-b border-muted/30 flex flex-col gap-1 transition-colors hover:bg-muted/50 ${selectedTemplate?.id === template.id ? "bg-primary/10 border-r-4 border-r-primary" : ""}`}
                  >
                    <span className="font-medium text-sm font-['Noto_Nastaliq_Urdu',_serif] text-foreground" dir="rtl">{template.title}</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Form Area */}
      <div className="w-80 flex-shrink-0 border-r bg-background flex flex-col">
        {selectedTemplate ? (
          <>
            <div className="p-4 border-b bg-muted/10">
              <h3 className="text-lg font-bold font-['Noto_Nastaliq_Urdu',_serif] text-right" dir="rtl">{selectedTemplate.title}</h3>
              {selectedTemplate.category && <p className="text-xs text-muted-foreground text-right">{selectedTemplate.category}</p>}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1.5 flex flex-col items-end">
                  <Label className="text-right w-full text-xs" dir={isUrdu ? "rtl" : "ltr"}>{field.label}</Label>
                  <Input
                    type={field.type || "text"}
                    value={vals[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.type === "date" ? "" : (isUrdu ? "یہاں لکھیں..." : "Type here...")}
                    className={isUrdu ? "text-right" : "text-left"}
                    dir={field.type === "date" ? "ltr" : (isUrdu ? "rtl" : "ltr")}
                  />
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-muted/10 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearForm}>{isUrdu ? "Clear / صاف" : "Clear"}</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center text-sm">
            Please select a template from the sidebar to start drafting.
          </div>
        )}
      </div>

      {/* Preview Area (TipTap Editor) */}
      <div className="flex-1 bg-muted/30 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
          {selectedTemplate ? (
            <div className="w-full max-w-[740px] flex flex-col gap-4">
              <div className="flex justify-end w-full gap-2">
                <div className="flex gap-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-lg border shadow-sm">
                  <Select value={paperSize} onValueChange={setPaperSize}>
                    <SelectTrigger className="w-[100px] h-9">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger className="w-[120px] h-9">
                      <SelectValue placeholder="Orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setIsPreviewOpen(true)} variant="outline" className="h-9 shadow-sm bg-white hover:bg-gray-100">
                    👁️ Preview Document
                  </Button>
                  <Button onClick={handleDownloadPDF} className="h-9 shadow-sm bg-blue-600 hover:bg-blue-700 text-white">
                    ⬇️ Download PDF
                  </Button>
                </div>
              </div>
              <EditorToolbar editor={editor} />
              <div dir={isUrdu ? "rtl" : "ltr"}>
                <style dangerouslySetInnerHTML={{ __html: getPrintStyle(paperSize, orientation).replace(/<style>|<\/style>/g, "") }} />
                <EditorContent editor={editor} />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground flex-col gap-4">
               <div className="text-4xl opacity-20">📄</div>
               <p>Document preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Print Container */}
      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
        {/* Specific CSS to force vertical centering only for the PDF export */}
        <style>{`
          #pdf-mold td, #pdf-mold th {
            vertical-align: middle !important;
          }
          #pdf-mold td p, #pdf-mold th p {
            margin: 0 !important;
            padding: 0 !important;
            min-height: 0 !important; /* Kills the phantom empty space */
            line-height: normal !important;
          }
          /* Add breathing room around the outside of the table */
          #pdf-mold table {
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          /* Ensure normal text paragraphs outside the table have standard spacing */
          #pdf-mold > p {
            margin-bottom: 1rem !important;
          }
        `}</style>
        <div 
          id="pdf-mold" 
          className="w-[794px] bg-white text-black p-[20mm] ProseMirror"
          dangerouslySetInnerHTML={{ __html: editor ? editor.getHTML() : '' }} 
        />
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        htmlContent={editor ? editor.getHTML() : ''}
        onDownload={handleDownloadPDF}
      />
    </div>
  );
}
