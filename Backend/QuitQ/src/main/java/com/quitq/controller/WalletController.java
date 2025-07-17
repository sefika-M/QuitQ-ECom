package com.quitq.controller;

import com.quitq.model.Wallet;
import com.quitq.model.WalSource;
import com.quitq.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

  
    @PostMapping("/addWallet")
    public ResponseEntity<Wallet> addWallet(@RequestBody Wallet wallet) {
        Wallet savedWallet = walletService.addWallet(wallet);
        return new ResponseEntity<>(savedWallet, HttpStatus.CREATED); // 201 Created
    }

    @GetMapping("/getWalletsByUserId/{userId}")
    public ResponseEntity<List<Wallet>> getWalletsByUserId(@PathVariable int userId) {
        List<Wallet> wallets = walletService.getWalletsByUserId(userId);
        if (wallets.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(wallets); // 200 OK
    }

    @GetMapping("/getAllWallets")
    public ResponseEntity<List<Wallet>> getAllWallets() {
        List<Wallet> wallets = walletService.getAllWallets();
        if (wallets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(wallets);
    }

    @GetMapping("/getWalletBywalletId/{walletId}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable int walletId) {
        ResponseEntity<Wallet> result = walletService.searchByWalletId(walletId);
        return result; // walletService internally handles status or throws
    }
}