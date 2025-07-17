package com.quitq.controller;

import com.quitq.service.PaymentService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

 @Autowired
 private PaymentService paymentService;

 @PutMapping("/recharge")
 public ResponseEntity<Map<String, String>> rechargeWallet(@RequestParam int userId, @RequestParam double amount) {
	    paymentService.rechargeWallet(userId, amount);
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "Wallet recharged successfully");
	    return ResponseEntity.ok(response);
	}

 @GetMapping("/walletBalance/{userId}")
 public ResponseEntity<Double> getWalletBalance(@PathVariable int userId) {
     try {
         double balance = paymentService.getWalletBalance(userId);
         return ResponseEntity.ok(balance);
     } catch (Exception e) {
         return ResponseEntity.status(500).body(0.0);
     }
 }

}
