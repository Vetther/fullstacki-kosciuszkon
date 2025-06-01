package pl.owolny.backend.harmfulsubstances;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceDto;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class HarmfulSubstanceController {

    private final HarmfulSubstanceService harmfulSubstanceService;

    @GetMapping("/harmful-substances")
    public ResponseEntity<List<HarmfulSubstanceDto>> getHarmfulSubstances() {
        return ResponseEntity.ok(harmfulSubstanceService.findAll().stream()
                .map(HarmfulSubstanceDto::fromHarmfulSubstance)
                .collect(toList())
        );
    }

    @GetMapping("/harmful-substances/{id}")
    public ResponseEntity<HarmfulSubstanceDto> getHarmfulSubstanceById(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(HarmfulSubstanceDto.fromHarmfulSubstance(
                harmfulSubstanceService.findById(HarmfulSubstanceId.of(id))));
    }

    @GetMapping("/products/{productId}/harmful-substances")
    public ResponseEntity<List<HarmfulSubstanceDto>> getHarmfulSubstancesByProductId(
            @PathVariable(name = "productId") String productId) {
        return ResponseEntity.ok(harmfulSubstanceService.findByProductId(ProductId.of(productId)).stream()
                .map(HarmfulSubstanceDto::fromHarmfulSubstance)
                .collect(toList())
        );
    }

    @PostMapping("/harmful-substances")
    public ResponseEntity<HarmfulSubstanceDto> createHarmfulSubstance(@RequestBody HarmfulSubstanceDto harmfulSubstanceDto) {
        HarmfulSubstance savedHarmfulSubstance = harmfulSubstanceService.createHarmfulSubstance(harmfulSubstanceDto);
        return ResponseEntity.ok(HarmfulSubstanceDto.fromHarmfulSubstance(savedHarmfulSubstance));
    }
}
