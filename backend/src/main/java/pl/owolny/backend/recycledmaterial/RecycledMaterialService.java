package pl.owolny.backend.recycledmaterial;

import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialCreateRequest;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

import java.util.List;

public interface RecycledMaterialService {
    List<RecycledMaterial> getAllRecycledMaterials();
    RecycledMaterial getRecycledMaterialById(RecycledMaterialId id);
    List<RecycledMaterial> getRecycledMaterialsByProductId(ProductId productId);
    RecycledMaterial createRecycledMaterial(RecycledMaterialCreateRequest request);
    void deleteRecycledMaterial(RecycledMaterialId id);
}
