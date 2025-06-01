package pl.owolny.backend.shipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStageId;

import java.util.List;

@Repository
public interface ShipmentStageRepository extends JpaRepository<ShipmentStage, ShipmentStageId> {
    List<ShipmentStage> findByShipmentId(ShipmentId shipmentId);
}
