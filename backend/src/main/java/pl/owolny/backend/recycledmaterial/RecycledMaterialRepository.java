package pl.owolny.backend.recycledmaterial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;

@Repository
public interface RecycledMaterialRepository extends JpaRepository<RecycledMaterial, RecycledMaterialId> {
    List<RecycledMaterial> findByProductId(ProductId productId);
}
