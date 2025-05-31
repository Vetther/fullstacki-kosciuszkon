package pl.owolny.backend.harmfulsubstances;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceCreateRequest;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceUpdateRequest;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductService;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HarmfulSubstanceServiceImpl implements HarmfulSubstanceService {

    private final HarmfulSubstanceRepository harmfulSubstanceRepository;
    private final ProductService productService;

    @Override
    @Transactional(readOnly = true)
    public List<HarmfulSubstance> getAllHarmfulSubstances() {
        return harmfulSubstanceRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public HarmfulSubstance getHarmfulSubstanceById(HarmfulSubstanceId id) {
        return harmfulSubstanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Harmful substance not found with id: " + id.value()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<HarmfulSubstance> getHarmfulSubstancesByProductId(ProductId productId) {
        return harmfulSubstanceRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public HarmfulSubstance createHarmfulSubstance(HarmfulSubstanceCreateRequest request) {
        Product product = productService.getProductById(ProductId.of(request.productId().toString()));
        HarmfulSubstance harmfulSubstance = new HarmfulSubstance(request.name(), product);
        return harmfulSubstanceRepository.save(harmfulSubstance);
    }

    @Override
    @Transactional
    public void deleteHarmfulSubstance(HarmfulSubstanceId id) {
        if (!harmfulSubstanceRepository.existsById(id)) {
            throw new EntityNotFoundException("Harmful substance not found with id: " + id.value());
        }
        harmfulSubstanceRepository.deleteById(id);
    }
}
