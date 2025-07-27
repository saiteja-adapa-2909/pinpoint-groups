import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { Plus, Trash2, Mail, Shield, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ApprovedEmail {
  id: string;
  email: string;
  permission: "admin" | "read/write" | "read";
  addedAt: string;
}

export const Administrator = () => {
  const adminUsername = localStorage.getItem("adminUsername") || "administrator";
  const { approvedEmails, addApprovedEmail, removeApprovedEmail } = useAuth();
  
  const [approvedEmailList, setApprovedEmailList] = useState<ApprovedEmail[]>([
    {
      id: "1",
      email: "admin@snapflow.com",
      permission: "admin" as const,
      addedAt: "2024-01-15"
    },
    {
      id: "2",
      email: "john@snapflow.com",
      permission: "read/write" as const,
      addedAt: "2024-01-18"
    },
    {
      id: "3",
      email: "sarah@snapflow.com",
      permission: "read" as const,
      addedAt: "2024-01-20"
    }
  ]);

  const [showAddEmail, setShowAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState({
    email: "",
    permission: "read" as const
  });

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "admin": return "bg-destructive/10 text-destructive border-destructive/20";
      case "read/write": return "bg-primary/10 text-primary border-primary/20";
      case "read": return "bg-muted text-muted-foreground border-border";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail.email) {
      const approvedEmail: ApprovedEmail = {
        id: Date.now().toString(),
        email: newEmail.email,
        permission: newEmail.permission,
        addedAt: new Date().toISOString().split('T')[0]
      };
      setApprovedEmailList([...approvedEmailList, approvedEmail]);
      addApprovedEmail(newEmail.email);
      setNewEmail({ email: "", permission: "read" });
      setShowAddEmail(false);
    }
  };

  const handleDeleteEmail = (emailId: string, email: string) => {
    setApprovedEmailList(approvedEmailList.filter(item => item.id !== emailId));
    removeApprovedEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUsername");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Administrator Panel</h1>
            <p className="text-muted-foreground">
              Manage approved email addresses and their permissions
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Logged in as: <span className="font-semibold text-foreground">{adminUsername}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setShowAddEmail(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Email
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedEmailList.length}</p>
                  <p className="text-sm text-muted-foreground">Approved Emails</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {approvedEmailList.filter(e => e.permission === "admin").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Admin Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {approvedEmailList.filter(e => e.permission === "read/write").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Read/Write Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {approvedEmailList.filter(e => e.permission === "read").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Read-Only Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Email Modal */}
        {showAddEmail && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Add Approved Email</CardTitle>
                <CardDescription>
                  Add an email address that will be allowed to sign up with specific permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEmail} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      type="email"
                      value={newEmail.email}
                      onChange={(e) => setNewEmail({...newEmail, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permission Level</label>
                    <Select
                      value={newEmail.permission}
                      onValueChange={(value: "admin" | "read/write" | "read") => 
                        setNewEmail({...newEmail, permission: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">Read Only</SelectItem>
                        <SelectItem value="read/write">Read/Write</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> Users with this email can sign up and set their own password.
                    </p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Add Email
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddEmail(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Approved Emails Table */}
        <Card>
          <CardHeader>
            <CardTitle>Approved Email Management</CardTitle>
            <CardDescription>
              View and manage all approved email addresses in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Permission</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedEmailList.map((emailItem) => (
                  <TableRow key={emailItem.id}>
                    <TableCell className="font-medium">{emailItem.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPermissionColor(emailItem.permission)}>
                        {emailItem.permission}
                      </Badge>
                    </TableCell>
                    <TableCell>{emailItem.addedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteEmail(emailItem.id, emailItem.email)}
                        >
                          <Trash2 className="h-4 w-4" />
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