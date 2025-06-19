
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, FileText, BarChart3, Sparkles } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import PDFPreview from "@/components/PDFPreview";

export interface ChannelData {
  channelName: string;
  channelLogo: string;
  totalSubscribers: string;
  totalViews: string;
  channelLink: string;
  country: string;
  niche: string;
  channelCreateDate: string;
  totalVideos: string;
  last30DayViews: string;
  last30DaySubscribers: string;
  channelComment: string;
}

export interface VideoData {
  title: string;
  views: string;
  likes: string;
  comments: string;
  seoScore: string;
  publishDate: string;
}

export interface AuditData {
  channelData: ChannelData;
  videoData: VideoData[];
  videoComment: string;
  finalComment: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'form' | 'preview'>('welcome');
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  const handleFormComplete = (data: AuditData) => {
    setAuditData(data);
    setCurrentStep('preview');
  };

  const startAudit = () => {
    setCurrentStep('form');
  };

  const backToForm = () => {
    setCurrentStep('form');
  };

  if (currentStep === 'form') {
    return <AuditForm onComplete={handleFormComplete} onBack={() => setCurrentStep('welcome')} />;
  }

  if (currentStep === 'preview' && auditData) {
    return <PDFPreview auditData={auditData} onBack={backToForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-2xl">
              <Youtube className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            YouTube Audit Pro
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate stunning, AI-powered PDF audit reports for YouTube channels with beautiful visualizations and professional insights
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <FileText className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Simple Data Entry</h3>
              <p className="text-slate-300 text-sm">Easy-to-use forms for collecting channel metrics and video performance data</p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <BarChart3 className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Visual Analytics</h3>
              <p className="text-slate-300 text-sm">Beautiful charts, graphs, and metrics to showcase channel performance</p>
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Sparkles className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">AI Insights</h3>
              <p className="text-slate-300 text-sm">Intelligent analysis and recommendations powered by AI technology</p>
            </Card>
          </div>
          
          <Button 
            onClick={startAudit}
            size="lg" 
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
          >
            Start Channel Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
