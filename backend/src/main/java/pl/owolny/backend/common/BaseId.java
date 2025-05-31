package pl.owolny.backend.common;

import java.io.Serializable;

public interface BaseId<T> extends Serializable {

    T getValue();

    default boolean sameValueAs(BaseId<T> other) {
        return other != null && this.getValue().equals(other.getValue());
    }
}