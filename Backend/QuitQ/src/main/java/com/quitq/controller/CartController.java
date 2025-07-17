package com.quitq.controller;

import com.quitq.model.CartItem;
import com.quitq.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestParam int userId,
                                              @RequestParam int productId,
                                              @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCartByUser(@PathVariable int userId) {
        return ResponseEntity.ok(cartService.getCartItemsByUser(userId));
    }
    
    @PutMapping("/updateQuantity")
    public ResponseEntity<CartItem> updateQuantity(@RequestParam int cartId,
                                                   @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(cartId, quantity));
    }


    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<Void> removeItem(@PathVariable int cartId) {
        cartService.removeItem(cartId);
        return ResponseEntity.noContent().build(); // 204 No Content
    }


    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable int userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared.");
    }
}
