package pl.owolny.backend.recycledmaterial.dto;

import pl.owolny.backend.recycledmaterial.RecycledMaterial;

public record RecycledMaterialDto(
        String name,
        int quantityPercentage,
        String productId
) {
    public static RecycledMaterialDto fromRecycledMaterial(RecycledMaterial recycledMaterial) {
        return new RecycledMaterialDto(
                recycledMaterial.getName(),
                recycledMaterial.getQuantityPercentage(),
                recycledMaterial.getProductId().value().toString()
        );
    }
}
