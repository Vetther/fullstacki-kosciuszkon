package pl.owolny.backend.recycledmaterial;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialDto;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class RecycledMaterialController {

    private final RecycledMaterialService recycledMaterialService;

    @GetMapping("/recycled-materials")
    public ResponseEntity<List<RecycledMaterialDto>> getRecycledMaterials() {
        return ResponseEntity.ok(recycledMaterialService.findAll().stream()
                .map(RecycledMaterialDto::fromRecycledMaterial)
                .collect(toList())
        );
    }

    @GetMapping("/recycled-materials/{id}")
    public ResponseEntity<RecycledMaterialDto> getRecycledMaterialById(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(RecycledMaterialDto.fromRecycledMaterial(
                recycledMaterialService.findById(RecycledMaterialId.of(id))));
    }

    @GetMapping("/products/{productId}/recycled-materials")
    public ResponseEntity<List<RecycledMaterialDto>> getRecycledMaterialsByProductId(
            @PathVariable(name = "productId") String productId) {
        return ResponseEntity.ok(recycledMaterialService.findByProductId(ProductId.of(productId)).stream()
                .map(RecycledMaterialDto::fromRecycledMaterial)
                .collect(toList())
        );
    }

    @PostMapping("/recycled-materials")
    public ResponseEntity<RecycledMaterialDto> createRecycledMaterial(@RequestBody RecycledMaterialDto recycledMaterialDto) {
        RecycledMaterial savedRecycledMaterial = recycledMaterialService.createRecycledMaterial(recycledMaterialDto);
        return ResponseEntity.ok(RecycledMaterialDto.fromRecycledMaterial(savedRecycledMaterial));
    }
}
