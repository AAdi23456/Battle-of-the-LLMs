'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { SummaryRating, Rating } from '@/types';
import { Star, CheckCircle2, Brain, Scissors } from 'lucide-react';

interface RatingPanelProps {
  onRatingSubmit: (rating: SummaryRating) => void;
  closedModel: string;
  openModel: string;
  disabled?: boolean;
}

const RatingCategory = ({ 
  icon, 
  title, 
  description, 
  value, 
  onChange 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <Label className="text-sm font-medium">{title}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="px-3">
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        max={5}
        min={1}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>1</span>
        <span className="font-medium">{value}</span>
        <span>5</span>
      </div>
    </div>
  </div>
);

export default function RatingPanel({ 
  onRatingSubmit, 
  closedModel, 
  openModel, 
  disabled = false 
}: RatingPanelProps) {
  const [closedRating, setClosedRating] = useState<Rating>({
    clarity: 3,
    accuracy: 3,
    conciseness: 3,
  });

  const [openRating, setOpenRating] = useState<Rating>({
    clarity: 3,
    accuracy: 3,
    conciseness: 3,
  });

  const [preferredModel, setPreferredModel] = useState<'closed' | 'open'>('closed');

  const handleSubmit = () => {
    const rating: SummaryRating = {
      closedRating,
      openRating,
      preferredModel,
    };
    onRatingSubmit(rating);
  };

  const updateClosedRating = (category: keyof Rating, value: number) => {
    setClosedRating(prev => ({ ...prev, [category]: value }));
  };

  const updateOpenRating = (category: keyof Rating, value: number) => {
    setOpenRating(prev => ({ ...prev, [category]: value }));
  };

  if (disabled) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rate the Summaries
          </CardTitle>
          <CardDescription>
            Generate summaries first to enable rating
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Rate the Summaries
        </CardTitle>
        <CardDescription>
          Compare and rate both summaries on different criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Closed-Source Rating */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="font-semibold">Rate {closedModel?.toUpperCase()}</h3>
            </div>
            
            <RatingCategory
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              title="Clarity"
              description="How clear and understandable is the summary?"
              value={closedRating.clarity}
              onChange={(value) => updateClosedRating('clarity', value)}
            />

            <RatingCategory
              icon={<Brain className="h-4 w-4 text-purple-500" />}
              title="Accuracy"
              description="How well does it capture the main points?"
              value={closedRating.accuracy}
              onChange={(value) => updateClosedRating('accuracy', value)}
            />

            <RatingCategory
              icon={<Scissors className="h-4 w-4 text-orange-500" />}
              title="Conciseness"
              description="How well does it avoid unnecessary details?"
              value={closedRating.conciseness}
              onChange={(value) => updateClosedRating('conciseness', value)}
            />
          </div>

          {/* Open-Source Rating */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold">Rate {openModel?.replace('-', ' ').toUpperCase()}</h3>
            </div>
            
            <RatingCategory
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              title="Clarity"
              description="How clear and understandable is the summary?"
              value={openRating.clarity}
              onChange={(value) => updateOpenRating('clarity', value)}
            />

            <RatingCategory
              icon={<Brain className="h-4 w-4 text-purple-500" />}
              title="Accuracy"
              description="How well does it capture the main points?"
              value={openRating.accuracy}
              onChange={(value) => updateOpenRating('accuracy', value)}
            />

            <RatingCategory
              icon={<Scissors className="h-4 w-4 text-orange-500" />}
              title="Conciseness"
              description="How well does it avoid unnecessary details?"
              value={openRating.conciseness}
              onChange={(value) => updateOpenRating('conciseness', value)}
            />
          </div>
        </div>

        {/* Preference Selection */}
        <div className="space-y-4 pt-6 border-t">
          <Label className="text-base font-semibold">Which summary do you prefer overall?</Label>
          <RadioGroup value={preferredModel} onValueChange={(value) => setPreferredModel(value as 'closed' | 'open')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed" className="flex items-center gap-2">
                🔒 {closedModel?.toUpperCase()} Summary
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open" className="flex items-center gap-2">
                🌐 {openModel?.replace('-', ' ').toUpperCase()} Summary
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          Submit Rating
        </Button>
      </CardContent>
    </Card>
  );
} 