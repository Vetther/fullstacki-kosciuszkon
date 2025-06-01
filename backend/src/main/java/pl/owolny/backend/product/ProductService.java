package pl.owolny.backend.product;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import pl.owolny.backend.hasher.ProductDataHasher;
import pl.owolny.backend.product.dto.ProductDto;
import pl.owolny.backend.product.vo.ProductId;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDataHasher productDataHasher;
    private final RestClient restClient;

    public Product findById(ProductId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product createProduct(ProductDto productDto) {
        Product product = new Product(
                productDto.id() != null ? ProductId.of(productDto.id()) : ProductId.generate(),
                productDto.name(),
                productDto.imageUrl(),
                productDto.modelType(),
                productDto.productCategory(),
                productDto.baseInfo(),
                productDto.nominalCapacity(),
                productDto.nominalVoltage(),
                productDto.mass(),
                productDto.dimensions(),
                productDto.carbonFootprintValue()
        );

        return productRepository.save(product);
    }

    public String generateProductHash(Product product) {
        try {
            String hash = productDataHasher.calculateProductDataHash(product);
            System.out.println("sending hash to blockchain service: " + hash);
            String blockchainKey = restClient.get()
                    .uri("/database/save?hash_code={hash}", hash)
                    .retrieve()
                    .body(String.class);
            System.out.println("Response from blockchain service: " + blockchainKey);
            return hash;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Hashing failed", e);
        }
    }

}
