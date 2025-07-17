package com.quitq.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="wallet")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor 
@ToString

public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int walletId;

    private double walBalance;
    
    @Enumerated(EnumType.STRING)
    private WalSource walSource;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
