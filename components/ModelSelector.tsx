'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClosedSourceModel, OpenSourceModel } from '@/types';

const closedSourceModels: ClosedSourceModel[] = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai' },
];

const openSourceModels: OpenSourceModel[] = [
  { id: 'bart-large-cnn', name: 'BART Large CNN', huggingface_id: 'facebook/bart-large-cnn' },
  { id: 'pegasus-xsum', name: 'Pegasus XSum', huggingface_id: 'google/pegasus-xsum' },
  { id: 'flan-t5-base', name: 'FLAN-T5 Base', huggingface_id: 'google/flan-t5-base' },
];

interface ModelSelectorProps {
  closedModel: string;
  openModel: string;
  onClosedModelChange: (model: string) => void;
  onOpenModelChange: (model: string) => void;
}

export default function ModelSelector({ 
  closedModel, 
  openModel, 
  onClosedModelChange, 
  onOpenModelChange 
}: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔒 Closed-Source Models
          </CardTitle>
          <CardDescription>
            Commercial API-based models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="closed-model">Select Model</Label>
            <Select value={closedModel} onValueChange={onClosedModelChange}>
              <SelectTrigger id="closed-model">
                <SelectValue placeholder="Choose a closed-source model" />
              </SelectTrigger>
              <SelectContent>
                {closedSourceModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌐 Open-Source Models
          </CardTitle>
          <CardDescription>
            HuggingFace hosted models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="open-model">Select Model</Label>
            <Select value={openModel} onValueChange={onOpenModelChange}>
              <SelectTrigger id="open-model">
                <SelectValue placeholder="Choose an open-source model" />
              </SelectTrigger>
              <SelectContent>
                {openSourceModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 