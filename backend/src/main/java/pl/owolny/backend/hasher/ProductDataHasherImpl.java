package pl.owolny.backend.hasher;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstance;
import pl.owolny.backend.harmfulsubstances.HarmfulSubstanceService;
import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductBaseInfo;
import pl.owolny.backend.recycledmaterial.RecycledMaterial;
import pl.owolny.backend.recycledmaterial.RecycledMaterialService;
import pl.owolny.backend.shipment.Shipment;
import pl.owolny.backend.shipment.ShipmentService;
import pl.owolny.backend.shipment.ShipmentStage; // Upewnij się, że importujesz poprawny ShipmentStage

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductDataHasherImpl implements ProductDataHasher {

    private final RecycledMaterialService recycledMaterialService;
    private final HarmfulSubstanceService harmfulSubstanceService;
    private final ShipmentService shipmentService;

    private static final String NULL_REPRESENTATION = "NULL_VALUE";
    private static final String SEPARATOR = "||";
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    @Override
    public String calculateProductDataHash(Product product)
            throws NoSuchAlgorithmException, IllegalArgumentException {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null for hashing.");
        }
        String dataString = getConsolidatedProductDataString(product);
        System.out.println(dataString);
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(dataString.getBytes(StandardCharsets.UTF_8));
        return bytesToHex(encodedhash);
    }

    @Override
    public String getConsolidatedProductDataString(Product product)
            throws IllegalArgumentException {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null for data string generation.");
        }

        List<RecycledMaterial> associatedRecycledMaterials = this.recycledMaterialService.findByProductId(product.getId());
        Optional<Shipment> associatedShipmentOpt = this.shipmentService.getShipmentByProductId(product.getId());
        List<HarmfulSubstance> associatedHarmfulSubstances = this.harmfulSubstanceService.findByProductId(product.getId());

        StringBuilder sb = new StringBuilder();

        // === Dane Produktu (jak wcześniej) ===
        sb.append(product.getId() != null && product.getId().getValue() != null ? product.getId().getValue().toString() : NULL_REPRESENTATION).append(SEPARATOR);
