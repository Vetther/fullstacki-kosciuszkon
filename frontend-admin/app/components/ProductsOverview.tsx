"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Package,
    CheckCircle,
    AlertTriangle,
    Clock,
    Loader2,
} from "lucide-react";
import { getProducts } from "../lib/api-client";
import type { Product } from "../lib/types";

export default function StatsCards() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const calculateStats = () => {
        if (!products)
            return { total: 0, compliant: 0, pending: 0, nonCompliant: 0 };

        const total = products.length;

        const compliant = products.filter((product) => {
            const hasBasicInfo =
                product.baseInfo.manufacturer &&
                product.baseInfo.productionCountry;
            const status = (product as any).status;
            return (
                hasBasicInfo &&
                (status === "COMPLIANT" || (!status && hasBasicInfo))
            );
        }).length;

        const pending = products.filter(
            (product) => (product as any).status === "PENDING"
        ).length;

        const nonCompliant = products.filter(
            (product) =>
                (product as any).status === "NON_COMPLIANT" ||
                !product.baseInfo.manufacturer ||
                !product.baseInfo.productionCountry
        ).length;

        return { total, compliant, pending, nonCompliant };
    };

    const stats = calculateStats();

    const statsData = [
        {
            title: "Total Products",
            value: loading ? "..." : stats.total.toString(),
            icon: Package,
            change: "+12%",
            changeType: "positive" as const,
        },
        {
            title: "Compliant",
            value: loading ? "..." : stats.compliant.toString(),
            icon: CheckCircle,
            change: "+8%",
            changeType: "positive" as const,
        },
        {
            title: "Pending Review",
            value: loading ? "..." : stats.pending.toString(),
            icon: Clock,
            change: "-5%",
            changeType: "negative" as const,
        },
        {
            title: "Non-Compliant",
            value: loading ? "..." : stats.nonCompliant.toString(),
            icon: AlertTriangle,
            change: "-15%",
            changeType: "positive" as const,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => (
                <Card key={stat.title} className="border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            {stat.title}
                        </CardTitle>
                        {loading ? (
                            <Loader2 className="h-4 w-4 text-slate-600 animate-spin" />
                        ) : (
                            <stat.icon className="h-4 w-4 text-slate-600" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                            {stat.value}
                        </div>
                        <p
                            className={`text-xs ${
                                stat.changeType === "positive"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {stat.change} from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
