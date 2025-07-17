
package com.quitq.repo;

import com.quitq.model.Product;
import com.quitq.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Integer> {
    Optional<Seller> findByUserUserId(int userId);  


}
