package com.quitq.serviceImpl;

import com.quitq.model.Wallet;
import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.WalSource;
import com.quitq.repo.WalletRepository;
import com.quitq.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepo;

    @Override
    public Wallet addWallet(Wallet wallet) {
        return walletRepo.save(wallet);
    }

    @Override
    public List<Wallet> getWalletsByUserId(int userId) {
        return walletRepo.findByUserUserId(userId);
    }
    
    @Override
    public List<Wallet> getAllWallets() {
        return walletRepo.findAll();
    }

    @Override
    public ResponseEntity<Wallet> searchByWalletId(int walletId) {
        return ResponseEntity.of(walletRepo.findById(walletId));
    }
}
