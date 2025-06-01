"use client";

import type React from "react";

import { useState } from "react";
import {
    LayoutDashboard,
    Package,
    FileText,
    Settings,
    Menu,
    X,
    QrCode,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-slate-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSidebarOpen(false)}
                                className="text-white hover:text-white hover:bg-slate-600"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <SidebarContent pathname={pathname} />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-slate-200">
                    <SidebarContent pathname={pathname} />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-600">
                                Last updated: {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
            </div>
        </div>
    );
}

function SidebarContent({ pathname }: { pathname: string }) {
    return (
        <>
            <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200">
                <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg">
                    <QrCode className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                        stability.ai
                    </h1>
                    <p className="text-sm text-slate-600">
                        Digital Product Passport
                    </p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-slate-100 text-slate-900"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
