package pl.owolny.backend.harmfulsubstances.dto;

import pl.owolny.backend.harmfulsubstances.HarmfulSubstance;

public record HarmfulSubstanceDto(
        String name,
        String productId
) {
    public static HarmfulSubstanceDto fromHarmfulSubstance(HarmfulSubstance harmfulSubstance) {
        return new HarmfulSubstanceDto(
                harmfulSubstance.getName(),
                harmfulSubstance.getProductId().value().toString()
        );
    }
}
