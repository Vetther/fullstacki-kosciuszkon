package pl.owolny.backend.recycledmaterial;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialCreateRequest;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialResponse;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialUpdateRequest;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;
import java.util.stream.Collectors;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recycled-materials")
@RequiredArgsConstructor
public class RecycledMaterialController {

    private final RecycledMaterialService recycledMaterialService;

    @GetMapping
    public ResponseEntity<List<RecycledMaterialResponse>> getAllRecycledMaterials() {
        List<RecycledMaterial> recycledMaterials = recycledMaterialService.getAllRecycledMaterials();
        List<RecycledMaterialResponse> responses = recycledMaterials.stream()
                .map(RecycledMaterialResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecycledMaterialResponse> getRecycledMaterialById(@PathVariable("id") String id) {
        RecycledMaterial recycledMaterial = recycledMaterialService.getRecycledMaterialById(RecycledMaterialId.of(id));
        return ResponseEntity.ok(RecycledMaterialResponse.fromEntity(recycledMaterial));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<RecycledMaterialResponse>> getRecycledMaterialsByProductId(@PathVariable("productId") String productId) {
        List<RecycledMaterial> recycledMaterials = recycledMaterialService.getRecycledMaterialsByProductId(ProductId.of(productId));
        List<RecycledMaterialResponse> responses = recycledMaterials.stream()
                .map(RecycledMaterialResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<RecycledMaterialResponse> createRecycledMaterial(@RequestBody RecycledMaterialCreateRequest request) {
        RecycledMaterial createdRecycledMaterial = recycledMaterialService.createRecycledMaterial(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(RecycledMaterialResponse.fromEntity(createdRecycledMaterial));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecycledMaterial(@PathVariable("id") String id) {
        recycledMaterialService.deleteRecycledMaterial(RecycledMaterialId.of(id));
        return ResponseEntity.noContent().build();
    }
}
