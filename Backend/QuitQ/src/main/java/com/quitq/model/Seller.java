package com.quitq.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sellers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sellerId;

    @Column(nullable = false)
    private String companyName;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    
    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Product> products;

}
