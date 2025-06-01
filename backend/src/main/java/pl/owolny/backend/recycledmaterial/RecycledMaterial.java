package pl.owolny.backend.recycledmaterial;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

@Getter
@Entity
public class RecycledMaterial {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private RecycledMaterialId id;

    private String name;

    private int quantityPercentage;

    private ProductId productId;

    public RecycledMaterial() {
    }

    public RecycledMaterial(String name, int quantityPercentage, ProductId productId) {
        this.id = RecycledMaterialId.generate();
        this.name = name;
        this.quantityPercentage = quantityPercentage;
        this.productId = productId;
    }
}
