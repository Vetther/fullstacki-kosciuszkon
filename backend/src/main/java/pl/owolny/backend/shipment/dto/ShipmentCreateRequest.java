package pl.owolny.backend.shipment.dto;

import pl.owolny.backend.shipment.vo.ShipmentStatus;

import java.util.List;

public record ShipmentCreateRequest(
        String countryFrom,
        String countryFromCode,
        String countryTo,
        String countryToCode,
        ShipmentStatus type,
        List<ShipmentStageCreateRequest> stages,
        String productId
) {
}
