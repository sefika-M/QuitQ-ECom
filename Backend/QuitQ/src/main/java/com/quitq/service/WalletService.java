package com.quitq.service;

import com.quitq.model.Wallet;
import com.quitq.model.WalSource;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WalletService {
    Wallet addWallet(Wallet wallet);
    List<Wallet> getWalletsByUserId(int userId);
    ResponseEntity<Wallet> searchByWalletId(int walletId);
    List<Wallet> getAllWallets();

}
