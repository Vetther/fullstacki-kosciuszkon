package pl.owolny.backend.harmfulsubstances.dto;

import java.util.UUID;

public record HarmfulSubstanceCreateRequest(
        String name,
        UUID productId
) {
}
