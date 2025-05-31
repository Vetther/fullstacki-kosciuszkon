package pl.owolny.backend.harmfulsubstances;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

@Repository
public interface HarmfulSubstanceRepository extends JpaRepository<HarmfulSubstance, HarmfulSubstanceId> {
    List<HarmfulSubstance> findByProductId(ProductId productId);
}
