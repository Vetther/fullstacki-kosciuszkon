package pl.owolny.backend.recycledmaterial;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialDto;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;

@Service
@AllArgsConstructor
public class RecycledMaterialService {

    private final RecycledMaterialRepository recycledMaterialRepository;

    public RecycledMaterial findById(RecycledMaterialId recycledMaterialId) {
        return recycledMaterialRepository.findById(recycledMaterialId)
                .orElseThrow(() -> new EntityNotFoundException("Recycled material not found with id: " + recycledMaterialId));
    }

    public List<RecycledMaterial> findAll() {
        return recycledMaterialRepository.findAll();
    }

    public List<RecycledMaterial> findByProductId(ProductId productId) {
        return recycledMaterialRepository.findByProductId(productId);
    }

    public RecycledMaterial createRecycledMaterial(RecycledMaterialDto recycledMaterialDto) {
        RecycledMaterial recycledMaterial = new RecycledMaterial(
                recycledMaterialDto.name(),
                recycledMaterialDto.quantityPercentage(),
                ProductId.of(recycledMaterialDto.productId())
        );

        return recycledMaterialRepository.save(recycledMaterial);
    }
}
