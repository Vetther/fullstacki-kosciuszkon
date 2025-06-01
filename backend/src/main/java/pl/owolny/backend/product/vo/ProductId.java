package pl.owolny.backend.product.vo;

import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record ProductId(UUID value) implements BaseId<UUID> {

    public static ProductId generate() {
        return new ProductId(UUID.randomUUID());
    }

    public static ProductId of(String value) {
        return new ProductId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}