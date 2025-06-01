package pl.owolny.backend.shipment;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;

    @Transactional(readOnly = true)
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Shipment getShipmentById(ShipmentId id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Shipment not found with id: " + id.value()));
    }

    @Transactional(readOnly = true)
    public Optional<Shipment> getShipmentByProductId(ProductId productId) {
        return shipmentRepository.findByProductId(productId);
    }

    @Transactional
    public Shipment createShipment(ShipmentCreateRequest request) {

        Shipment shipment = new Shipment(
                request.countryFrom(),
                request.countryFromCode(),
                request.countryTo(),
                request.countryToCode(),
                request.type(),
                ProductId.of(request.productId())
        );

        // First save the shipment to get an ID
        Shipment savedShipment = shipmentRepository.save(shipment);

        // Create and add stages if any
        if (request.stages() != null && !request.stages().isEmpty()) {
            for (ShipmentStageCreateRequest stageRequest : request.stages()) {
                ShipmentStage stage = new ShipmentStage(
                        stageRequest.name(),
                        stageRequest.description()
                );
                savedShipment.addStage(stage);
            }
        }

        return savedShipment;
    }
}
