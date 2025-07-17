package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.User;
import com.quitq.model.Wallet;
import com.quitq.repo.UserRepository;
import com.quitq.repo.WalletRepository;
import com.quitq.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private WalletRepository walletRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public void rechargeWallet(int userId, double amount) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Wallet wallet = walletRepo.findByUser(user)
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setUser(user);
                    newWallet.setWalBalance(0.0);
                    return newWallet;
                });

        wallet.setWalBalance(wallet.getWalBalance() + amount);
        walletRepo.save(wallet);
    }

    @Override
    public double getWalletBalance(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Wallet wallet = walletRepo.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

        return wallet.getWalBalance();
    }
}
