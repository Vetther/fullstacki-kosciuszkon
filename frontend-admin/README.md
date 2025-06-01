# ⚡ Battery Dashboard App

A modern dashboard built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, designed for managing and analyzing battery products.

---

## 🌍 Routes Overview

### `/` – **Dashboard Overview**

- 🔢 `StatsCards` – Total product count, capacity, etc.
- 🧩 `ProductsOverview` – Snapshot of highlighted products
- 📋 `ProductsList` – Recent entries
- ➕ `AddProductForm` – Quick-add product form (embedded)

### `/products` – **Product List**

- Displays the **full list of battery products** using `ProductsList`
- Useful for browsing or filtering large datasets

### `/products/new` – **Add New Product**

- Dedicated page for adding a new battery product
- Uses the same `AddProductForm` component in a standalone view
- Ideal for full-screen input or deeper form extensions

---

## 🧱 Components

| Component                | Purpose                        |
| ------------------------ | ------------------------------ |
| `DashboardLayout.tsx`    | Shared layout for all routes   |
| `StatsCards.tsx`         | Displays key metrics/KPIs      |
| `ProductsOverview.tsx`   | Overview summary               |
| `ProductsList.tsx`       | Table/list of products         |
| `AddProductForm.tsx`     | Input form for adding products |
| `/page.tsx`              | Dashboard page (`/`)           |
| `/products/page.tsx`     | All products route             |
| `/products/new/page.tsx` | New product creation route     |

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** – UI components
