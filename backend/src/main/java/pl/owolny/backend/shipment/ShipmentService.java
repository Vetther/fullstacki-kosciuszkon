package pl.owolny.backend.shipment;

import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.List;
import java.util.Optional;

public interface ShipmentService {
    List<Shipment> getAllShipments();
    Shipment getShipmentById(ShipmentId id);
    Optional<Shipment> getShipmentByProductId(ProductId productId);
    Shipment createShipment(ShipmentCreateRequest request);
    void deleteShipment(ShipmentId id);
}
