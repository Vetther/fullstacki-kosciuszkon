package pl.owolny.backend.shipment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentStageResponse;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStageId;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shipment-stages")
@RequiredArgsConstructor
public class ShipmentStageController {

    private final ShipmentStageService shipmentStageService;
    private final ShipmentService shipmentService;

    @GetMapping
    public ResponseEntity<List<ShipmentStageResponse>> getAllShipmentStages() {
        List<ShipmentStage> stages = shipmentStageService.getAllShipmentStages();
        List<ShipmentStageResponse> responses = stages.stream()
                .map(ShipmentStageResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipmentStageResponse> getShipmentStageById(@PathVariable("id") String id) {
        ShipmentStage stage = shipmentStageService.getShipmentStageById(ShipmentStageId.of(id));
        return ResponseEntity.ok(ShipmentStageResponse.fromEntity(stage));
    }

    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<ShipmentStageResponse>> getShipmentStagesByShipmentId(@PathVariable("shipmentId") String shipmentId) {
        List<ShipmentStage> stages = shipmentStageService.getShipmentStagesByShipmentId(ShipmentId.of(shipmentId));
        List<ShipmentStageResponse> responses = stages.stream()
                .map(ShipmentStageResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/shipment/{shipmentId}")
    public ResponseEntity<ShipmentStageResponse> createShipmentStage(
            @PathVariable("shipmentId") String shipmentId,
            @RequestBody ShipmentStageCreateRequest request) {
        Shipment shipment = shipmentService.getShipmentById(ShipmentId.of(shipmentId));
        ShipmentStage createdStage = shipmentStageService.createShipmentStage(request, shipment);
        shipment.addStage(createdStage);
        return ResponseEntity.status(HttpStatus.CREATED).body(ShipmentStageResponse.fromEntity(createdStage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipmentStage(@PathVariable("id") String id) {
        shipmentStageService.deleteShipmentStage(ShipmentStageId.of(id));
        return ResponseEntity.noContent().build();
    }
}
