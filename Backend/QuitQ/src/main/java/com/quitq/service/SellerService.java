
package com.quitq.service;

import com.quitq.model.Seller;

import java.util.List;
import java.util.Optional;

public interface SellerService {
    Seller saveSeller(Seller seller);
    Seller getSellerByUserId(int userId);
    Seller getSellerById(int sellerId);
    void deleteSeller(int id);
    List<Seller> getAllSellers();

}
