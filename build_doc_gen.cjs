const fs = require('fs');

const oldPath = 'e:/scribo/WaseeqaNavees.jsx';
const newPath = 'e:/scribo/professional-translator-web/src/components/DocumentGenerator.jsx';

const content = fs.readFileSync(oldPath, 'utf8');
const logicMatch = content.match(/const TEMPLATES = \[[\s\S]*?const PRINT_STYLE = [\s\S]*?;\n/);
if (!logicMatch) {
  console.error('Logic not found!');
  process.exit(1);
}
const logic = logicMatch[0];

const component = `import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

${logic}

export default function DocumentGenerator() {
  const [selected, setSelected] = useState("baiinama");
  const [vals, setVals] = useState({});

  const tmpl = TEMPLATES.find((t) => t.id === selected);
  const fields = FIELDS[selected] || [];

  function handleChange(key, val) {
    setVals((v) => ({ ...v, [key]: val }));
  }

  function clearForm() {
    setVals({});
  }

  function printDoc() {
    const docHTML = generateDocument(selected, vals);
    const win = window.open("", "_blank");
    win.document.write(
      "<!DOCTYPE html><html><head><meta charset=\\"UTF-8\\"><title>" +
      tmpl.urdu + " - " + tmpl.english +
      "</title>" + PRINT_STYLE + "</head><body>" + docHTML + "</body></html>"
    );
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  }

  const docHTML = generateDocument(selected, vals);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b bg-muted/50">
          <h2 className="text-xl font-bold font-['Noto_Nastaliq_Urdu',_serif] text-right" dir="rtl">وثیقہ نویس سافٹ ویئر</h2>
          <p className="text-xs text-muted-foreground mt-1 text-right">Waseeqa Navees</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelected(t.id); setVals({}); }}
              className={\`w-full text-right px-4 py-3 border-b flex flex-col gap-1 transition-colors hover:bg-muted/50 \${selected === t.id ? "bg-primary/10 border-r-4 border-r-primary" : ""}\`}
            >
              <span className="font-medium text-base font-['Noto_Nastaliq_Urdu',_serif] text-foreground" dir="rtl">{t.urdu}</span>
              <span className="text-xs text-muted-foreground">{t.english}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="w-80 flex-shrink-0 border-r bg-background flex flex-col">
        <div className="p-4 border-b bg-muted/10">
          <h3 className="text-lg font-bold font-['Noto_Nastaliq_Urdu',_serif] text-right" dir="rtl">{tmpl.urdu}</h3>
          <p className="text-xs text-muted-foreground text-right">{tmpl.english}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-1.5 flex flex-col items-end">
              <Label className="text-right w-full text-xs" dir="rtl">{field.label}</Label>
              <Input
                type={field.type || "text"}
                value={vals[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.type === "date" ? "" : "یہاں لکھیں..."}
                className="text-right"
                dir={field.type === "date" ? "ltr" : "rtl"}
              />
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-muted/10 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={clearForm}>Clear / صاف</Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-muted/30 flex flex-col overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
           <Button onClick={printDoc} className="shadow-sm">
             🖨️ Print / پرنٹ
           </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div 
            className="bg-white mx-auto shadow-md rounded-sm p-10 print:shadow-none print:p-0 text-black" 
            style={{ minHeight: "297mm", maxWidth: "740px" }}
          >
            <style dangerouslySetInnerHTML={{ __html: PRINT_STYLE.replace(/<style>|<\\/style>/g, "") }} />
            <div dangerouslySetInnerHTML={{ __html: docHTML }} />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(newPath, component, 'utf8');
console.log('Successfully created DocumentGenerator.jsx');
