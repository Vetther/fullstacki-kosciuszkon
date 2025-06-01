package pl.owolny.backend.shipment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentResponse;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final ShipmentService shipmentService;

    @GetMapping
    public ResponseEntity<List<ShipmentResponse>> getAllShipments() {
        List<Shipment> shipments = shipmentService.getAllShipments();
        List<ShipmentResponse> responses = shipments.stream()
                .map(ShipmentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipmentResponse> getShipmentById(@PathVariable("id") String id) {
        Shipment shipment = shipmentService.getShipmentById(ShipmentId.of(id));
        return ResponseEntity.ok(ShipmentResponse.fromEntity(shipment));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getShipmentByProductId(@PathVariable("productId") String productId) {
        return shipmentService.getShipmentByProductId(ProductId.of(productId))
                .map(shipment -> ResponseEntity.ok(ShipmentResponse.fromEntity(shipment)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ShipmentResponse> createShipment(@RequestBody ShipmentCreateRequest request) {
        Shipment createdShipment = shipmentService.createShipment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ShipmentResponse.fromEntity(createdShipment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShipment(@PathVariable("id") String id) {
        shipmentService.deleteShipment(ShipmentId.of(id));
        return ResponseEntity.noContent().build();
    }
}
