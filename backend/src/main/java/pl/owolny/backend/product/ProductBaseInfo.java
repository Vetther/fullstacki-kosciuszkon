package pl.owolny.backend.product;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Embeddable
public class ProductBaseInfo {

    private String manufacturer; // np. "Mercedes", "BMW", "Volvo"
    private String productionCountry; // np. "Niemcy", "Szwecja", "Polska"
    private LocalDate productionDate; // Data produkcji
    private LocalDate installationDate; // Data instalacji
    private String vehicleInfo; // np. "Volvo XC90 T8"

    public ProductBaseInfo() {
    }

    public ProductBaseInfo(String manufacturer, String productionCountry, LocalDate productionDate,
                          LocalDate installationDate, String vehicleInfo) {
        this.manufacturer = manufacturer;
        this.productionCountry = productionCountry;
        this.productionDate = productionDate;
        this.installationDate = installationDate;
        this.vehicleInfo = vehicleInfo;
    }
}