package pl.owolny.backend.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.owolny.backend.product.vo.ProductId;

@Repository
public interface ProductRepository extends JpaRepository<Product, ProductId> {
}
