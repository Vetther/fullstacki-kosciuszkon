package pl.owolny.backend.harmfulsubstances;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.Product;

@Entity
@Getter
public class HarmfulSubstance {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private HarmfulSubstanceId id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public HarmfulSubstance() {}

    public HarmfulSubstance(String name, Product product) {
        this.id = HarmfulSubstanceId.generate();
        this.name = name;
        this.product = product;
    }
}
