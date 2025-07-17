
package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.Seller;
import com.quitq.repo.SellerRepository;
import com.quitq.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepo;

    @Override
    public Seller saveSeller(Seller seller) {
        return sellerRepo.save(seller);
    }

    @Override
    public Seller getSellerByUserId(int userId) {
        return sellerRepo.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with userId: " + userId));
    }


    @Override
    public Seller getSellerById(int sellerId) {
        return sellerRepo.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with ID: " + sellerId));
    }
    
    @Override
    public List<Seller> getAllSellers() {
        return sellerRepo.findAll();
    }

    @Override
    public void deleteSeller(int id) {
        if (!sellerRepo.existsById(id)) {
            throw new ResourceNotFoundException("Seller not found");
        }
        sellerRepo.deleteById(id);
    }
}
