package pl.owolny.backend.shipment;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.shipment.vo.ShipmentStageId;

import java.time.LocalDateTime;

@Entity
@Getter
public class ShipmentStage {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private ShipmentStageId id;

    private String name; // np. "Produkcja", "Transport", "Magazyn"
    private String description; // np. "Produkcja baterii", "Transport baterii z Francji do Polski"
    private LocalDateTime dateTime; // Data i czas etapu

    public ShipmentStage() {
    }

    public ShipmentStage(String name, String description, LocalDateTime dateTime) {
        this.id = ShipmentStageId.generate();
        this.name = name;
        this.description = description;
        this.dateTime = dateTime;
    }
}
