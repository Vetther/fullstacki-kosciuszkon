package pl.owolny.backend.shipment.dto;

import pl.owolny.backend.shipment.Shipment;
import pl.owolny.backend.shipment.vo.ShipmentStatus;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record ShipmentResponse(
        UUID id,
        String countryFrom,
        String countryFromCode,
        String countryTo,
        String countryToCode,
        ShipmentStatus type,
        List<ShipmentStageResponse> stages
) {
    public static ShipmentResponse fromEntity(Shipment shipment) {
        List<ShipmentStageResponse> stageResponses = shipment.getStages().stream()
                .map(ShipmentStageResponse::fromEntity)
                .collect(Collectors.toList());

        return new ShipmentResponse(
                shipment.getId().value(),
                shipment.getCountryFrom(),
                shipment.getCountryFromCode(),
                shipment.getCountryTo(),
                shipment.getCountryToCode(),
                shipment.getType(),
                stageResponses
        );
    }
}
