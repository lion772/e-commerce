package com.ecommercebackend.dao;

import com.ecommercebackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Set;
@CrossOrigin("http://localhost:4200") //@CrossOrigin (any website)
public interface ProductRepository extends JpaRepository<Product, Long> {
  // Page -> sublist of a list of obj. It has information such as: totalElements,totalPages, currentPosition, etc.
  // Pageable -> represents pagination information. It has information such as: pageNumber, pageSize, previous, next, etc.
  Page<Product> findByCategoryId(@Param("id") Long id , Pageable pageable);
}