//        sb.append(product.getImageUrl() != null ? product.getImageUrl() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getName() != null ? product.getName() : NULL_REPRESENTATION).append(SEPARATOR);
        // ... reszta pól Product i ProductBaseInfo (jak w poprzedniej wersji) ...
        sb.append(product.getModelType() != null ? product.getModelType() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getProductCategory() != null ? product.getProductCategory().name() : NULL_REPRESENTATION).append(SEPARATOR);

        ProductBaseInfo baseInfo = product.getBaseInfo();
        if (baseInfo != null) {
            sb.append(baseInfo.getManufacturer() != null ? baseInfo.getManufacturer() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(baseInfo.getProductionCountry() != null ? baseInfo.getProductionCountry() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(baseInfo.getProductionDate() != null ? baseInfo.getProductionDate().format(DATE_FORMATTER) : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(baseInfo.getInstallationDate() != null ? baseInfo.getInstallationDate().format(DATE_FORMATTER) : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(baseInfo.getVehicleInfo() != null ? baseInfo.getVehicleInfo() : NULL_REPRESENTATION).append(SEPARATOR);
        } else {
            for (int i = 0; i < 5; i++) { sb.append(NULL_REPRESENTATION).append(SEPARATOR); }
        }
        sb.append(product.getNominalCapacity() != null ? product.getNominalCapacity() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getNominalVoltage() != null ? product.getNominalVoltage() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getMass() != null ? product.getMass() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getDimensions() != null ? product.getDimensions() : NULL_REPRESENTATION).append(SEPARATOR);
        sb.append(product.getCarbonFootprintValue()).append(SEPARATOR);


        // === Dane Materiałów z Recyklingu (jak wcześniej) ===
        if (associatedRecycledMaterials != null && !associatedRecycledMaterials.isEmpty()) {
            List<RecycledMaterial> sortedMaterials = associatedRecycledMaterials.stream()
                    .sorted(Comparator.comparing(m -> m.getName() != null ? m.getName() : "", Comparator.nullsLast(String::compareTo)))
                    .toList();
            for (RecycledMaterial material : sortedMaterials) {
                sb.append("RECYCLED_MATERIAL_START").append(SEPARATOR);
//                sb.append(material.getId() != null && material.getId().getValue() != null ? material.getId().getValue().toString() : NULL_REPRESENTATION).append(SEPARATOR);
                sb.append(material.getName() != null ? material.getName() : NULL_REPRESENTATION).append(SEPARATOR);
                sb.append(material.getQuantityPercentage()).append(SEPARATOR);
                sb.append("RECYCLED_MATERIAL_END").append(SEPARATOR);
            }
        } else {
            sb.append("NO_RECYCLED_MATERIALS").append(SEPARATOR);
        }

        // === Dane Przesyłki (Shipment i ShipmentStage) ===
        if (associatedShipmentOpt.isPresent()) {
            Shipment associatedShipment = associatedShipmentOpt.get();
            sb.append("SHIPMENT_START").append(SEPARATOR);
//            sb.append(associatedShipment.getId() != null && associatedShipment.getId().getValue() != null ? associatedShipment.getId().getValue().toString() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(associatedShipment.getCountryFrom() != null ? associatedShipment.getCountryFrom() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(associatedShipment.getCountryFromCode() != null ? associatedShipment.getCountryFromCode() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(associatedShipment.getCountryTo() != null ? associatedShipment.getCountryTo() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(associatedShipment.getCountryToCode() != null ? associatedShipment.getCountryToCode() : NULL_REPRESENTATION).append(SEPARATOR);
            sb.append(associatedShipment.getType() != null ? associatedShipment.getType().name() : NULL_REPRESENTATION).append(SEPARATOR);

            List<ShipmentStage> stages = associatedShipment.getShipmentStages();
            if (stages != null && !stages.isEmpty()) {
                // Przykład sortowania po nazwie etapu, jeśli kolejność nie jest gwarantowana
                List<ShipmentStage> sortedStages = stages.stream()
                        .sorted(Comparator.comparing(s -> s.getName() != null ? s.getName() : "", Comparator.nullsLast(String::compareTo)))
                        .collect(Collectors.toList());

                for (ShipmentStage stage : sortedStages) { // Użyj posortowanej listy
                    sb.append("SHIPMENT_STAGE_START").append(SEPARATOR);
                    sb.append(stage.getName() != null ? stage.getName() : NULL_REPRESENTATION).append(SEPARATOR);
                    sb.append(stage.getDescription() != null ? stage.getDescription() : NULL_REPRESENTATION).append(SEPARATOR);
                    sb.append("SHIPMENT_STAGE_END").append(SEPARATOR);
                }
            } else {
                sb.append("NO_SHIPMENT_STAGES").append(SEPARATOR);
            }
            sb.append("SHIPMENT_END").append(SEPARATOR);
        } else {
            sb.append("NO_SHIPMENT_DATA").append(SEPARATOR);
        }

        // === Dane Szkodliwych Substancji ===
        if (associatedHarmfulSubstances != null && !associatedHarmfulSubstances.isEmpty()) {
            // Sortowanie dla spójności hasha
            List<HarmfulSubstance> sortedSubstances = associatedHarmfulSubstances.stream()
                    .sorted(Comparator.comparing(s -> s.getName() != null ? s.getName() : "", Comparator.nullsLast(String::compareTo)))
                    .collect(Collectors.toList());
            for (HarmfulSubstance substance : sortedSubstances) {
                sb.append("HARMFUL_SUBSTANCE_START").append(SEPARATOR);
//                sb.append(substance.getId() != null && substance.getId().getValue() != null ? substance.getId().getValue().toString() : NULL_REPRESENTATION).append(SEPARATOR);
                sb.append(substance.getName() != null ? substance.getName() : NULL_REPRESENTATION).append(SEPARATOR);
                sb.append("HARMFUL_SUBSTANCE_END").append(SEPARATOR);
            }
        } else {
            sb.append("NO_HARMFUL_SUBSTANCES").append(SEPARATOR);
        }


        // Usuń ostatni separator
        if (sb.length() > SEPARATOR.length()) {
            sb.setLength(sb.length() - SEPARATOR.length());
        }

        return sb.toString();
    }

    private String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}