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
                    "https://cdn.discordapp.com/attachments/1378296266286567476/1378663596610818069/image_8.png?ex=683d6c07&is=683c1a87&hm=dd2827e7be3d1dd69bce1b2e2ae153390dc9a48b551e2d3ea45729a9ce1b99cd&",
                    "Bateria EV",
                    "Model 53A3MED",
                    ProductCategory.BATTERY,
                    new ProductBaseInfo("KiaMotors", "France", LocalDate.now(), LocalDate.now().plusYears(1), "Audi e-tron GT (2023)"),
                    "500mAh",
                    "20V",
                    "250kg",
                    "1m x 3m x 1m",
                    50
            ));
            harmfulSubstanceService.createHarmfulSubstance(
                    new HarmfulSubstanceDto(
                            "Ni",
                            product.getId().getValue().toString()
                    ));
            recycledMaterialService.createRecycledMaterial(
                    new RecycledMaterialDto(
                            "Lit",
                            4,
                            product.getId().getValue().toString()
                    )
            );
            recycledMaterialService.createRecycledMaterial(
                    new RecycledMaterialDto(
                            "Kobalt",
                            2,
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
                            new ShipmentStageCreateRequest("Wysyłka: Niemcy", "desc"),
                            new ShipmentStageCreateRequest("Odbiór w magazynie", "desc"),
                            new ShipmentStageCreateRequest("Wysyłka: Polska 3", "desc"),
                            new ShipmentStageCreateRequest("Odbiór w magazynie", "desc")
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
