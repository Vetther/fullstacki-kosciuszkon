package pl.owolny.backend.harmfulsubstances;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;

@Entity
@Getter
public class HarmfulSubstance {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private HarmfulSubstanceId id;

    private String name;

    public HarmfulSubstance() {}

    public HarmfulSubstance(String name) {
        this.id = HarmfulSubstanceId.generate();
        this.name = name;
    }
}
