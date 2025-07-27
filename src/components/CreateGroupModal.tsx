import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Palette, Users, Lock, Globe, Plus, Trash2 } from "lucide-react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: GroupData) => void;
}

interface GroupMember {
  email: string;
  role: "Developer" | "QA" | "Product";
}

interface GroupData {
  name: string;
  description: string;
  color: string;
  visibility: "public" | "private";
  defaultRole: "read" | "read/write" | "admin";
  members?: GroupMember[];
}

const colorOptions = [
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Red", value: "#EF4444" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
];

export const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }: CreateGroupModalProps) => {
  const [formData, setFormData] = useState<GroupData>({
    name: "",
    description: "",
    color: "#8B5CF6",
    visibility: "private",
    defaultRole: "read",
    members: []
  });
  const [errors, setErrors] = useState<Partial<GroupData>>({});
  const [newMember, setNewMember] = useState({ email: "", role: "Developer" as const });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Partial<GroupData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Group name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create group
    onCreateGroup(formData);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      color: "#8B5CF6",
      visibility: "private",
      defaultRole: "read",
      members: []
    });
    setNewMember({ email: "", role: "Developer" });
    onClose();
  };

  const handleInputChange = (field: keyof GroupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addMember = () => {
    if (!newMember.email.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if member already exists
    if (formData.members?.some(member => member.email === newMember.email)) {
      alert("This email is already added");
      return;
    }

    setFormData(prev => ({
      ...prev,
      members: [...(prev.members || []), { ...newMember }]
    }));
    setNewMember({ email: "", role: "Developer" });
  };

  const removeMember = (email: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.filter(member => member.email !== email) || []
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Create New Group</CardTitle>
            <CardDescription>
              Set up a new collaboration group for your team
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Group Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter group name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what this group is for..."
                rows={3}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Group Color</label>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleInputChange("color", color.value)}
                    className={`
                      flex items-center justify-center p-3 rounded-lg border-2 transition-all
                      ${formData.color === color.value 
                        ? 'border-foreground shadow-md' 
                        : 'border-border hover:border-foreground/50'
                      }
                    `}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="ml-2 text-xs font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Visibility</label>
              <Select
                value={formData.visibility}
                onValueChange={(value: "public" | "private") => handleInputChange("visibility", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Private - Only invited members
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Public - Anyone can join
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Content based on Visibility */}
            {formData.visibility === "public" ? (
              /* Public Group - Show Default Role */
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Default Member Role</label>
                <Select
                  value={formData.defaultRole}
                  onValueChange={(value: "read" | "read/write" | "admin") => handleInputChange("defaultRole", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read Only - Can view content</SelectItem>
                    <SelectItem value="read/write">Read/Write - Can view and edit</SelectItem>
                    <SelectItem value="admin">Admin - Full control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              /* Private Group - Show Member Management */
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Add Members</label>
                  <div className="flex gap-2">
                    <Input
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className="flex-1"
                    />
                    <Select
                      value={newMember.role}
                      onValueChange={(value: "Developer" | "QA" | "Product") => 
                        setNewMember(prev => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      onClick={addMember}
                      className="px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Members List */}
                {formData.members && formData.members.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Added Members</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{member.email}</span>
                            <Badge variant="secondary" className="text-xs">
                              {member.role}
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMember(member.email)}
                            className="h-6 w-6"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Create Group
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 