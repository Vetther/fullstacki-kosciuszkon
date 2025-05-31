package pl.owolny.backend.harmfulsubstances;

import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceCreateRequest;
import pl.owolny.backend.harmfulsubstances.dto.HarmfulSubstanceUpdateRequest;
import pl.owolny.backend.harmfulsubstances.vo.HarmfulSubstanceId;
import pl.owolny.backend.product.vo.ProductId;

import java.util.List;

public interface HarmfulSubstanceService {
    List<HarmfulSubstance> getAllHarmfulSubstances();
    HarmfulSubstance getHarmfulSubstanceById(HarmfulSubstanceId id);
    List<HarmfulSubstance> getHarmfulSubstancesByProductId(ProductId productId);
    HarmfulSubstance createHarmfulSubstance(HarmfulSubstanceCreateRequest request);
    void deleteHarmfulSubstance(HarmfulSubstanceId id);
}
