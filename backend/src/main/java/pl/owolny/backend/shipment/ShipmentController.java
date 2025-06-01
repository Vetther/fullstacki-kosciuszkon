package pl.owolny.backend.shipment;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentResponse;
import pl.owolny.backend.shipment.vo.ShipmentId;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ShipmentController {

    private final ShipmentService shipmentService;

    @GetMapping("/shipments")
    public ResponseEntity<List<ShipmentResponse>> getAllShipments() {
        List<Shipment> shipments = shipmentService.getAllShipments();
        List<ShipmentResponse> responses = shipments.stream()
                .map(ShipmentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/shipments/{id}")
    public ResponseEntity<ShipmentResponse> getShipmentById(@PathVariable("id") String id) {
        Shipment shipment = shipmentService.getShipmentById(ShipmentId.of(id));
        return ResponseEntity.ok(ShipmentResponse.fromEntity(shipment));
    }

    @GetMapping("/products/{productId}/shipment")
    public ResponseEntity<ShipmentResponse> getShipmentByProductId(@PathVariable("productId") String productId) {
        Optional<Shipment> shipmentOpt = shipmentService.getShipmentByProductId(ProductId.of(productId));

        return shipmentOpt
                .map(shipment -> ResponseEntity.ok(ShipmentResponse.fromEntity(shipment)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/shipments")
    public ResponseEntity<ShipmentResponse> createShipment(@RequestBody ShipmentCreateRequest request) {
        Shipment createdShipment = shipmentService.createShipment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ShipmentResponse.fromEntity(createdShipment));
    }
}
