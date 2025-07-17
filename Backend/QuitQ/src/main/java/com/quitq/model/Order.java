
package com.quitq.model;
import com.quitq.model.PaymentStatus;
import com.quitq.model.OrderStatus;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders") 
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.PLACED;

    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    private LocalDateTime orderDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems; 
    
    @Enumerated(EnumType.STRING)
    @Column
    private PaymentMode paymentMode;
}
