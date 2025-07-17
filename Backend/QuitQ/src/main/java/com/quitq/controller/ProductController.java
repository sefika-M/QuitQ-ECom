package com.quitq.controller;

import com.quitq.model.Product;
import com.quitq.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@Valid @RequestBody Product product) {
        Product createdProduct = productService.addProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<Page<Product>> getAllProductsPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

        Page<Product> products = productService.getAllProductsPaginated(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(
        @RequestParam double minPrice,
        @RequestParam double maxPrice,
        @RequestParam(required = false) String brand) {

        List<Product> filtered = productService.filterProducts(minPrice, maxPrice, brand);
        return ResponseEntity.ok(filtered);
    }

    @GetMapping("/searchByCategoryName/{category}")
    public ResponseEntity<List<Product>> searchByCategoryName(@PathVariable String category) {
        List<Product> products = productService.searchByCategoryName(category);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProductsByName/{productName}")
    public ResponseEntity<List<Product>> getProductsByName(@PathVariable String productName) {
        List<Product> products = productService.getProductsByName(productName);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProductById/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/getProductsBySellerId/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySellerId(@PathVariable int sellerId) {
        List<Product> products = productService.getProductsBySellerId(sellerId);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(products);
    }
    
    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        String result = productService.deleteProduct(id);
        if (result.equalsIgnoreCase("Product deleted successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }
}