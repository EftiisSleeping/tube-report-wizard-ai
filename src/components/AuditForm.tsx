
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ChannelInfoStep from "./ChannelInfoStep";
import VideoDataStep from "./VideoDataStep";
import { AuditData, ChannelData, VideoData } from "@/pages/Index";

interface AuditFormProps {
  onComplete: (data: AuditData) => void;
  onBack: () => void;
}

const AuditForm = ({ onComplete, onBack }: AuditFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [channelData, setChannelData] = useState<ChannelData>({
    channelName: "",
    channelLogo: "",
    totalSubscribers: "",
    totalViews: "",
    channelLink: "",
    country: "",
    niche: "",
    channelCreateDate: "",
    totalVideos: "",
    last30DayViews: "",
    last30DaySubscribers: "",
    channelComment: "",
  });
  
  const [videoData, setVideoData] = useState<VideoData[]>(
    Array(5).fill(null).map(() => ({
      title: "",
      views: "",
      likes: "",
      comments: "",
      seoScore: "",
      publishDate: "",
    }))
  );
  
  const [videoComment, setVideoComment] = useState("");

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  const handleChannelDataComplete = (data: ChannelData) => {
    setChannelData(data);
    setCurrentStep(2);
  };

  const handleVideoDataComplete = (videos: VideoData[], comment: string) => {
    setVideoData(videos);
    setVideoComment(comment);
    
    const auditData: AuditData = {
      channelData,
      videoData: videos,
      videoComment: comment,
      finalComment: "",
    };
    
    onComplete(auditData);
  };

  const goBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={goBack}
              className="text-white hover:text-gray-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Step {currentStep} of {totalSteps}
                </h2>
                <span className="text-sm text-slate-300">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>
          </div>

          {currentStep === 1 && (
            <ChannelInfoStep
              initialData={channelData}
              onComplete={handleChannelDataComplete}
            />
          )}

          {currentStep === 2 && (
            <VideoDataStep
              initialData={videoData}
              initialComment={videoComment}
              onComplete={handleVideoDataComplete}
              onBack={() => setCurrentStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
