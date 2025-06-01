package pl.owolny.backend.shipment;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
public class ShipmentStage {

    private String name; // np. "Produkcja", "Transport", "Magazyn"
    private String description; // np. "Produkcja baterii", "Transport baterii z Francji do Polski"

    public ShipmentStage() {
    }

    public ShipmentStage(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
