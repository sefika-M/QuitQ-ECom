package com.quitq.service;

import com.quitq.model.Product;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ProductService {
    Product addProduct(Product product);
    List<Product> getAllProducts();
    Page<Product> getAllProductsPaginated(int page, int size);
    List<Product> searchByCategoryName(String categoryName);
    List<Product> getProductsByName(String productName);
    Product getProductById(int productId);
    String deleteProduct(int productId);
    List<Product> getProductsBySellerId(int sellerId);
    Product updateProduct(int id, Product product);
    List<Product> filterProducts(double minPrice, double maxPrice, String brand);


}
