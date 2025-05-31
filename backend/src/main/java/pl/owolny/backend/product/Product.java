package pl.owolny.backend.product;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.product.vo.ProductCategory;

import java.time.LocalDate;

@Getter
@Entity
public class Product {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private ProductId id;

    @Column(unique = true, nullable = false)
    private String dppId;

    @Column(nullable = false)
    private String name;

    private String modelType;

    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;

    private String manufacturer;
    private LocalDate productionDate;
    private String productionCountry;
    private LocalDate installationDate;
    private String vehicleInfo;

    // Informacje ogólne
    private String nominalCapacity; // np. "50 Ah"
    private String nominalVoltage;  // np. "20 V"
    private String mass;            // np. "51 g"
    private String dimensions;      // np. "1.5m x 1m x 1.5m"

    // Ślad węglowy
    private int carbonFootprintValue; // np. 40

}
