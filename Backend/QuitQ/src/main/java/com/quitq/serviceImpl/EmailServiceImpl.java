package com.quitq.serviceImpl;

import com.quitq.model.Order;
import com.quitq.model.User;
import com.quitq.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOrderConfirmationEmail(User user, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Order Confirmation - QuitQ");
        message.setText("Hi " + user.getName() + ",\n\nYour order #" + order.getOrderId() +
            " has been placed successfully.\n\nTotal: ₹" + order.getTotalAmount() +
            "\nShipping to: " + order.getShippingAddress() + "\n\nThank you for shopping with QuitQ!");
        mailSender.send(message);
    }
}
