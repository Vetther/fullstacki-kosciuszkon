"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    Eye,
    Edit,
    MoreHorizontal,
    Loader2,
} from "lucide-react";
import { getProducts } from "../lib/api-client";
import type { Product } from "../lib/types";
import { sourceMapsEnabled } from "process";

const statusColors = {
    DRAFT: "bg-gray-100 text-gray-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLIANT: "bg-green-100 text-green-800",
    NON_COMPLIANT: "bg-red-100 text-red-800",
};

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log("Fetching products...");
                const data = await getProducts();
                console.log("Fetched products:", data);
                setProducts(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search term, category, and status
    const filteredProducts = (products || []).filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.baseInfo.manufacturer
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "all" ||
            product.productCategory === categoryFilter;

        const matchesStatus =
            statusFilter === "all" ||
            (product.status || "DRAFT") === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const getProductStatus = (product: Product): keyof typeof statusColors => {
        // Simple logic to determine status based on data completeness
        if (
            !product.baseInfo.manufacturer ||
            !product.baseInfo.productionCountry
        ) {
            return "DRAFT";
        }
        return (product.status as keyof typeof statusColors) || "DRAFT";
    };

    if (loading) {
        return (
            <Card className="border-slate-200">
                <CardContent className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading products...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-slate-200">
                <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">
                            Error loading products: {error}
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    All Products ({products?.length || 0})
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select
                            value={categoryFilter}
                            onValueChange={setCategoryFilter}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                <SelectItem value="BATTERY">Battery</SelectItem>
                                <SelectItem value="ELECTRONICS">
                                    Electronics
                                </SelectItem>
                                <SelectItem value="TEXTILES">
                                    Textiles
                                </SelectItem>
                                <SelectItem value="CONSTRUCTION">
                                    Construction
                                </SelectItem>
                                <SelectItem value="AUTOMOTIVE">
                                    Automotive
                                </SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="COMPLIANT">
                                    Compliant
                                </SelectItem>
                                <SelectItem value="NON_COMPLIANT">
                                    Non-Compliant
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600">
                            No products found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Product
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        ID
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Category
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Manufacturer
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Production Date
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => {
                                    const status = getProductStatus(product);
                                    return (
                                        <tr
                                            key={product.id}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    {product.imageUrl && (
                                                        <img
                                                            src={
                                                                product.imageUrl ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-slate-900">
                                                            {product.name ||
                                                                "Unnamed Product"}
                                                        </div>
                                                        {product.modelType && (
                                                            <div className="text-sm text-slate-500">
                                                                {
                                                                    product.modelType
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-600 font-mono">
                                                {product.id.substring(0, 8)}...
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-600">
                                                {product.productCategory}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-600">
                                                {product.baseInfo
                                                    .manufacturer || "N/A"}
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge
                                                    className={
                                                        statusColors[status]
                                                    }
                                                >
                                                    {status
                                                        .replace("_", " ")
                                                        .toLowerCase()}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-600">
                                                {formatDate(
                                                    product.baseInfo
                                                        .productionDate
                                                )}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
