package pl.owolny.backend.product;

import jakarta.persistence.*;
import lombok.Getter;
import pl.owolny.backend.product.vo.ProductCategory;
import pl.owolny.backend.product.vo.ProductId;

@Getter
@Entity
public class Product {

    @EmbeddedId
    @AttributeOverride(name = "value", column = @Column(name = "id"))
    private ProductId id;

    @Column(unique = true, nullable = false)
    private String dppId;

    private String imageUrl; // URL do zdjęcia produktu

    @Column(nullable = false)
    private String name;

    private String modelType;

    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;

    @Embedded
    private ProductBaseInfo baseInfo; // Informacje podstawowe o produkcie

    private String nominalCapacity; // np. "50 Ah"
    private String nominalVoltage;  // np. "20 V"
    private String mass;            // np. "51 g"
    private String dimensions;      // np. "1.5m x 1m x 1.5m"

    private int carbonFootprintValue; // np. 40

    public Product() {
    }

    public Product(String dppId, String name, String imageUrl, String modelType, ProductCategory productCategory,
                   ProductBaseInfo baseInfo, String nominalCapacity, String nominalVoltage, String mass,
                   String dimensions, int carbonFootprintValue) {
        this.id = ProductId.generate();
        this.dppId = dppId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.modelType = modelType;
        this.productCategory = productCategory;
        this.baseInfo = baseInfo;
        this.nominalCapacity = nominalCapacity;
        this.nominalVoltage = nominalVoltage;
        this.mass = mass;
        this.dimensions = dimensions;
        this.carbonFootprintValue = carbonFootprintValue;
    }
}
