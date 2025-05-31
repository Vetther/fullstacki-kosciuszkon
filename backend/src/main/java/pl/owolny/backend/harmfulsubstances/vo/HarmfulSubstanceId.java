package pl.owolny.backend.harmfulsubstances.vo;

import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record HarmfulSubstanceId(UUID value) implements BaseId<UUID> {

    public static HarmfulSubstanceId generate() {
        return new HarmfulSubstanceId(UUID.randomUUID());
    }

    public static HarmfulSubstanceId of(String value) {
        return new HarmfulSubstanceId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}