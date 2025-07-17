
package com.quitq.repo;

import com.quitq.model.CartItem;
import com.quitq.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByUser(User user);
    void deleteByUser(User user);
}
