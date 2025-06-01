package pl.owolny.backend.shipment.dto;

import java.time.LocalDateTime;

public record ShipmentStageCreateRequest(
        String name,
        String description,
        LocalDateTime dateTime
) {
}
