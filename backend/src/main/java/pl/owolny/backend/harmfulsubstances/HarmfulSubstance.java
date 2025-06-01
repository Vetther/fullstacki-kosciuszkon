package pl.owolny.backend.harmfulsubstances;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

@Entity
@Getter
public class HarmfulSubstance {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private HarmfulSubstanceId id;

    private String name;

    private ProductId productId;

    public HarmfulSubstance() {}

    public HarmfulSubstance(String name, ProductId productId) {
        this.id = HarmfulSubstanceId.generate();
        this.name = name;
        this.productId = productId;
    }
}
