package pl.owolny.backend.harmfulsubstances.dto;

import pl.owolny.backend.harmfulsubstances.HarmfulSubstance;

import java.util.UUID;

public record HarmfulSubstanceResponse(
        UUID id,
        String name
) {
    public static HarmfulSubstanceResponse fromEntity(HarmfulSubstance harmfulSubstance) {
        return new HarmfulSubstanceResponse(
                harmfulSubstance.getId().value(),
                harmfulSubstance.getName()
        );
    }
}
