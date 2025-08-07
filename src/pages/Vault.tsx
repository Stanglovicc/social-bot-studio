import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  User, 
  File, 
  Image, 
  Video, 
  FileText,
  Download,
  Trash2,
  Search
} from "lucide-react";

// Mock data for models and their content
const models = [
  {
    id: "emily_001",
    name: "Emily",
    avatar: "/placeholder.svg",
    contentCount: 24,
    status: "active"
  },
  {
    id: "mia_002", 
    name: "Mia",
    avatar: "/placeholder.svg",
    contentCount: 18,
    status: "active"
  },
  {
    id: "sarah_003",
    name: "Sarah", 
    avatar: "/placeholder.svg",
    contentCount: 31,
    status: "limited"
  },
  {
    id: "luna_004",
    name: "Luna",
    avatar: "/placeholder.svg", 
    contentCount: 12,
    status: "pending"
  },
  {
    id: "alex_005",
    name: "Alex",
    avatar: "/placeholder.svg",
    contentCount: 7,
    status: "active"
  }
];

const mockContent = {
  emily_001: [
    {
      id: "1",
      name: "Profile Photo Set 1",
      type: "image",
      size: "2.4 MB",
      uploadDate: "2024-01-05",
      fileCount: 5
    },
    {
      id: "2", 
      name: "Introduction Video",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-04",
      fileCount: 1
    },
    {
      id: "3",
      name: "Chat Templates",
      type: "document", 
      size: "128 KB",
      uploadDate: "2024-01-03",
      fileCount: 3
    }
  ],
  mia_002: [
    {
      id: "4",
      name: "Workout Photos",
      type: "image",
      size: "5.1 MB", 
      uploadDate: "2024-01-06",
      fileCount: 8
    },
    {
      id: "5",
      name: "Bio Templates",
      type: "document",
      size: "95 KB",
      uploadDate: "2024-01-02", 
      fileCount: 2
    }
  ],
  sarah_003: [
    {
      id: "6",
      name: "Fashion Gallery",
      type: "image", 
      size: "8.7 MB",
      uploadDate: "2024-01-07",
      fileCount: 12
    }
  ],
  luna_004: [],
  alex_005: [
    {
      id: "7",
      name: "Content Scripts",
      type: "document",
      size: "256 KB",
      uploadDate: "2024-01-01",
      fileCount: 4
    }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
    case "limited":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Limited</Badge>;
    case "pending":
      return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Pending</Badge>;
    default:
      return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inactive</Badge>;
  }
};

const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return <Image className="w-4 h-4 text-primary" />;
    case "video":
      return <Video className="w-4 h-4 text-accent" />;
    case "document":
      return <FileText className="w-4 h-4 text-warning" />;
    default:
      return <File className="w-4 h-4 text-muted-foreground" />;
  }
};

export default function Vault() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedContent = mockContent[selectedModel.id as keyof typeof mockContent] || [];
  
  const filteredContent = selectedContent.filter(content =>
    content.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      // File upload logic would go here
      console.log("Upload files for", selectedModel.name, files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Vault</h1>
            <p className="text-muted-foreground">Manage and organize model content assets</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Models List - Left Side */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-gradient-card border-card-border shadow-card">
              <div className="p-4 border-b border-card-border">
                <h3 className="text-lg font-semibold text-foreground">Models</h3>
                <p className="text-sm text-muted-foreground">Select a model to view content</p>
              </div>
              <div className="p-4 space-y-2 overflow-y-auto">
                {models.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedModel.id === model.id
                        ? "bg-primary/10 border-primary/20 border"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{model.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {model.contentCount} files
                          </span>
                          {getStatusBadge(model.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Content Display - Right Side */}
          <div className="lg:col-span-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            />
            <Card 
              className={`h-full bg-gradient-card border-card-border shadow-card transition-all ${
                isDragOver ? "border-primary border-2 bg-primary/5" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="p-4 border-b border-card-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedModel.name}'s Content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedContent.length} items uploaded
                    </p>
                  </div>
                  <Button onClick={handleFileUpload} className="bg-gradient-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Content
                  </Button>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Content List */}
              <div className="p-4 overflow-y-auto">
                {isDragOver && (
                  <div className="fixed inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-primary">Drop files to upload</p>
                      <p className="text-sm text-muted-foreground">Release to upload to {selectedModel.name}'s vault</p>
                    </div>
                  </div>
                )}
                
                {filteredContent.length === 0 ? (
                  <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      {searchTerm ? "No content matches your search" : "No content uploaded yet"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos, videos, and documents for {selectedModel.name}
                    </p>
                    <div className="space-y-2">
                      <Button onClick={handleFileUpload} variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload First Content
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Or drag and drop files here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredContent.map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-card-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {getFileIcon(content.type)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{content.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{content.fileCount} files</span>
                              <span>{content.size}</span>
                              <span>Uploaded {content.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}