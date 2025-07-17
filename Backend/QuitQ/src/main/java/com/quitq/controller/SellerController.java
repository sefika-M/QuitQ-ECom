
package com.quitq.controller;

import com.quitq.model.Seller;
import com.quitq.repo.SellerRepository;
import com.quitq.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @Autowired
    private SellerRepository sellerRepository;

    

    @GetMapping("/getById/{id}")
    public ResponseEntity<Seller> getById(@PathVariable int id) {
        Seller seller = sellerService.getSellerById(id);
        return ResponseEntity.ok(seller);
    }
    
    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<Seller> getByUserId(@PathVariable int userId) {
        Seller seller = sellerService.getSellerByUserId(userId);
        if (seller != null) {
            return ResponseEntity.ok(seller);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerRepository.findAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSeller(@PathVariable int id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.ok("Seller deleted successfully");
    }
}
