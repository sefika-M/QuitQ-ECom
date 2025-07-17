
package com.quitq.service;

import com.quitq.model.CartItem;
import java.util.List;

public interface CartService {
    CartItem addToCart(int userId, int productId, int quantity);
    List<CartItem> getCartItemsByUser(int userId);
    void removeItem(int cartId);
    void clearCart(int userId);
    CartItem updateQuantity(int cartId, int quantity);

}
