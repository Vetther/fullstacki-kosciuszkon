package pl.owolny.backend.recycledmaterial.vo;
import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record RecycledMaterialId(UUID value) implements BaseId<UUID> {

    public static RecycledMaterialId generate() {
        return new RecycledMaterialId(UUID.randomUUID());
    }

    public static RecycledMaterialId of(String value) {
        return new RecycledMaterialId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}