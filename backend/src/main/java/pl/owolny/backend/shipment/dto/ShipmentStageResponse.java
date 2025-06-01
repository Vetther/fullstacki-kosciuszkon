package pl.owolny.backend.shipment.dto;
package pl.owolny.backend.shipment.dto;

import pl.owolny.backend.shipment.ShipmentStage;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShipmentStageResponse(
        UUID id,
        String name,
        String description,
        LocalDateTime dateTime,
        UUID shipmentId
) {
    public static ShipmentStageResponse fromEntity(ShipmentStage stage) {
        return new ShipmentStageResponse(
                stage.getId().value(),
                stage.getName(),
                stage.getDescription(),
                stage.getDateTime(),
                stage.getShipment().getId().value()
        );
    }
}

import pl.owolny.backend.shipment.ShipmentStage;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShipmentStageResponse(
        UUID id,
        String name,
        String description,
        LocalDateTime dateTime
) {
    public static ShipmentStageResponse fromEntity(ShipmentStage stage) {
        return new ShipmentStageResponse(
                stage.getId().value(),
                stage.getName(),
                stage.getDescription(),
                stage.getDateTime()
        );
    }
}
