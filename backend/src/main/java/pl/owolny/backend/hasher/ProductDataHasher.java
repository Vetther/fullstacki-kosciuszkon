package pl.owolny.backend.hasher;

import pl.owolny.backend.product.Product;

import java.security.NoSuchAlgorithmException;

public interface ProductDataHasher {

    /**
     * Oblicza skrót SHA-256 dla danych produktu, włączając powiązane materiały z recyklingu,
     * informacje o przesyłce oraz szkodliwych substancjach.
     *
     * @param product                       Obiekt Product, dla którego ma być obliczony hash.
     * @return Skrót SHA-256 jako String (hex).
     * @throws NoSuchAlgorithmException   Jeśli algorytm SHA-256 nie jest dostępny.
     * @throws IllegalArgumentException   Jeśli produkt jest nullem.
     */
    String calculateProductDataHash(Product product) throws NoSuchAlgorithmException, IllegalArgumentException;

    /**
     * Generuje skonsolidowany ciąg danych dla produktu.
     *
     * @param product                       Obiekt Product.
     * @return Skonsolidowany ciąg danych.
     * @throws IllegalArgumentException   Jeśli produkt jest nullem.
     */
    String getConsolidatedProductDataString(Product product) throws IllegalArgumentException;
}