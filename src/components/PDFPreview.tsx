
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, ArrowLeft, FileText } from "lucide-react";
import { AuditData } from "@/pages/Index";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface PDFPreviewProps {
  auditData: AuditData;
  onBack: () => void;
}

const PDFPreview = ({ auditData, onBack }: PDFPreviewProps) => {
  const [finalComment, setFinalComment] = useState("");

  const { channelData, videoData, videoComment } = auditData;

  // Prepare chart data
  const videoPerformanceData = videoData.map((video, index) => ({
    name: `Video ${index + 1}`,
    views: parseInt(video.views.replace(/[^\d]/g, '')) || 0,
    likes: parseInt(video.likes.replace(/[^\d]/g, '')) || 0,
    comments: parseInt(video.comments.replace(/[^\d]/g, '')) || 0,
  }));

  const seoScoreData = videoData.map((video, index) => ({
    name: `Video ${index + 1}`,
    score: parseInt(video.seoScore.replace(/[^\d]/g, '')) || 0,
  }));

  const engagementData = videoData.map((video, index) => {
    const views = parseInt(video.views.replace(/[^\d]/g, '')) || 1;
    const likes = parseInt(video.likes.replace(/[^\d]/g, '')) || 0;
    return {
      name: `Video ${index + 1}`,
      engagement: ((likes / views) * 100).toFixed(2),
    };
  });

  const pieData = [
    { name: 'Views', value: 60, color: '#3B82F6' },
    { name: 'Likes', value: 25, color: '#10B981' },
    { name: 'Comments', value: 15, color: '#F59E0B' },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const handleDownload = () => {
    window.print();
  };

  const formatNumber = (num: string) => {
    const cleanNum = num.replace(/[^\d.]/g, '');
    return new Intl.NumberFormat().format(parseInt(cleanNum) || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:text-gray-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>
            
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* PDF Preview Container */}
          <div className="bg-white rounded-lg shadow-2xl print:shadow-none print:rounded-none" id="pdf-content">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg print:rounded-none">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">YouTube Channel Audit Report</h1>
                  <p className="text-xl opacity-90">{channelData.channelName}</p>
                </div>
                {channelData.channelLogo && (
                  <img 
                    src={channelData.channelLogo} 
                    alt="Channel Logo" 
                    className="w-20 h-20 rounded-full border-4 border-white/30"
                  />
                )}
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Channel Overview */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Channel Overview
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <h3 className="font-semibold text-blue-800">Total Subscribers</h3>
                    <p className="text-2xl font-bold text-blue-600">{channelData.totalSubscribers}</p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <h3 className="font-semibold text-green-800">Total Views</h3>
                    <p className="text-2xl font-bold text-green-600">{channelData.totalViews}</p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <h3 className="font-semibold text-purple-800">Total Videos</h3>
                    <p className="text-2xl font-bold text-purple-600">{channelData.totalVideos}</p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <h3 className="font-semibold text-orange-800">Channel Age</h3>
                    <p className="text-2xl font-bold text-orange-600">
                      {new Date().getFullYear() - new Date(channelData.channelCreateDate).getFullYear()}y
                    </p>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Channel Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Country:</span> {channelData.country}</p>
                      <p><span className="font-medium">Niche:</span> {channelData.niche}</p>
                      <p><span className="font-medium">Created:</span> {new Date(channelData.channelCreateDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Channel Link:</span> {channelData.channelLink}</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">30-Day Performance</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">New Views:</span> {channelData.last30DayViews}</p>
                      <p><span className="font-medium">New Subscribers:</span> {channelData.last30DaySubscribers}</p>
                    </div>
                  </Card>
                </div>

                {channelData.channelComment && (
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Channel Analysis</h4>
                    <p className="text-gray-700">{channelData.channelComment}</p>
                  </Card>
                )}
              </section>

              {/* Video Performance Charts */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Performance Analytics</h2>
                
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Views vs Engagement</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={videoPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#3B82F6" />
                        <Bar dataKey="likes" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">SEO Performance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={seoScoreData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Engagement Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                  
                  <Card className="p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Latest Videos</h3>
                    <div className="space-y-3">
                      {videoData.slice(0, 3).map((video, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm truncate">{video.title || `Video ${index + 1}`}</p>
                            <p className="text-xs text-gray-500">{video.publishDate}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-semibold text-blue-600">{video.views} views</p>
                            <p className="text-gray-500">{video.likes} likes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {videoComment && (
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Video Performance Analysis</h4>
                    <p className="text-gray-700">{videoComment}</p>
                  </Card>
                )}
              </section>

              {/* Final Comments Section */}
              {finalComment && (
                <section>
                  <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Final Recommendations</h3>
                    <p className="text-gray-700">{finalComment}</p>
                  </Card>
                </section>
              )}

              {/* Footer */}
              <footer className="text-center text-sm text-gray-500 pt-6 border-t">
                <p>Generated by YouTube Audit Pro • {new Date().toLocaleDateString()}</p>
              </footer>
            </div>
          </div>

          {/* Final Comment Input */}
          <Card className="mt-6 p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <Label className="text-white mb-2 block">Add Final Personal Message</Label>
            <Textarea
              value={finalComment}
              onChange={(e) => setFinalComment(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-slate-400 min-h-[100px] mb-4"
              placeholder="Add your final thoughts, recommendations, or personal message..."
            />
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Complete Report
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
