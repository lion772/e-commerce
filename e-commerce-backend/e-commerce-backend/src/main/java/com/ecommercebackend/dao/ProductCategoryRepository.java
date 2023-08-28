package com.ecommercebackend.dao;

import com.ecommercebackend.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// 'collectionResourceRel' is the name of the actual JSON entry
//path: '/product-category', instead of adding 's' in the end.
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {}
