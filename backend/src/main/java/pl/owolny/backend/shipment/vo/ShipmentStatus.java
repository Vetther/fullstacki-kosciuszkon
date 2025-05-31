package pl.owolny.backend.shipment.vo;

public enum ShipmentStatus {

    PREPARING,
    READY_FOR_PICKUP,
    IN_TRANSIT,
    DELIVERED,
    RETURNED,
    CANCELLED;

    public static ShipmentStatus fromString(String value) {
        return ShipmentStatus.valueOf(value.toUpperCase());
    }
}
