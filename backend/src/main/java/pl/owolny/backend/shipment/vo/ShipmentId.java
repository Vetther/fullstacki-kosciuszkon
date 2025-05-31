package pl.owolny.backend.shipment.vo;

import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record ShipmentId(UUID value) implements BaseId<UUID> {

    public static ShipmentId generate() {
        return new ShipmentId(UUID.randomUUID());
    }

    public static ShipmentId of(String value) {
        return new ShipmentId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}