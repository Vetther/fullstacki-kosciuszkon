package pl.owolny.backend.shipment;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.shipment.vo.ShipmentId;
import pl.owolny.backend.shipment.vo.ShipmentStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
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

    @OneToMany
    private List<ShipmentStage> stages = new ArrayList<>(); // Lista etapów przesyłki

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Shipment(String countryFrom, String countryFromCode, String countryTo, String countryToCode, ShipmentStatus type, Product product) {
        this.id = ShipmentId.generate();
        this.countryFrom = countryFrom;
        this.countryFromCode = countryFromCode;
        this.countryTo = countryTo;
        this.countryToCode = countryToCode;
        this.type = type;
        this.product = product;
    }

    public Shipment() {
    }

    public void addStage(ShipmentStage stage) {
        stages.add(stage);
    }

}
