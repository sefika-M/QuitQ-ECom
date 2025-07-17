package com.quitq.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="category")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor 
@ToString
public class Category {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int catId;

	    private String catName;

	    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonIgnore
	    private List<Product> products;

}
