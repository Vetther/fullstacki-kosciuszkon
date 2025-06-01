package pl.owolny.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstance;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstanceService;
import pl.owolny.backend.product.dto.ProductCreateRequest;
import pl.owolny.backend.product.dto.ProductResponse;
import pl.owolny.backend.product.dto.ProductUpdateRequest;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.RecycledMaterial;
import pl.owolny.backend.recycledmaterial.RecycledMaterialService;
import pl.owolny.backend.shipment.Shipment;
import pl.owolny.backend.shipment.ShipmentService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final HarmfulSubstanceService harmfulSubstanceService;
    private final ShipmentService shipmentService;
    private final RecycledMaterialService recycledMaterialService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductResponse> responses = products.stream()
                .map(this::produceResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductById(ProductId.of(id));
        ProductResponse response = produceResponse(product);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductCreateRequest request) {
        Product createdProduct = productService.createProduct(request);
        ProductResponse response = produceResponse(createdProduct);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") String id) {
        productService.deleteProduct(ProductId.of(id));
        return ResponseEntity.noContent().build();
    }

    private ProductResponse produceResponse(Product product) {
        return ProductResponse.fromEntity(product);
    }
}
