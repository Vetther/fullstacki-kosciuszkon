package pl.owolny.backend.shipment;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStageId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipmentStageServiceImpl implements ShipmentStageService {

    private final ShipmentStageRepository shipmentStageRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ShipmentStage> getAllShipmentStages() {
        return shipmentStageRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentStage getShipmentStageById(ShipmentStageId id) {
        return shipmentStageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Shipment stage not found with id: " + id.value()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShipmentStage> getShipmentStagesByShipmentId(ShipmentId shipmentId) {
        return shipmentStageRepository.findByShipmentId(shipmentId);
    }

    @Override
    @Transactional
    public ShipmentStage createShipmentStage(ShipmentStageCreateRequest request, Shipment shipment) {
        ShipmentStage stage = new ShipmentStage(
                request.name(),
                request.description(),
                request.dateTime(),
                shipment
        );
        return shipmentStageRepository.save(stage);
    }

    @Override
    @Transactional
    public void deleteShipmentStage(ShipmentStageId id) {
        if (!shipmentStageRepository.existsById(id)) {
            throw new EntityNotFoundException("Shipment stage not found with id: " + id.value());
        }
        shipmentStageRepository.deleteById(id);
    }
}
