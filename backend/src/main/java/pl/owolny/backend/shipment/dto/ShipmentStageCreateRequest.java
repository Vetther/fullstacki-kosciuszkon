package pl.owolny.backend.shipment.dto;

public record ShipmentStageCreateRequest(
        String name,
        String description) {
}
