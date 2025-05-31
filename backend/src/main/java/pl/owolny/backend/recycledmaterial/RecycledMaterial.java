package pl.owolny.backend.recycledmaterial;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import pl.owolny.backend.recycledmaterial.vo.RecycledMaterialId;

@Entity
public class RecycledMaterial {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private RecycledMaterialId id;

    private String name;

    private int quantityPercentage;
}
