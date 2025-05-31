package pl.owolny.backend.shipment;

import jakarta.persistence.*;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStatus;

@Entity
@Table(name = "shipment_stages")
public class Shipment {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private ShipmentId id;

    @Column(nullable = false)
    private String countryFrom; // np. "Francja", "Niemcy", "Polska"

    private String countryFromCode; // np. "FR", "DE", "PL" (do wyświetlania flagi)

    private String countryTo;

    private String countryToCode; // np. "FR", "DE", "PL" (do wyświetlania flagi)

    @Enumerated(EnumType.STRING)
    private ShipmentStatus type;
}
