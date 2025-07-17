package com.quitq.service;

public interface PaymentService {
    void rechargeWallet(int userId, double amount);
    double getWalletBalance(int userId);
}
