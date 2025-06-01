import type {
    ApiResponse,
    Product,
    ProductCreateRequest,
    RecycledMaterial,
    RecycledMaterialCreateRequest,
    HarmfulSubstance,
    HarmfulSubstanceCreateRequest,
    Shipment,
    ShipmentCreateRequest,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Generic fetch function with error handling
async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }

        const data = await response.json();
        return data as ApiResponse<T>;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

// Products API
export async function getProducts(): Promise<Product[]> {
    const response = await fetchApi<Product[]>("/products");
    console.log("Fetched products:", response.data);
    return response;
}

export async function getProduct(id: string): Promise<Product> {
    const response = await fetchApi<Product>(`/products/${id}`);
    return response.data;
}

export async function createProduct(
    product: ProductCreateRequest
): Promise<Product> {
    const response = await fetchApi<Product>("/products", {
        method: "POST",
        body: JSON.stringify(product),
    });
    console.log(response);
    console.log("Product created:", response.data || response);
    return response.data || (response as any);
}

export async function updateProduct(
    id: string,
    product: Partial<ProductCreateRequest>
): Promise<Product> {
    const response = await fetchApi<Product>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
    });
    return response.data;
}

export async function deleteProduct(id: string): Promise<void> {
    await fetchApi<void>(`/products/${id}`, {
        method: "DELETE",
    });
}

// Recycled Materials API
export async function getRecycledMaterials(
    productId: string
): Promise<RecycledMaterial[]> {
    const response = await fetchApi<RecycledMaterial[]>(
        `/products/${productId}/recycled-materials`
    );
    return response.data;
}

export async function addRecycledMaterial(
    material: RecycledMaterialCreateRequest
): Promise<RecycledMaterial> {
    const response = await fetchApi<RecycledMaterial>("/recycled-materials", {
        method: "POST",
        body: JSON.stringify(material),
    });
    return response.data;
}

// Harmful Substances API
export async function getHarmfulSubstances(
    productId: string
): Promise<HarmfulSubstance[]> {
    const response = await fetchApi<HarmfulSubstance[]>(
        `/products/${productId}/harmful-substances`
    );
    return response.data;
}

export async function addHarmfulSubstance(
    substance: HarmfulSubstanceCreateRequest
): Promise<HarmfulSubstance> {
    const response = await fetchApi<HarmfulSubstance>("/harmful-substances", {
        method: "POST",
        body: JSON.stringify(substance),
    });
    return response.data;
}

// Shipments API
export async function getShipments(productId: string): Promise<Shipment[]> {
    const response = await fetchApi<Shipment[]>(
        `/products/${productId}/shipments`
    );
    return response.data;
}

export async function addShipment(
    shipment: ShipmentCreateRequest
): Promise<Shipment> {
    const response = await fetchApi<Shipment>("/api/shipments", {
        method: "POST",
        body: JSON.stringify(shipment),
    });
    return response.data;
}
