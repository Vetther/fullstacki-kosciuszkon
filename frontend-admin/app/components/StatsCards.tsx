import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const stats = [
    {
        title: "Total Products",
        value: "247",
        icon: Package,
        change: "+12%",
        changeType: "positive" as const,
    },
    {
        title: "Compliant",
        value: "189",
        icon: CheckCircle,
        change: "+8%",
        changeType: "positive" as const,
    },
    {
        title: "Pending Review",
        value: "34",
        icon: Clock,
        change: "-5%",
        changeType: "negative" as const,
    },
    {
        title: "Non-Compliant",
        value: "24",
        icon: AlertTriangle,
        change: "-15%",
        changeType: "positive" as const,
    },
];

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
    );
}
