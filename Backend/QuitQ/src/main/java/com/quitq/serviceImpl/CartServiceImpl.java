
package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.CartItem;
import com.quitq.model.Product;
import com.quitq.model.User;
import com.quitq.repo.CartItemRepository;
import com.quitq.repo.ProductRepository;
import com.quitq.repo.UserRepository;
import com.quitq.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Override
    public CartItem addToCart(int userId, int productId, int quantity) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStock() <= 0) {
            throw new ResourceNotFoundException("Product is out of stock");
        }
        if (quantity > product.getStock()) {
            throw new ResourceNotFoundException("Requested quantity exceeds available stock");
        }

        // Check if item already in cart
        List<CartItem> existingItems = cartRepo.findByUser(user);
        for (CartItem item : existingItems) {
            if (item.getProduct().getProductId() == productId) {
                int newQty = item.getQuantity() + quantity;
                if (newQty > product.getStock()) {
                    throw new ResourceNotFoundException("Total quantity exceeds available stock");
                }
                item.setQuantity(newQty);
                return cartRepo.save(item);
            }
        }

        // Else add new
        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        return cartRepo.save(cartItem);
    }


    @Override
    public List<CartItem> getCartItemsByUser(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return cartRepo.findByUser(user);
    }
    
    @Override
    public CartItem updateQuantity(int cartId, int quantity) {
        CartItem item = cartRepo.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (quantity <= 0) {
            cartRepo.delete(item);
            throw new ResourceNotFoundException("Item removed as quantity was 0");
        }
        if (quantity > item.getProduct().getStock()) {
            throw new ResourceNotFoundException("Quantity exceeds available stock");
        }
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }


    @Override
    public void removeItem(int cartId) {
        cartRepo.deleteById(cartId);
    }

    @Override
    public void clearCart(int userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        cartRepo.deleteByUser(user);
    }
}
