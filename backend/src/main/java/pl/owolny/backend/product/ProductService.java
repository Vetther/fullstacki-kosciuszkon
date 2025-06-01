package pl.owolny.backend.product;

import pl.owolny.backend.product.dto.ProductCreateRequest;
import pl.owolny.backend.product.dto.ProductUpdateRequest;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(ProductId id);
    Product createProduct(ProductCreateRequest request);
    void deleteProduct(ProductId id);
}
