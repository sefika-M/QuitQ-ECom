package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.Product;
import com.quitq.model.Seller;
import com.quitq.repo.ProductRepository;
import com.quitq.repo.SellerRepository;
import com.quitq.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Product addProduct(Product product) {
        int userId = product.getSeller().getUser().getUserId();

        Seller seller = sellerRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));

        product.setSeller(seller);  // attach the managed entity

        return productRepository.save(product);
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> searchByCategoryName(String category) {
        return productRepository.searchByCategoryName(category);
    }

    @Override
    public List<Product> getProductsByName(String productName) {
        return productRepository.findByProductNameContainingIgnoreCase(productName);
        
    }

    @Override
    public Product getProductById(int productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + productId + " not found"));
    }

    @Override
    public String deleteProduct(int productId) {
        Product product = getProductById(productId); // throws exception if not found
        productRepository.delete(product);
        return "Product with ID " + productId + " deleted successfully";
    }
    
    @Override
    public List<Product> getProductsBySellerId(int sellerId) {
        return productRepository.findBySellerSellerId(sellerId);
    }

    @Override
    public Product updateProduct(int id, Product updatedProduct) {
        Product existing = getProductById(id); // throws exception if not found

        existing.setProductName(updatedProduct.getProductName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStock(updatedProduct.getStock());
        existing.setDescription(updatedProduct.getDescription());

        // Optionally update category only if fully sent
        if (updatedProduct.getCategory() != null) {
            existing.setCategory(updatedProduct.getCategory());
        }

        // Always re-fetch seller from DB by user ID (safer)
        int userId = updatedProduct.getSeller().getUser().getUserId();
        Seller seller = sellerRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));
        existing.setSeller(seller);

        return productRepository.save(existing);
    }

    
    @Override
    public Page<Product> getAllProductsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    @Override
    public List<Product> filterProducts(double minPrice, double maxPrice, String brand) {
        if (brand != null && !brand.isEmpty()) {
            return productRepository.findByPriceBetweenAndProductNameContainingIgnoreCase(minPrice, maxPrice, brand);
        } else {
            return productRepository.findByPriceBetween(minPrice, maxPrice);
        }
    }


}
