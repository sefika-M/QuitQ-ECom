package com.quitq.repo;

import com.quitq.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByProductNameContainingIgnoreCase(String productName);
    @Query("SELECT p FROM Product p WHERE LOWER(p.category.catName) LIKE LOWER(CONCAT('%', :catName, '%'))")
    List<Product> searchByCategoryName(@Param("catName") String catName);
    List<Product> findBySellerSellerId(int sellerId);
    List<Product> findBySellerUserUserId(int userId); // product.seller.user.userId
    Page<Product> findAll(Pageable pageable);
    List<Product> findByPriceBetween(double min, double max);
    List<Product> findByPriceBetweenAndProductNameContainingIgnoreCase(double min, double max, String brand);
    void deleteAllBySeller_SellerId(int sellerId);


}
