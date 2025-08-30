"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Snippet, SnippetFormData, LANGUAGES } from "@/types";
import { FormEvent, useState } from "react";

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
  const [tags, setTags] = useState(initialData?.tags ?? "");
  const [code, setCode] = useState(initialData?.code ?? "");

  // submit form

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, tags, description, code, language });
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
          value={tags}
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
        >
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
        <Textarea
          id="code"
          rows={6}
          className="w-full border rounded p-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
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
