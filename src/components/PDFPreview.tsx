
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
    // Hide buttons and input field before printing
    const buttons = document.querySelectorAll('.no-print');
    buttons.forEach(btn => {
      (btn as HTMLElement).style.display = 'none';
    });
    
    // Trigger print dialog
    window.print();
    
    // Restore buttons after a delay
    setTimeout(() => {
      buttons.forEach(btn => {
        (btn as HTMLElement).style.display = '';
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between no-print">
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
          <div className="bg-white rounded-lg shadow-2xl print:shadow-none print:rounded-none print:m-0" id="pdf-content">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg print:rounded-none print:bg-gradient-to-r print:from-blue-600 print:to-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-white">YouTube Channel Audit Report</h1>
                  <p className="text-xl opacity-90 text-white">{channelData.channelName || 'Channel Name Not Provided'}</p>
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
                    <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 print:bg-gradient-to-br print:from-blue-100 print:to-blue-200">
                      <h3 className="font-semibold text-blue-800 text-sm">Total Subscribers</h3>
                      <p className="text-3xl font-bold text-blue-600">{channelData.totalSubscribers}</p>
                    </Card>
                  )}
                  
                  {channelData.totalViews && (
                    <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 border-green-300 print:bg-gradient-to-br print:from-green-100 print:to-green-200">
                      <h3 className="font-semibold text-green-800 text-sm">Total Views</h3>
                      <p className="text-3xl font-bold text-green-600">{channelData.totalViews}</p>
                    </Card>
                  )}
                  
                  {channelData.totalVideos && (
                    <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 print:bg-gradient-to-br print:from-purple-100 print:to-purple-200">
                      <h3 className="font-semibold text-purple-800 text-sm">Total Videos</h3>
                      <p className="text-3xl font-bold text-purple-600">{channelData.totalVideos}</p>
                    </Card>
                  )}
                  
                  {channelData.channelCreateDate && (
                    <Card className="p-6 bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 print:bg-gradient-to-br print:from-orange-100 print:to-orange-200">
                      <h3 className="font-semibold text-orange-800 text-sm">Channel Age</h3>
                      <p className="text-3xl font-bold text-orange-600">
                        {new Date().getFullYear() - new Date(channelData.channelCreateDate).getFullYear()}y
                      </p>
                    </Card>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gray-50 border-gray-200">
                    <h4 className="font-semibold mb-3 text-gray-800">Channel Details</h4>
                    <div className="space-y-2 text-sm">
                      {channelData.country && <p><span className="font-medium text-gray-700">Country:</span> <span className="text-gray-600">{channelData.country}</span></p>}
                      {channelData.niche && <p><span className="font-medium text-gray-700">Niche:</span> <span className="text-gray-600">{channelData.niche}</span></p>}
                      {channelData.channelCreateDate && <p><span className="font-medium text-gray-700">Created:</span> <span className="text-gray-600">{new Date(channelData.channelCreateDate).toLocaleDateString()}</span></p>}
                      {channelData.channelLink && <p><span className="font-medium text-gray-700">Channel Link:</span> <span className="text-gray-600">{channelData.channelLink}</span></p>}
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-gray-50 border-gray-200">
                    <h4 className="font-semibold mb-3 text-gray-800">30-Day Performance</h4>
                    <div className="space-y-2 text-sm">
                      {channelData.last30DayViews && <p><span className="font-medium text-gray-700">New Views:</span> <span className="text-gray-600">{channelData.last30DayViews}</span></p>}
                      {channelData.last30DaySubscribers && <p><span className="font-medium text-gray-700">New Subscribers:</span> <span className="text-gray-600">{channelData.last30DaySubscribers}</span></p>}
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
                      <Card className="p-6 bg-white border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Views vs Engagement</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={videoPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px'
                              }} 
                            />
                            <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="likes" fill="#10B981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Card>
                    )}
                    
                    {seoScoreData.some(item => item.score > 0) && (
                      <Card className="p-6 bg-white border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">SEO Performance</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={seoScoreData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px'
                              }} 
                            />
                            <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    <Card className="p-6 bg-white border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Engagement Distribution</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
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
                    
                    <Card className="p-6 lg:col-span-2 bg-white border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Latest Videos</h3>
                      <div className="space-y-3">
                        {validVideoData.slice(0, 3).map((video, index) => (
                          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                            <div className="flex-1">
                              <p className="font-medium text-sm truncate text-gray-800">{video.title || `Video ${index + 1}`}</p>
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
            </div>
          </div>

          {/* Final Comment Input */}
          <Card className="mt-6 p-6 bg-white/10 backdrop-blur-sm border-white/20 no-print">
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
