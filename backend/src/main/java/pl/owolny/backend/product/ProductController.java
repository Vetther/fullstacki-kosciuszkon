package pl.owolny.backend.product;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.owolny.backend.product.dto.ProductDto;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getProducts() {
        return ResponseEntity.ok(productService.findAll().stream()
                        .map(ProductDto::fromProduct)
                        .collect(toList())
        );
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(ProductDto.fromProduct(productService.findById(ProductId.of(id))));
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product) {
        Product savedProduct = productService.createProduct(product);
        return ResponseEntity.ok(ProductDto.fromProduct(savedProduct));
    }

    @GetMapping("/products/{id}/lock")
    public ResponseEntity<String> lockProduct(@PathVariable(name = "id") String id) {
        Product product = productService.findById(ProductId.of(id));
        String hash = productService.generateProductHash(product);
        return ResponseEntity.ok(hash);
    }
}
