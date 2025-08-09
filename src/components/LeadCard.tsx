import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, Globe, DollarSign, Clock } from "lucide-react";

interface Lead {
  id: string;
  company: string;
  website: string;
  email: string;
  phone?: string;
  industry: string;
  size: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  estimatedValue: string;
  lastContact?: string;
  notes: string;
}

interface LeadCardProps {
  lead: Lead;
  onContact: (leadId: string) => void;
  onViewDetails: (leadId: string) => void;
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800", 
  qualified: "bg-success text-success-foreground",
  proposal: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800"
};

export const LeadCard = ({ lead, onContact, onViewDetails }: LeadCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{lead.company}</CardTitle>
              <p className="text-sm text-muted-foreground">{lead.industry}</p>
            </div>
          </div>
          <Badge className={statusColors[lead.status]}>
            {lead.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{lead.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{lead.estimatedValue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{lead.size}</span>
          </div>
        </div>
        
        {lead.lastContact && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last contact: {lead.lastContact}</span>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground line-clamp-2">{lead.notes}</p>
      </CardContent>
      
      <CardFooter className="pt-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(lead.id)}
        >
          View Details
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onContact(lead.id)}
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};