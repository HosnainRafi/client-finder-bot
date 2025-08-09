import { useState } from "react";
import { LeadCard } from "@/components/LeadCard";
import { StatsCard } from "@/components/StatsCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, TrendingUp, DollarSign, Plus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockLeads = [
  {
    id: "1",
    company: "TechStart Solutions",
    website: "techstart.com",
    email: "contact@techstart.com",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    size: "Small (25 employees)",
    status: "new" as const,
    estimatedValue: "$15K - $25K",
    lastContact: "2 days ago",
    notes: "Looking for a modern e-commerce platform. Currently using outdated system, needs mobile optimization."
  },
  {
    id: "2", 
    company: "Green Energy Corp",
    website: "greenenergy.io",
    email: "info@greenenergy.io",
    industry: "Energy",
    size: "Medium (120 employees)",
    status: "contacted" as const,
    estimatedValue: "$30K - $50K",
    lastContact: "1 week ago",
    notes: "Responded positively to initial outreach. Scheduling follow-up call to discuss requirements."
  },
  {
    id: "3",
    company: "HealthCare Plus",
    website: "healthcareplus.com",
    email: "dev@healthcareplus.com",
    industry: "Healthcare",
    size: "Large (300+ employees)",
    status: "qualified" as const,
    estimatedValue: "$75K - $100K",
    lastContact: "3 days ago",
    notes: "Qualified lead! Need HIPAA-compliant patient portal. Budget approved, timeline 6 months."
  },
  {
    id: "4",
    company: "Retail Innovations",
    website: "retailinnovations.com", 
    email: "projects@retailinnovations.com",
    industry: "Retail",
    size: "Medium (80 employees)",
    status: "proposal" as const,
    estimatedValue: "$40K - $60K",
    lastContact: "5 days ago",
    notes: "Proposal sent for omnichannel e-commerce solution. Awaiting decision from board meeting next week."
  }
];

const Index = () => {
  const [leads] = useState(mockLeads);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleContact = (leadId: string) => {
    toast({
      title: "Contact Initiated",
      description: "Opening email client to contact this lead.",
    });
  };

  const handleViewDetails = (leadId: string) => {
    toast({
      title: "Lead Details",
      description: "Detailed view functionality coming soon.",
    });
  };

  const handleSearch = (query: string, filters: any) => {
    toast({
      title: "Search Initiated",
      description: `Searching for: ${query}`,
    });
  };

  const stats = [
    {
      title: "Total Leads",
      value: "247",
      description: "from this month",
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Qualified Leads",
      value: "18",
      description: "ready for proposals",
      icon: Target,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Conversion Rate",
      value: "24%",
      description: "qualified to closed",
      icon: TrendingUp,
      trend: { value: 3, isPositive: true }
    },
    {
      title: "Pipeline Value",
      value: "$485K",
      description: "estimated revenue",
      icon: DollarSign,
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LeadGen AI
              </h1>
              <p className="text-sm text-muted-foreground">Web Development Client Prospecting</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Leads Section */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({leads.length})</TabsTrigger>
                <TabsTrigger value="new">New ({leads.filter(l => l.status === 'new').length})</TabsTrigger>
                <TabsTrigger value="contacted">Contacted ({leads.filter(l => l.status === 'contacted').length})</TabsTrigger>
                <TabsTrigger value="qualified">Qualified ({leads.filter(l => l.status === 'qualified').length})</TabsTrigger>
                <TabsTrigger value="proposal">Proposal ({leads.filter(l => l.status === 'proposal').length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onContact={handleContact}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>
              
              {["new", "contacted", "qualified", "proposal"].map((status) => (
                <TabsContent key={status} value={status} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leads
                      .filter((lead) => lead.status === status)
                      .map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          onContact={handleContact}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
