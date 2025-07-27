import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { 
  ArrowLeft, 
  Users, 
  Image, 
  MessageSquare, 
  Search, 
  Filter, 
  Calendar,
  User,
  Clock,
  AlertCircle,
  Pin,
  MoreHorizontal,
  Download,
  Share2,
  Plus
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface Snapshot {
  id: string;
  title: string;
  imageUrl: string;
  uploader: string;
  uploadDate: string;
  deviceInfo: string;
  commentCount: number;
  priority: "High" | "Medium" | "Low";
  assignedTo: string;
  pinCount: number;
  status: "Open" | "In Progress" | "Resolved";
  description?: string;
}

interface GroupDetailProps {
  groupId: string;
}

export const GroupDetail = ({ groupId }: GroupDetailProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showUpload, setShowUpload] = useState(false);

  // Mock group data - in real app this would come from API
  const group = {
    id: groupId,
    name: "App Revamp",
    description: "Complete redesign of the mobile application interface with focus on user experience improvements and modern design patterns.",
    memberCount: 12,
    snapshotCount: 24,
    commentCount: 89,
    role: "Admin" as const,
    lastActivity: "2 hours ago",
    color: "#8B5CF6",
    createdAt: "2024-01-15",
    visibility: "Private" as const
  };

  // Mock snapshots data
  const snapshots: Snapshot[] = [
    {
      id: "1",
      title: "Homepage Navigation Issue",
      imageUrl: "/src/assets/hero-snapshot-1.jpg",
      uploader: "Sarah Chen",
      uploadDate: "2024-01-20 14:30",
      deviceInfo: "iPhone 14 Pro - iOS 17.2",
      commentCount: 8,
      priority: "High",
      assignedTo: "John Doe",
      pinCount: 3,
      status: "Open",
      description: "Navigation menu is not responding properly on mobile devices"
    },
    {
      id: "2",
      title: "Checkout Flow Optimization",
      imageUrl: "/src/assets/hero-snapshot-2.jpg",
      uploader: "Mike Johnson",
      uploadDate: "2024-01-19 16:45",
      deviceInfo: "Samsung Galaxy S23 - Android 14",
      commentCount: 12,
      priority: "Medium",
      assignedTo: "Alex Smith",
      pinCount: 1,
      status: "In Progress",
      description: "Payment confirmation screen needs better UX"
    },
    {
      id: "3",
      title: "Profile Page Redesign",
      imageUrl: "/src/assets/hero-snapshot-3.jpg",
      uploader: "Emily Davis",
      uploadDate: "2024-01-18 11:20",
      deviceInfo: "iPad Pro - iOS 17.2",
      commentCount: 5,
      priority: "Low",
      assignedTo: "Unassigned",
      pinCount: 0,
      status: "Open",
      description: "User profile layout needs modernization"
    },
    {
      id: "4",
      title: "Search Results Display",
      imageUrl: "/src/assets/hero-snapshot-1.jpg",
      uploader: "David Wilson",
      uploadDate: "2024-01-17 09:15",
      deviceInfo: "MacBook Pro - macOS 14.1",
      commentCount: 15,
      priority: "High",
      assignedTo: "Sarah Chen",
      pinCount: 2,
      status: "Resolved",
      description: "Search results are not displaying correctly"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-primary/10 text-primary border-primary/20";
      case "In Progress": return "bg-warning/10 text-warning border-warning/20";
      case "Resolved": return "bg-success/10 text-success border-success/20";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const filteredSnapshots = snapshots.filter(snapshot => {
    const matchesSearch = snapshot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snapshot.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snapshot.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || snapshot.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || snapshot.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <h1 className="text-3xl font-bold text-foreground">{group.name}</h1>
              <Badge variant="outline" className="text-xs">
                {group.role}
              </Badge>
            </div>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{group.memberCount}</p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Image className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{group.snapshotCount}</p>
                  <p className="text-sm text-muted-foreground">Snapshots</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{group.commentCount}</p>
                  <p className="text-sm text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{group.lastActivity}</p>
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Upload Snapshots</h2>
            <Button 
              variant="secondary" 
              onClick={() => setShowUpload(!showUpload)}
              className="font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showUpload ? "Hide Upload" : "Upload Snapshot"}
            </Button>
          </div>
          
          {showUpload && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Upload to {group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your screenshots and start collaborating with your team
                  </p>
                </div>
                <UploadZone 
                  groupName={group.name}
                  onUploadComplete={(file, comments) => {
                    console.log('Upload completed:', { file, comments });
                    // Here you would typically save to backend
                    // For now, just show a success message
                    alert(`Screenshot uploaded to ${group.name} with ${comments.length} comments!`);
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search snapshots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Snapshots Table */}
        <Card>
          <CardHeader>
            <CardTitle>Group Snapshots</CardTitle>
            <CardDescription>
              All snapshots uploaded to this group with detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Snapshot</TableHead>
                  <TableHead>Uploader</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSnapshots.map((snapshot) => (
                  <TableRow key={snapshot.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded overflow-hidden bg-muted">
                          <img 
                            src={snapshot.imageUrl} 
                            alt={snapshot.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{snapshot.title}</p>
                          <p className="text-xs text-muted-foreground">{snapshot.deviceInfo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{snapshot.uploader}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {snapshot.assignedTo === "Unassigned" ? (
                          <span className="text-muted-foreground">Unassigned</span>
                        ) : (
                          snapshot.assignedTo
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(snapshot.priority)}`}>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {snapshot.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(snapshot.status)}`}>
                        {snapshot.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{snapshot.uploadDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{snapshot.commentCount}</span>
                        {snapshot.pinCount > 0 && (
                          <>
                            <Pin className="h-3 w-3 text-primary" />
                            <span className="text-sm text-primary">{snapshot.pinCount}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}; 