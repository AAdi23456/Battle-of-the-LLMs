'use client';

import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century, fundamentally reshaping how we work, communicate, and solve complex problems. From its humble beginnings in the 1950s as a theoretical concept, AI has evolved into a practical reality that powers everything from smartphone assistants to autonomous vehicles.

Machine learning, a subset of AI, enables computers to learn patterns from data without explicit programming. This breakthrough has led to remarkable advances in natural language processing, computer vision, and predictive analytics. Companies across industries are leveraging AI to optimize operations, enhance customer experiences, and drive innovation.

However, the rapid advancement of AI also raises important questions about ethics, privacy, and the future of work. As AI systems become more sophisticated, society must grapple with ensuring responsible development and deployment. The key to harnessing AI's potential lies in balancing innovation with careful consideration of its societal impact, ensuring that these powerful technologies serve to augment human capabilities rather than replace them entirely.

The future of AI promises even more exciting developments, from personalized medicine to climate change solutions, making it essential for individuals and organizations to understand and adapt to this technological revolution.`;

interface InputBoxProps {
  text: string;
  onTextChange: (text: string) => void;
}

export default function InputBox({ text, onTextChange }: InputBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTextChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTextChange(content);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleText = () => {
    onTextChange(SAMPLE_TEXT);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Input Text
        </CardTitle>
        <CardDescription>
          Enter or upload text to summarize (500-1000 words recommended)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Text to Summarize</Label>
          <div
            className={`relative ${isDragging ? 'opacity-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Textarea
              id="input-text"
              placeholder="Paste your text here or drag and drop a .txt file..."
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            {isDragging && (
              <div className="absolute inset-0 border-2 border-dashed border-primary rounded-md flex items-center justify-center bg-background/80">
                <p className="text-sm text-muted-foreground">Drop your .txt file here</p>
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {text.length} characters • {text.split(' ').filter(word => word.length > 0).length} words
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload .txt file
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={loadSampleText}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Load Sample Text
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
} 