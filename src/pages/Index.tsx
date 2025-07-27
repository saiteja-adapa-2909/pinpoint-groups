import { Plus, Search, Filter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { GroupCard } from "@/components/GroupCard";
import { SnapshotCard } from "@/components/SnapshotCard";
import { UploadZone } from "@/components/UploadZone";
import { useState } from "react";

// Import generated hero images
import heroSnapshot1 from "@/assets/hero-snapshot-1.jpg";
import heroSnapshot2 from "@/assets/hero-snapshot-2.jpg";
import heroSnapshot3 from "@/assets/hero-snapshot-3.jpg";

// Mock data for demonstration
const mockGroups = [
  {
    id: "1",
    name: "App Revamp",
    description: "Complete redesign of the mobile application interface with focus on user experience improvements and modern design patterns.",
    memberCount: 12,
    snapshotCount: 24,
    commentCount: 89,
    role: "Admin" as const,
    lastActivity: "2 hours ago",
    color: "#8B5CF6"
  },
  {
    id: "2", 
    name: "Visa Product",
    description: "Payment flow optimization and checkout process refinements for better conversion rates.",
    memberCount: 8,
    snapshotCount: 15,
    commentCount: 42,
    role: "Read/Write" as const,
    lastActivity: "1 day ago",
    color: "#10B981"
  },
  {
    id: "3",
    name: "Hotels Product",
    description: "Booking interface improvements and search functionality enhancements for hotel reservation system.",
    memberCount: 6,
    snapshotCount: 31,
    commentCount: 156,
    role: "Write-only" as const,
    lastActivity: "3 days ago",
    color: "#3B82F6"
  }
];

const mockSnapshots = [
  {
    id: "1",
    title: "Login Screen Redesign",
    imageUrl: heroSnapshot1,
    uploader: "Sarah Chen",
    uploadDate: "2 hours ago",
    deviceInfo: "iPhone 14 Pro - iOS 17.1",
    commentCount: 5,
    priority: "High" as const,
    assignedTo: "Alex Rodriguez",
    pinCount: 3
  },
  {
    id: "2",
    title: "Payment Flow - Step 2",
    imageUrl: heroSnapshot2,
    uploader: "Mike Johnson",
    uploadDate: "4 hours ago", 
    deviceInfo: "Samsung Galaxy S23 - Android 14",
    commentCount: 12,
    priority: "Medium" as const,
    assignedTo: "Sarah Chen",
    pinCount: 7
  },
  {
    id: "3",
    title: "Hotel Search Results",
    imageUrl: heroSnapshot3,
    uploader: "Emily Davis",
    uploadDate: "1 day ago",
    deviceInfo: "iPad Pro 12.9 - iPadOS 17",
    commentCount: 8,
    priority: "Low" as const,
    pinCount: 2
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<"groups" | "snapshots" | "upload">("groups");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-in max-w-4xl mx-auto">
          <h1 className="text-6xl font-semibold tracking-tight mb-6 text-balance text-foreground">
            Visual Collaboration Made Simple
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Streamline your design feedback process with interactive commenting, 
            role-based access, and seamless team collaboration.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-6 font-medium">
              <Plus className="h-4 w-4 mr-2" />
              New Upload
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6 font-medium">
              <Zap className="h-4 w-4 mr-2" />
              Quick Tour
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={activeTab === "groups" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("groups")}
              className="px-4 py-2 font-medium text-sm"
            >
              My Groups
            </Button>
            <Button
              variant={activeTab === "snapshots" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("snapshots")}
              className="px-4 py-2 font-medium text-sm"
            >
              Recent Snapshots
            </Button>
            <Button
              variant={activeTab === "upload" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("upload")}
              className="px-4 py-2 font-medium text-sm"
            >
              Upload
            </Button>
          </div>

          {activeTab !== "upload" && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10 w-72 h-10 border-border"
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Content Sections */}
        {activeTab === "groups" && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Your Groups</h2>
              <Button variant="secondary" className="font-medium">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockGroups.map((group) => (
                <GroupCard key={group.id} {...group} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "snapshots" && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Recent Snapshots</h2>
              <Button variant="secondary" className="font-medium">
                View All
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockSnapshots.map((snapshot) => (
                <SnapshotCard key={snapshot.id} {...snapshot} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Upload New Snapshot</h2>
              <p className="text-base text-muted-foreground">
                Share your screenshots and start collaborating with your team
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <UploadZone />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
