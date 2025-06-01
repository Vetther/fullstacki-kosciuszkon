"use client";

import React from "react";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import type {
    ProductCreateRequest,
    ProductCategory,
    RecycledMaterialCreateRequest,
    HarmfulSubstanceCreateRequest,
    ShipmentCreateRequest,
    ShipmentStage,
    ShipmentType,
} from "../lib/types";
import {
    createProduct,
    addRecycledMaterial,
    addHarmfulSubstance,
    addShipment,
} from "../lib/api-client";
import { useToast } from "@/components/ui/use-toast";

type FormStage = "basic" | "materials" | "substances" | "shipment" | "complete";

export default function AddProductForm() {
    const { toast } = useToast();
    const [currentStage, setCurrentStage] = useState<FormStage>("basic");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdProductId, setCreatedProductId] = useState<string | null>(
        null
    );

    // Basic product information
    const [basicInfo, setBasicInfo] = useState<ProductCreateRequest>({
        name: "",
        modelType: "",
        productCategory: "BATTERY",
        baseInfo: {
            manufacturer: "",
            productionCountry: "",
            productionDate: "",
            installationDate: "",
            vehicleInfo: "",
        },
        nominalCapacity: "",
        nominalVoltage: "",
        mass: "",
        dimensions: "",
        carbonFootprintValue: 0,
    });

    // Recycled materials
    const [recycledMaterials, setRecycledMaterials] = useState<
        {
            name: string;
            quantityPercentage: number;
        }[]
    >([{ name: "", quantityPercentage: 0 }]);

    // Harmful substances
    const [harmfulSubstances, setHarmfulSubstances] = useState<
        {
            name: string;
        }[]
    >([{ name: "" }]);

    // Shipment information
    const [shipmentInfo, setShipmentInfo] = useState<{
        countryFrom: string;
        countryFromCode: string;
        countryTo: string;
        countryToCode: string;
        type: ShipmentType;
        stages: ShipmentStage[];
    }>({
        countryFrom: "",
        countryFromCode: "",
        countryTo: "",
        countryToCode: "",
        type: "PREPARING",
        stages: [{ name: "", description: "" }],
    });

    // Handle basic info changes
    const handleBasicInfoChange = (field: string, value: any) => {
        if (field.includes(".")) {
            const [parent, child] = field.split(".");
            setBasicInfo((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof typeof prev] as object),
                    [child]: value,
                },
            }));
        } else {
            setBasicInfo((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    // Handle recycled materials changes
    const handleMaterialChange = (index: number, field: string, value: any) => {
        const updatedMaterials = [...recycledMaterials];
        updatedMaterials[index] = {
            ...updatedMaterials[index],
            [field]: value,
        };
        setRecycledMaterials(updatedMaterials);
    };

    const addMaterial = () => {
        setRecycledMaterials([
            ...recycledMaterials,
            { name: "", quantityPercentage: 0 },
        ]);
    };

    const removeMaterial = (index: number) => {
        if (recycledMaterials.length > 1) {
            const updatedMaterials = recycledMaterials.filter(
                (_, i) => i !== index
            );
            setRecycledMaterials(updatedMaterials);
        }
    };

    // Handle harmful substances changes
    const handleSubstanceChange = (index: number, value: string) => {
        const updatedSubstances = [...harmfulSubstances];
        updatedSubstances[index] = { name: value };
        setHarmfulSubstances(updatedSubstances);
    };

    const addSubstance = () => {
        setHarmfulSubstances([...harmfulSubstances, { name: "" }]);
    };

    const removeSubstance = (index: number) => {
        if (harmfulSubstances.length > 1) {
            const updatedSubstances = harmfulSubstances.filter(
                (_, i) => i !== index
            );
            setHarmfulSubstances(updatedSubstances);
        }
    };

    // Handle shipment changes
    const handleShipmentChange = (field: string, value: any) => {
        setShipmentInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleShipmentStageChange = (
        index: number,
        field: string,
        value: string
    ) => {
        const updatedStages = [...shipmentInfo.stages];
        updatedStages[index] = {
            ...updatedStages[index],
            [field]: value,
        };
        setShipmentInfo((prev) => ({
            ...prev,
            stages: updatedStages,
        }));
    };

    const addShipmentStage = () => {
        setShipmentInfo((prev) => ({
            ...prev,
            stages: [...prev.stages, { name: "", description: "" }],
        }));
    };

    const removeShipmentStage = (index: number) => {
        if (shipmentInfo.stages.length > 1) {
            const updatedStages = shipmentInfo.stages.filter(
                (_, i) => i !== index
            );
            setShipmentInfo((prev) => ({
                ...prev,
                stages: updatedStages,
            }));
        }
    };

    // Submit handlers for each stage
    const handleSubmitBasicInfo = async () => {
        try {
            setIsSubmitting(true);
            const product = await createProduct(basicInfo);
            console.log("success1", product);
            console.log(product.id);
            setCreatedProductId(product.id);
            setCurrentStage("materials");
            console.log("success2");
            toast({
                title: "Product created successfully",
                description: `Product ID: ${product.id}`,
            });
            console.log("success3");
        } catch (error) {
            toast({
                title: "Error creating product",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitMaterials = async () => {
        if (!createdProductId) return;

        try {
            setIsSubmitting(true);

            // Submit each material one by one
            for (const material of recycledMaterials) {
                if (material.name.trim()) {
                    const materialRequest: RecycledMaterialCreateRequest = {
                        ...material,
                        productId: createdProductId,
                    };
                    await addRecycledMaterial(materialRequest);
                }
            }

            setCurrentStage("substances");
            toast({
                title: "Materials added successfully",
            });
        } catch (error) {
            toast({
                title: "Error adding materials",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitSubstances = async () => {
        if (!createdProductId) return;

        try {
            setIsSubmitting(true);

            // Submit each substance one by one
            for (const substance of harmfulSubstances) {
                if (substance.name.trim()) {
                    const substanceRequest: HarmfulSubstanceCreateRequest = {
                        name: substance.name,
                        productId: createdProductId,
                    };
                    await addHarmfulSubstance(substanceRequest);
                }
            }

            setCurrentStage("shipment");
            toast({
                title: "Substances added successfully",
            });
        } catch (error) {
            toast({
                title: "Error adding substances",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitShipment = async () => {
        if (!createdProductId) return;

        try {
            setIsSubmitting(true);

            const shipmentRequest: ShipmentCreateRequest = {
                ...shipmentInfo,
                productId: createdProductId,
            };

            await addShipment(shipmentRequest);
            setCurrentStage("complete");
            toast({
                title: "Shipment information added successfully",
            });
        } catch (error) {
            toast({
                title: "Error adding shipment information",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render different form stages
    const renderBasicInfoForm = () => (
        <>
            {/* Basic Information */}
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                        Basic Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={basicInfo.name}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "name",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., Bateria EV"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="modelType">Model Type</Label>
                            <Input
                                id="modelType"
                                value={basicInfo.modelType}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "modelType",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., CCP811"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="productCategory">Category</Label>
                            <Select
                                value={basicInfo.productCategory}
                                onValueChange={(value) =>
                                    handleBasicInfoChange(
                                        "productCategory",
                                        value as ProductCategory
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BATTERY">
                                        Battery
                                    </SelectItem>
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
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="manufacturer">Manufacturer</Label>
                            <Input
                                id="manufacturer"
                                value={basicInfo.baseInfo.manufacturer}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "baseInfo.manufacturer",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., CustomCells SE"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="productionCountry">
                                Country of Production
                            </Label>
                            <Input
                                id="productionCountry"
                                value={basicInfo.baseInfo.productionCountry}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "baseInfo.productionCountry",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., Germany"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="productionDate">
                                Production Date
                            </Label>
                            <Input
                                id="productionDate"
                                type="date"
                                value={basicInfo.baseInfo.productionDate}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "baseInfo.productionDate",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="installationDate">
                                Installation Date
                            </Label>
                            <Input
                                id="installationDate"
                                type="date"
                                value={basicInfo.baseInfo.installationDate}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "baseInfo.installationDate",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vehicleInfo">
                                Vehicle Information
                            </Label>
                            <Input
                                id="vehicleInfo"
                                value={basicInfo.baseInfo.vehicleInfo || ""}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "baseInfo.vehicleInfo",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., Audi e-tron GT (2023)"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                        Technical Specifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nominalCapacity">
                                Nominal Capacity
                            </Label>
                            <Input
                                id="nominalCapacity"
                                value={basicInfo.nominalCapacity}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "nominalCapacity",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., 50 Ah"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nominalVoltage">
                                Nominal Voltage
                            </Label>
                            <Input
                                id="nominalVoltage"
                                value={basicInfo.nominalVoltage}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "nominalVoltage",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., 20 V"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mass">Mass</Label>
                            <Input
                                id="mass"
                                value={basicInfo.mass}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "mass",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., 51 g"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dimensions">Dimensions</Label>
                            <Input
                                id="dimensions"
                                value={basicInfo.dimensions}
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "dimensions",
                                        e.target.value
                                    )
                                }
                                placeholder="e.g., 1.5m x 1m x 0.2m"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="carbonFootprintValue">
                                Carbon Footprint (kg CO2e)
                            </Label>
                            <Input
                                id="carbonFootprintValue"
                                type="number"
                                value={
                                    basicInfo.carbonFootprintValue?.toString() ||
                                    "0"
                                }
                                onChange={(e) =>
                                    handleBasicInfoChange(
                                        "carbonFootprintValue",
                                        Number.parseFloat(e.target.value) || 0
                                    )
                                }
                                placeholder="e.g., 15.2"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={handleSubmitBasicInfo}
                        className="bg-slate-900 hover:bg-slate-800"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </>
    );

    const renderMaterialsForm = () => (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    Recycled Materials
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {recycledMaterials.map((material, index) => (
                    <div
                        key={index}
                        className="p-4 border border-slate-200 rounded-lg space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-slate-900">
                                Material {index + 1}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMaterial(index)}
                                disabled={recycledMaterials.length === 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`material-name-${index}`}>
                                    Material Name
                                </Label>
                                <Input
                                    id={`material-name-${index}`}
                                    value={material.name}
                                    onChange={(e) =>
                                        handleMaterialChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., Recycled Lithium"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`material-percentage-${index}`}>
                                    Quantity Percentage (%)
                                </Label>
                                <Input
                                    id={`material-percentage-${index}`}
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={material.quantityPercentage}
                                    onChange={(e) =>
                                        handleMaterialChange(
                                            index,
                                            "quantityPercentage",
                                            Number.parseFloat(e.target.value) ||
                                                0
                                        )
                                    }
                                    placeholder="e.g., 25"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <Button
                    variant="outline"
                    type="button"
                    onClick={addMaterial}
                    className="w-full"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Material
                </Button>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStage("basic")}
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmitMaterials}
                    className="bg-slate-900 hover:bg-slate-800"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );

    const renderSubstancesForm = () => (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    Harmful Substances
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {harmfulSubstances.map((substance, index) => (
                    <div
                        key={index}
                        className="p-4 border border-slate-200 rounded-lg space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-slate-900">
                                Substance {index + 1}
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubstance(index)}
                                disabled={harmfulSubstances.length === 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`substance-name-${index}`}>
                                Substance Name
                            </Label>
                            <Input
                                id={`substance-name-${index}`}
                                value={substance.name}
                                onChange={(e) =>
                                    handleSubstanceChange(index, e.target.value)
                                }
                                placeholder="e.g., Lead"
                            />
                        </div>
                    </div>
                ))}
                <Button
                    variant="outline"
                    type="button"
                    onClick={addSubstance}
                    className="w-full"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Substance
                </Button>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStage("materials")}
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmitSubstances}
                    className="bg-slate-900 hover:bg-slate-800"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );

    const renderShipmentForm = () => (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                    Shipment Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="countryFrom">Country From</Label>
                        <Input
                            id="countryFrom"
                            value={shipmentInfo.countryFrom}
                            onChange={(e) =>
                                handleShipmentChange(
                                    "countryFrom",
                                    e.target.value
                                )
                            }
                            placeholder="e.g., Germany"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="countryFromCode">
                            Country From Code
                        </Label>
                        <Input
                            id="countryFromCode"
                            value={shipmentInfo.countryFromCode}
                            onChange={(e) =>
                                handleShipmentChange(
                                    "countryFromCode",
                                    e.target.value
                                )
                            }
                            placeholder="e.g., DE"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="countryTo">Country To</Label>
                        <Input
                            id="countryTo"
                            value={shipmentInfo.countryTo}
                            onChange={(e) =>
                                handleShipmentChange(
                                    "countryTo",
                                    e.target.value
                                )
                            }
                            placeholder="e.g., France"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="countryToCode">Country To Code</Label>
                        <Input
                            id="countryToCode"
                            value={shipmentInfo.countryToCode}
                            onChange={(e) =>
                                handleShipmentChange(
                                    "countryToCode",
                                    e.target.value
                                )
                            }
                            placeholder="e.g., FR"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shipmentType">Shipment Type</Label>
                        <Select
                            value={shipmentInfo.type}
                            onValueChange={(value) =>
                                handleShipmentChange(
                                    "type",
                                    value as ShipmentType
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PREPARING">
                                    Preparing
                                </SelectItem>
                                <SelectItem value="IN_TRANSIT">
                                    In Transit
                                </SelectItem>
                                <SelectItem value="DELIVERED">
                                    Delivered
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">
                        Shipment Stages
                    </h3>
                    {shipmentInfo.stages.map((stage, index) => (
                        <div
                            key={index}
                            className="p-4 border border-slate-200 rounded-lg space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-900">
                                    Stage {index + 1}
                                </h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeShipmentStage(index)}
                                    disabled={shipmentInfo.stages.length === 1}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`stage-name-${index}`}>
                                        Stage Name
                                    </Label>
                                    <Input
                                        id={`stage-name-${index}`}
                                        value={stage.name}
                                        onChange={(e) =>
                                            handleShipmentStageChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g., Packaging"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor={`stage-description-${index}`}
                                    >
                                        Description
                                    </Label>
                                    <Textarea
                                        id={`stage-description-${index}`}
                                        value={stage.description}
                                        onChange={(e) =>
                                            handleShipmentStageChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Detailed description of this stage..."
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        type="button"
                        onClick={addShipmentStage}
                        className="w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Stage
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={() => setCurrentStage("substances")}
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmitShipment}
                    className="bg-slate-900 hover:bg-slate-800"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            Complete
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );

    const renderCompletionMessage = () => (
        <Card className="border-slate-200 text-center py-12">
            <CardContent className="space-y-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Product Added Successfully!
                    </h2>
                    <p className="text-slate-600">
                        Your product has been added to the Digital Product
                        Passport system with ID: {createdProductId}
                    </p>
                </div>
                <div className="pt-6">
                    <Button
                        onClick={() => (window.location.href = "/products")}
                        className="bg-slate-900 hover:bg-slate-800"
                    >
                        View All Products
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    // Progress indicator
    const renderProgressIndicator = () => {
        const stages = [
            { id: "basic", label: "Basic Info" },
            { id: "materials", label: "Materials" },
            { id: "substances", label: "Substances" },
            { id: "shipment", label: "Shipment" },
        ];

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {stages.map((stage, index) => (
                        <React.Fragment key={stage.id}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        currentStage === stage.id ||
                                        (currentStage === "complete" &&
                                            stage.id === "shipment") ||
                                        stages.findIndex(
                                            (s) => s.id === currentStage
                                        ) > index
                                            ? "bg-slate-900 text-white"
                                            : "bg-slate-200 text-slate-600"
                                    }`}
                                >
                                    {index + 1}
                                </div>
                                <span className="text-xs mt-2 text-slate-600">
                                    {stage.label}
                                </span>
                            </div>
                            {index < stages.length - 1 && (
                                <div
                                    className={`flex-1 h-1 mx-2 ${
                                        stages.findIndex(
                                            (s) => s.id === currentStage
                                        ) > index
                                            ? "bg-slate-900"
                                            : "bg-slate-200"
                                    }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {currentStage !== "complete" && renderProgressIndicator()}

            {currentStage === "basic" && renderBasicInfoForm()}
            {currentStage === "materials" && renderMaterialsForm()}
            {currentStage === "substances" && renderSubstancesForm()}
            {currentStage === "shipment" && renderShipmentForm()}
            {currentStage === "complete" && renderCompletionMessage()}
        </div>
    );
}
