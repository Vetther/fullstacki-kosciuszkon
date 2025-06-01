package pl.owolny.backend.product;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstance;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstanceService;
import pl.owolny.backend.product.dto.ProductCreateRequest;
import pl.owolny.backend.product.vo.ProductId;
import pl.owolny.backend.recycledmaterial.RecycledMaterial;
import pl.owolny.backend.recycledmaterial.RecycledMaterialService;
import pl.owolny.backend.shipment.Shipment;
import pl.owolny.backend.shipment.ShipmentService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    @Override
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Product getProductById(ProductId id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id.value()));
    }

    @Override
    @Transactional
    public Product createProduct(ProductCreateRequest request) {

        ProductBaseInfo baseInfo = new ProductBaseInfo(request.manufacturer(), request.productionCountry(),
                request.productionDate(), request.installationDate(), request.vehicleInfo());

        Product product = new Product(
                request.dppId(),
                request.name(),
                request.imageUrl(),
                request.modelType(),
                request.productCategory(),
                baseInfo,
                request.nominalCapacity(),
                request.nominalVoltage(),
                request.mass(),
                request.dimensions(),
                request.carbonFootprintValue()
        );

        // First save the product to get an ID
        Product savedProduct = productRepository.save(product);

        return savedProduct;
    }

    @Override
    @Transactional
    public void deleteProduct(ProductId id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id.value());
        }
        productRepository.deleteById(id);
    }
}
