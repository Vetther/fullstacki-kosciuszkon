// Product types
export type ProductCategory =
    | "BATTERY"
    | "ELECTRONICS"
    | "TEXTILES"
    | "CONSTRUCTION"
    | "AUTOMOTIVE"
    | "OTHER";

export interface BaseInfo {
    manufacturer: string;
    productionCountry: string;
    productionDate: string;
    installationDate: string;
    vehicleInfo?: string;
}

export interface ProductCreateRequest {
    imageUrl?: string;
    name: string;
    modelType: string;
    productCategory: ProductCategory;
    baseInfo: BaseInfo;
    nominalCapacity?: string;
    nominalVoltage?: string;
    mass?: string;
    dimensions?: string;
    carbonFootprintValue?: number;
}

export interface Product extends ProductCreateRequest {
    id: string;
}

// Recycled materials
export interface RecycledMaterialCreateRequest {
    name: string;
    quantityPercentage: number;
    productId: string;
}

export interface RecycledMaterial extends RecycledMaterialCreateRequest {
    id: string;
    createdAt: string;
}

// Harmful substances
export interface HarmfulSubstanceCreateRequest {
    name: string;
    productId: string;
}

export interface HarmfulSubstance extends HarmfulSubstanceCreateRequest {
    id: string;
    createdAt: string;
}

// Shipment types
export type ShipmentType =
    | "PREPARING"
    | "READY_FOR_PICKUP"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED";

export interface ShipmentStage {
    name: string;
    description: string;
}

export interface ShipmentCreateRequest {
    countryFrom: string;
    countryFromCode: string;
    countryTo: string;
    countryToCode: string;
    type: ShipmentType;
    productId: string;
    stages: ShipmentStage[];
}

export interface Shipment extends ShipmentCreateRequest {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}
