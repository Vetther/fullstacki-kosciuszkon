package pl.owolny.backend.recycledmaterial;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

@Getter
@Entity
public class RecycledMaterial {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private RecycledMaterialId id;

    private String name;

    private int quantityPercentage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public RecycledMaterial() {
    }

    public RecycledMaterial(String name, int quantityPercentage, Product product) {
        this.id = RecycledMaterialId.generate();
        this.name = name;
        this.quantityPercentage = quantityPercentage;
        this.product = product;
    }
}
