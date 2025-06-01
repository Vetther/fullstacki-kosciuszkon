package pl.owolny.backend.shipment.vo;
package pl.owolny.backend.shipment.vo;

import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record ShipmentStageId(UUID value) implements BaseId<UUID> {

    public static ShipmentStageId generate() {
        return new ShipmentStageId(UUID.randomUUID());
    }

    public static ShipmentStageId of(String value) {
        return new ShipmentStageId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}
import pl.owolny.backend.common.BaseId;

import java.util.UUID;

public record ShipmentStageId(UUID value) implements BaseId<UUID> {

    public static ShipmentStageId generate() {
        return new ShipmentStageId(UUID.randomUUID());
    }

    public static ShipmentStageId of(String value) {
        return new ShipmentStageId(UUID.fromString(value));
    }

    @Override
    public UUID getValue() {
        return value;
    }
}