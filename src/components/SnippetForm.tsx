"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Snippet, SnippetFormData, LANGUAGES, Language } from "@/types";
import { FormEvent, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { getMonacoLanguage } from "@/lib/utils";

interface SnippetFormProps {
  initialData?: Partial<SnippetFormData>;
  onSubmit: (data: SnippetFormData) => void;
}

export default function SnippetForm({
  initialData,
  onSubmit,
}: SnippetFormProps) {
  /* States */
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [language, setLanguage] = useState(initialData?.language ?? "");
  const [tag, setTags] = useState(initialData?.tag ?? "");
  const [code, setCode] = useState(initialData?.code ?? "");

  // submit form

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, tag, description, code, language });
  };

  return (
    <form className="space-y-4 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          rows={5}
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="tag" className="block text-sm font-medium">
          Tags
        </label>
        <Input
          id="tag"
          type="text"
          className="w-full border rounded p-2"
          value={tag}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium">
          Language
        </label>
        <select
          name="languages"
          id="language"
          className="w-full border rounded p-2"
          onChange={(e) =>
            setLanguage(e.target.value as SnippetFormData["language"])
          }
          value={language}
        >
          <option value="">Select Language</option>
          {LANGUAGES.map((language) => (
            <option key={language.label} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium">
          Code snippet
        </label>
        <Editor
          height={"300px"}
          language={getMonacoLanguage(language as Language)}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            automaticLayout: true,
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            parameterHints: { enabled: false },
            hover: { enabled: false },
            renderValidationDecorations: "off",
            folding: true,
            autoClosingBrackets: "always",
            wordWrap: "on",
            formatOnType: true,
            contextmenu: false
          }}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Snippet
      </button>
    </form>
  );
}
