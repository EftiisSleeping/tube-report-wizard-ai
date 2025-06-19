
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles } from "lucide-react";
import { ChannelData } from "@/pages/Index";

interface ChannelInfoStepProps {
  initialData: ChannelData;
  onComplete: (data: ChannelData) => void;
}

const ChannelInfoStep = ({ initialData, onComplete }: ChannelInfoStepProps) => {
  const [formData, setFormData] = useState<ChannelData>(initialData);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleInputChange = (field: keyof ChannelData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        handleInputChange('channelLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIComment = () => {
    const comments = [
      "This channel shows strong potential for growth with consistent content delivery and good engagement metrics.",
      "The subscriber-to-view ratio indicates healthy audience engagement and content relevance.",
      "Based on the data, this channel demonstrates solid performance in its niche with room for optimization.",
      "The channel metrics suggest a well-established presence with opportunities for strategic improvements.",
      "Strong foundation metrics indicate this channel is positioned well for continued growth and success."
    ];
    
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    handleInputChange('channelComment', randomComment);
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Channel Information</h3>
        <p className="text-slate-300">Enter the basic details about the YouTube channel</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="channelName" className="text-white">Channel Name</Label>
            <Input
              id="channelName"
              value={formData.channelName}
              onChange={(e) => handleInputChange('channelName', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="Enter channel name"
            />
          </div>

          <div>
            <Label htmlFor="channelLogo" className="text-white">Channel Logo</Label>
            <div className="mt-1">
              <input
                type="file"
                id="channelLogo"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('channelLogo')?.click()}
                className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              {logoPreview && (
                <div className="mt-2">
                  <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-lg object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="totalSubscribers" className="text-white">Total Subscribers</Label>
            <Input
              id="totalSubscribers"
              value={formData.totalSubscribers}
              onChange={(e) => handleInputChange('totalSubscribers', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., 1.2M"
            />
          </div>

          <div>
            <Label htmlFor="totalViews" className="text-white">Total Views</Label>
            <Input
              id="totalViews"
              value={formData.totalViews}
              onChange={(e) => handleInputChange('totalViews', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., 50M"
            />
          </div>

          <div>
            <Label htmlFor="channelLink" className="text-white">Channel Link</Label>
            <Input
              id="channelLink"
              value={formData.channelLink}
              onChange={(e) => handleInputChange('channelLink', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="https://youtube.com/@channel"
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-white">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., United States"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="niche" className="text-white">Niche</Label>
            <Input
              id="niche"
              value={formData.niche}
              onChange={(e) => handleInputChange('niche', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., Technology, Gaming, Education"
            />
          </div>

          <div>
            <Label htmlFor="channelCreateDate" className="text-white">Channel Created Date</Label>
            <Input
              id="channelCreateDate"
              type="date"
              value={formData.channelCreateDate}
              onChange={(e) => handleInputChange('channelCreateDate', e.target.value)}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>

          <div>
            <Label htmlFor="totalVideos" className="text-white">Total Videos</Label>
            <Input
              id="totalVideos"
              value={formData.totalVideos}
              onChange={(e) => handleInputChange('totalVideos', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., 245"
            />
          </div>

          <div>
            <Label htmlFor="last30DayViews" className="text-white">Last 30 Day Views</Label>
            <Input
              id="last30DayViews"
              value={formData.last30DayViews}
              onChange={(e) => handleInputChange('last30DayViews', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., 2.5M"
            />
          </div>

          <div>
            <Label htmlFor="last30DaySubscribers" className="text-white">Last 30 Day Subscribers</Label>
            <Input
              id="last30DaySubscribers"
              value={formData.last30DaySubscribers}
              onChange={(e) => handleInputChange('last30DaySubscribers', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              placeholder="e.g., 15K"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="channelComment" className="text-white">Channel Analysis Comment</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateAIComment}
            className="bg-purple-500/20 border-purple-400/30 text-purple-300 hover:bg-purple-500/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Comment
          </Button>
        </div>
        <Textarea
          id="channelComment"
          value={formData.channelComment}
          onChange={(e) => handleInputChange('channelComment', e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-slate-400 min-h-[100px]"
          placeholder="Add your analysis or comments about this channel..."
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 font-semibold"
        >
          Continue to Video Data
        </Button>
      </div>
    </Card>
  );
};

export default ChannelInfoStep;
