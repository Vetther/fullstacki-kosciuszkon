package pl.owolny.backend.recycledmaterial;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductService;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialCreateRequest;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecycledMaterialServiceImpl implements RecycledMaterialService {

    private final RecycledMaterialRepository recycledMaterialRepository;
    private final ProductService productService;

    @Override
    @Transactional(readOnly = true)
    public List<RecycledMaterial> getAllRecycledMaterials() {
        return recycledMaterialRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public RecycledMaterial getRecycledMaterialById(RecycledMaterialId id) {
        return recycledMaterialRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recycled material not found with id: " + id.value()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecycledMaterial> getRecycledMaterialsByProductId(ProductId productId) {
        return recycledMaterialRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public RecycledMaterial createRecycledMaterial(RecycledMaterialCreateRequest request) {
        Product product = productService.getProductById(ProductId.of(request.productId()));

        RecycledMaterial recycledMaterial = new RecycledMaterial(
                request.name(),
                request.quantityPercentage(),
                product
        );
        return recycledMaterialRepository.save(recycledMaterial);
    }

    @Override
    @Transactional
    public void deleteRecycledMaterial(RecycledMaterialId id) {
        if (!recycledMaterialRepository.existsById(id)) {
            throw new EntityNotFoundException("Recycled material not found with id: " + id.value());
        }
        recycledMaterialRepository.deleteById(id);
    }
}
