package pl.owolny.backend.shipment;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductService;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final ProductService productService;

    @Override
    @Transactional(readOnly = true)
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Shipment getShipmentById(ShipmentId id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Shipment not found with id: " + id.value()));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Shipment> getShipmentByProductId(ProductId productId) {
        return shipmentRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public Shipment createShipment(ShipmentCreateRequest request) {
        Product product = productService.getProductById(ProductId.of(request.productId()));

        Shipment shipment = new Shipment(
                request.countryFrom(),
                request.countryFromCode(),
                request.countryTo(),
                request.countryToCode(),
                request.type(),
                product
        );

        // Add stages if provided
        if (request.stages() != null && !request.stages().isEmpty()) {
            for (ShipmentStageCreateRequest stageRequest : request.stages()) {
                ShipmentStage stage = new ShipmentStage(
                        stageRequest.name(),
                        stageRequest.description(),
                        stageRequest.dateTime()
                );
                shipment.addStage(stage);
            }
        }

        return shipmentRepository.save(shipment);
    }

    @Override
    @Transactional
    public void deleteShipment(ShipmentId id) {
        if (!shipmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Shipment not found with id: " + id.value());
        }
        shipmentRepository.deleteById(id);
    }
}
