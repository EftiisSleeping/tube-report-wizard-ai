
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

  // Prepare chart data - filter out videos with no data
  const validVideoData = videoData.filter(video => video.views || video.likes || video.comments);
  
  const videoPerformanceData = validVideoData.map((video, index) => ({
    name: video.title || `Video ${index + 1}`,
    views: parseInt(video.views.replace(/[^\d]/g, '')) || 0,
    likes: parseInt(video.likes.replace(/[^\d]/g, '')) || 0,
    comments: parseInt(video.comments.replace(/[^\d]/g, '')) || 0,
  }));

  const seoScoreData = validVideoData.map((video, index) => ({
    name: video.title || `Video ${index + 1}`,
    score: parseInt(video.seoScore.replace(/[^\d]/g, '')) || 0,
  }));

  const pieData = [
    { name: 'Views', value: 60, color: '#3B82F6' },
    { name: 'Likes', value: 25, color: '#10B981' },
    { name: 'Comments', value: 15, color: '#F59E0B' },
  ];

  const handleDownload = () => {
    // Update the audit data with final comment before printing
    const updatedAuditData = { ...auditData, finalComment };
    console.log('Generating PDF with data:', updatedAuditData);
    
    // Trigger print dialog
    window.print();
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
                  <p className="text-xl opacity-90">{channelData.channelName || 'Channel Name Not Provided'}</p>
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
                  {channelData.totalSubscribers && (
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <h3 className="font-semibold text-blue-800">Total Subscribers</h3>
                      <p className="text-2xl font-bold text-blue-600">{channelData.totalSubscribers}</p>
                    </Card>
                  )}
                  
                  {channelData.totalViews && (
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <h3 className="font-semibold text-green-800">Total Views</h3>
                      <p className="text-2xl font-bold text-green-600">{channelData.totalViews}</p>
                    </Card>
                  )}
                  
                  {channelData.totalVideos && (
                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <h3 className="font-semibold text-purple-800">Total Videos</h3>
                      <p className="text-2xl font-bold text-purple-600">{channelData.totalVideos}</p>
                    </Card>
                  )}
                  
                  {channelData.channelCreateDate && (
                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <h3 className="font-semibold text-orange-800">Channel Age</h3>
                      <p className="text-2xl font-bold text-orange-600">
                        {new Date().getFullYear() - new Date(channelData.channelCreateDate).getFullYear()}y
                      </p>
                    </Card>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Channel Details</h4>
                    <div className="space-y-2 text-sm">
                      {channelData.country && <p><span className="font-medium">Country:</span> {channelData.country}</p>}
                      {channelData.niche && <p><span className="font-medium">Niche:</span> {channelData.niche}</p>}
                      {channelData.channelCreateDate && <p><span className="font-medium">Created:</span> {new Date(channelData.channelCreateDate).toLocaleDateString()}</p>}
                      {channelData.channelLink && <p><span className="font-medium">Channel Link:</span> {channelData.channelLink}</p>}
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">30-Day Performance</h4>
                    <div className="space-y-2 text-sm">
                      {channelData.last30DayViews && <p><span className="font-medium">New Views:</span> {channelData.last30DayViews}</p>}
                      {channelData.last30DaySubscribers && <p><span className="font-medium">New Subscribers:</span> {channelData.last30DaySubscribers}</p>}
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

              {/* Video Performance Charts - Only show if we have video data */}
              {validVideoData.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Performance Analytics</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {videoPerformanceData.length > 0 && (
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
                    )}
                    
                    {seoScoreData.some(item => item.score > 0) && (
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
                    )}
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
                        {validVideoData.slice(0, 3).map((video, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="flex-1">
                              <p className="font-medium text-sm truncate">{video.title || `Video ${index + 1}`}</p>
                              <p className="text-xs text-gray-500">{video.publishDate}</p>
                            </div>
                            <div className="text-right text-sm">
                              {video.views && <p className="font-semibold text-blue-600">{video.views} views</p>}
                              {video.likes && <p className="text-gray-500">{video.likes} likes</p>}
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
              )}

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
