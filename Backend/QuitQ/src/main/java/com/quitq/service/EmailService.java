
package com.quitq.service;

import com.quitq.model.Order;
import com.quitq.model.User;

public interface EmailService {
    void sendOrderConfirmationEmail(User user, Order order);
}
