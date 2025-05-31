package pl.owolny.backend.harmfulsubstances;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceCreateRequest;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceResponse;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;
import java.util.stream.Collectors;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/harmful-substances")
@RequiredArgsConstructor
public class HarmfulSubstanceController {

    private final HarmfulSubstanceService harmfulSubstanceService;

    @GetMapping
    public ResponseEntity<List<HarmfulSubstanceResponse>> getAllHarmfulSubstances() {
        List<HarmfulSubstance> harmfulSubstances = harmfulSubstanceService.getAllHarmfulSubstances();
        List<HarmfulSubstanceResponse> responses = harmfulSubstances.stream()
                .map(HarmfulSubstanceResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HarmfulSubstanceResponse> getHarmfulSubstanceById(@PathVariable("id") String id) {
        HarmfulSubstance harmfulSubstance = harmfulSubstanceService.getHarmfulSubstanceById(HarmfulSubstanceId.of(id));
        return ResponseEntity.ok(HarmfulSubstanceResponse.fromEntity(harmfulSubstance));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<HarmfulSubstanceResponse>> getHarmfulSubstancesByProductId(@PathVariable("productId") String productId) {
        List<HarmfulSubstance> harmfulSubstances = harmfulSubstanceService.getHarmfulSubstancesByProductId(ProductId.of(productId));
        List<HarmfulSubstanceResponse> responses = harmfulSubstances.stream()
                .map(HarmfulSubstanceResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<HarmfulSubstanceResponse> createHarmfulSubstance(@RequestBody HarmfulSubstanceCreateRequest request) {
        HarmfulSubstance createdHarmfulSubstance = harmfulSubstanceService.createHarmfulSubstance(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(HarmfulSubstanceResponse.fromEntity(createdHarmfulSubstance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHarmfulSubstance(@PathVariable("id") String id) {
        harmfulSubstanceService.deleteHarmfulSubstance(HarmfulSubstanceId.of(id));
        return ResponseEntity.noContent().build();
    }
}
