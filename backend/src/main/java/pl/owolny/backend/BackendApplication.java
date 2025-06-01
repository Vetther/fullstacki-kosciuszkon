package pl.owolny.backend;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstanceService;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceDto;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductBaseInfo;
import pl.owolny.backend.product.ProductService;
import pl.owolny.backend.product.dto.ProductDto;
import pl.owolny.backend.product.vo.ProductCategory;
import pl.owolny.backend.recycledmaterial.RecycledMaterialService;
import pl.owolny.backend.recycledmaterial.dto.RecycledMaterialDto;
import pl.owolny.backend.shipment.ShipmentService;
import pl.owolny.backend.shipment.dto.ShipmentCreateRequest;
import pl.owolny.backend.shipment.dto.ShipmentStageCreateRequest;
import pl.owolny.backend.shipment.vo.ShipmentStatus;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().addSecurityItem(new SecurityRequirement().
                        addList("Bearer Authentication"))
                .info(new Info().title("My REST API")
                        .description("Some custom description of API.")
                        .version("1.0").contact(new Contact().name("Sallo Szrajbman")
                                .email( "www.baeldung.com").url("salloszraj@gmail.com"))
                        .license(new License().name("License of API")
                                .url("API license URL")));
    }

    @Bean
    public CommandLineRunner init(ProductService productService, HarmfulSubstanceService harmfulSubstanceService,
                                  RecycledMaterialService recycledMaterialService, ShipmentService shipmentService) {
        return args -> {
            Product product = productService.createProduct(new ProductDto(
                    "00000000-0000-0000-0000-000000000000",
                    "https://example.com/image.jpg",
                    "Example Product",
                    "Model X",
                    ProductCategory.BATTERY,
                    new ProductBaseInfo("manufacturer", "France", LocalDate.now(), LocalDate.now().plusYears(1), "1234567890"),
                    "5000mAh",
                    "3.7V",
                    "200g",
                    "10cm x 5cm x 2cm",
                    50
            ));
            harmfulSubstanceService.createHarmfulSubstance(
                    new HarmfulSubstanceDto(
                            "Ni",
                            product.getId().getValue().toString()
                    ));
            recycledMaterialService.createRecycledMaterial(
                    new RecycledMaterialDto(
                            "Material A",
                            4,
                            product.getId().getValue().toString()
                    )
            );
            shipmentService.createShipment(new ShipmentCreateRequest(
                    "France",
                    "FRA",
                    "Poland",
                    "POL",
                    ShipmentStatus.PREPARING,
                    product.getId().getValue().toString(),
                    List.of(
                            new ShipmentStageCreateRequest("Stage 1", "desc"),
                            new ShipmentStageCreateRequest("Stage 2", "desc"),
                            new ShipmentStageCreateRequest("Stage 3", "desc")
                    )
            ));
//            String hash = productService.generateProductHash(product);
//            System.out.println("Product created with ID: " + product.getId().getValue() + ", Hash: " + hash);
        };
    }

    @Bean
    RestClient restClient() {
        return RestClient.builder()
                .baseUrl("http://10.1.1.83:5000")
                .build();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
