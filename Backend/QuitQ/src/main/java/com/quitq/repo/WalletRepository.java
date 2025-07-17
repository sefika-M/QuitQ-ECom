package com.quitq.repo;

import com.quitq.model.Wallet;
import com.quitq.model.User;
import com.quitq.model.WalSource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    List<Wallet> findByUserUserId(int userId);
    Wallet findByUserUserIdAndWalSource(int userId, WalSource walSource);
    Optional<Wallet> findByUser(User user);

}
