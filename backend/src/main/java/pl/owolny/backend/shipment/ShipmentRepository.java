package pl.owolny.backend.shipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, ShipmentId> {
    Optional<Shipment> findByProductId(ProductId productId);
}
