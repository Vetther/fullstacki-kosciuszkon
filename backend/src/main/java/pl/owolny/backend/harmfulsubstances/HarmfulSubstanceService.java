package pl.owolny.backend.harmfulsubstances;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceDto;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

@Service
@AllArgsConstructor
public class HarmfulSubstanceService {

    private final HarmfulSubstanceRepository harmfulSubstanceRepository;

    public HarmfulSubstance findById(HarmfulSubstanceId harmfulSubstanceId) {
        return harmfulSubstanceRepository.findById(harmfulSubstanceId)
                .orElseThrow(() -> new EntityNotFoundException("Harmful substance not found with id: " + harmfulSubstanceId));
    }

    public List<HarmfulSubstance> findAll() {
        return harmfulSubstanceRepository.findAll();
    }

    public List<HarmfulSubstance> findByProductId(ProductId productId) {
        return harmfulSubstanceRepository.findByProductId(productId);
    }

    public HarmfulSubstance createHarmfulSubstance(HarmfulSubstanceDto harmfulSubstanceDto) {
        HarmfulSubstance harmfulSubstance = new HarmfulSubstance(
                harmfulSubstanceDto.name(),
                ProductId.of(harmfulSubstanceDto.productId())
        );

        return harmfulSubstanceRepository.save(harmfulSubstance);
    }
}
