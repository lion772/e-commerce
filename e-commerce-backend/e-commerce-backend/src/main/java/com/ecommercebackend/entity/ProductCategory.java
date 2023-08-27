package com.ecommercebackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "product_category")
//@Data -- known bug, wherever you make use of relationships like one to many and many to one
@Getter
@Setter
public class ProductCategory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "category_name")
  private String categoryName;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") // The value CascadeType.ALL indicates that any operation performed on the parent entity (e.g., insert, update, delete) should be cascaded to the related entities as well.
  private Set<Product> products;
}
