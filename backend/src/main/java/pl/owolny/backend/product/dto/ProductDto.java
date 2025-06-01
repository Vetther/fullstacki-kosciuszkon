package pl.owolny.backend.product.dto;

import pl.owolny.backend.product.Product;
import pl.owolny.backend.product.ProductBaseInfo;
import pl.owolny.backend.product.vo.ProductCategory;

public record ProductDto(
         String id,
         String imageUrl,
         String name,
         String modelType,
         ProductCategory productCategory,
         ProductBaseInfo baseInfo,
         String nominalCapacity,
         String nominalVoltage,
         String mass,  // np. "51 g"
         String dimensions,// np. "1.5m x 1m x 1.5m"
         int carbonFootprintValue
){
    public static ProductDto fromProduct(Product product) {
        return new ProductDto(
                product.getId().getValue().toString(),
                product.getImageUrl(),
                product.getName(),
                product.getModelType(),
                product.getProductCategory(),
                product.getBaseInfo(),
                product.getNominalCapacity(),
                product.getNominalVoltage(),
                product.getMass(),
                product.getDimensions(),
                product.getCarbonFootprintValue()
        );
    }
}
