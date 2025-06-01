package pl.owolny.backend.shipment;

import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStageId;

import java.util.List;

public interface ShipmentStageService {
    List<ShipmentStage> getAllShipmentStages();
    ShipmentStage getShipmentStageById(ShipmentStageId id);
    List<ShipmentStage> getShipmentStagesByShipmentId(ShipmentId shipmentId);
    ShipmentStage createShipmentStage(ShipmentStageCreateRequest request, Shipment shipment);
    void deleteShipmentStage(ShipmentStageId id);
}
