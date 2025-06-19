
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Video } from "lucide-react";
import { VideoData } from "@/pages/Index";

interface VideoDataStepProps {
  initialData: VideoData[];
  initialComment: string;
  onComplete: (videos: VideoData[], comment: string) => void;
  onBack: () => void;
}

const VideoDataStep = ({ initialData, initialComment, onComplete, onBack }: VideoDataStepProps) => {
  const [videos, setVideos] = useState<VideoData[]>(initialData);
  const [comment, setComment] = useState(initialComment);

  const handleVideoChange = (index: number, field: keyof VideoData, value: string) => {
    setVideos(prev => prev.map((video, i) => 
      i === index ? { ...video, [field]: value } : video
    ));
  };

  const generateAIComment = () => {
    const comments = [
      "The video performance shows consistent engagement with good view-to-like ratios across recent uploads.",
      "SEO optimization appears effective with strong search visibility on recent content releases.",
      "Video analytics indicate healthy audience retention and growing subscriber conversion rates.",
      "Content performance demonstrates strategic optimization with improving engagement metrics.",
      "The recent videos show strong potential for viral growth with excellent engagement patterns."
    ];
    
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    setComment(randomComment);
  };

  const handleSubmit = () => {
    onComplete(videos, comment);
  };

  return (
    <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Latest 5 Videos Data</h3>
        <p className="text-slate-300">Enter performance metrics for the 5 most recent videos</p>
      </div>

      <div className="space-y-6">
        {videos.map((video, index) => (
          <Card key={index} className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center mb-4">
              <Video className="w-5 h-5 text-blue-400 mr-2" />
              <h4 className="text-lg font-semibold text-white">Video {index + 1}</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-white">Video Title</Label>
                  <Input
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    placeholder="Enter video title"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Views</Label>
                  <Input
                    value={video.views}
                    onChange={(e) => handleVideoChange(index, 'views', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    placeholder="e.g., 125K"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Likes</Label>
                  <Input
                    value={video.likes}
                    onChange={(e) => handleVideoChange(index, 'likes', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    placeholder="e.g., 5.2K"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-white">Comments</Label>
                  <Input
                    value={video.comments}
                    onChange={(e) => handleVideoChange(index, 'comments', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    placeholder="e.g., 324"
                  />
                </div>
                
                <div>
                  <Label className="text-white">SEO Score</Label>
                  <Input
                    value={video.seoScore}
                    onChange={(e) => handleVideoChange(index, 'seoScore', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    placeholder="e.g., 85/100"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Publish Date</Label>
                  <Input
                    type="date"
                    value={video.publishDate}
                    onChange={(e) => handleVideoChange(index, 'publishDate', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-white">Video Performance Analysis</Label>
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-white/20 border-white/30 text-white placeholder:text-slate-400 min-h-[100px]"
          placeholder="Add your analysis about the video performance..."
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Back to Channel Info
        </Button>
        
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 font-semibold"
        >
          Generate PDF Report
        </Button>
      </div>
    </Card>
  );
};

export default VideoDataStep;
