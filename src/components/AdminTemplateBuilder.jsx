import React, { useState } from "react";
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



const AdminToolbar = ({ editor }) => {
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

export default function AdminTemplateBuilder() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Family");
  const [customCategory, setCustomCategory] = useState("");
  const [language, setLanguage] = useState("urdu");
  const [isSaving, setIsSaving] = useState(false);
  const [selectionUpdate, setSelectionUpdate] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Start designing your master template here...</p>",
    onTransaction: () => {
      setSelectionUpdate(prev => prev + 1);
    },
    editorProps: {
      attributes: {
        className: 'focus:outline-none min-h-[800px] p-10 bg-white shadow-md text-black [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-400 [&_table]:table-fixed [&_table_td]:border [&_table_td]:border-gray-300 [&_table_td]:p-2 [&_table_td]:relative [&_table_td]:break-words [&_table_th]:border [&_table_th]:border-gray-300 [&_table_th]:p-2 [&_table_th]:bg-gray-100 [&_table_th]:relative [&_table_th]:font-bold [&_table_th]:break-words',
      },
    },
  });

  const handleSave = async () => {
    const finalCategoryString = category === "new" ? customCategory : category;

    if (!title.trim()) {
      alert("Please provide a Template Title.");
      return;
    }
    if (!finalCategoryString.trim()) {
      alert("Please provide a category.");
      return;
    }
    if (!editor) return;

    setIsSaving(true);
    const rawHtml = editor.getHTML();

    try {
      console.log("ATTEMPTING TO SAVE TEMPLATE:", title, "CATEGORY:", finalCategoryString);
      const { error } = await supabase.from('templates').insert([{
        title: title,
        category: finalCategoryString,
        html_template: rawHtml
      }]);

      if (error) throw error;

      alert(`Successfully saved "${title}" to the templates table!`);
      setTitle("");
      if (category === "new") setCustomCategory("");
      // Optionally reset the editor here if needed
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving template: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/30">
        <div className="p-8 bg-background border rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 p-8 overflow-y-auto">
      <div className="max-w-5xl w-full mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Master Template Builder</h1>
          <p className="text-muted-foreground mt-2">Design your tip-tap templates and save them directly to the database.</p>
        </div>

        <AdminToolbar editor={editor} />

        <div className="border rounded-md overflow-hidden shadow-sm bg-white">
          <EditorContent editor={editor} />
        </div>

        <div className="bg-background p-6 rounded-lg border shadow-sm space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Save Template</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="template-title">Template Title</Label>
              <Input
                id="template-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Marriage Deed"
              />
            </div>
            <div className="w-full sm:w-1/4 space-y-2">
              <Label htmlFor="template-category">Document Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="template-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Property">Property</SelectItem>
                  <SelectItem value="new">+ Add New Category</SelectItem>
                </SelectContent>
              </Select>
              {category === "new" && (
                <div className="mt-2">
                  <Input
                    placeholder="Type custom category..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="w-full sm:w-1/4 space-y-2">
              <Label htmlFor="template-language">Document Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="template-language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urdu">Urdu</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto mt-4">
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>
    </div>
  );
}
