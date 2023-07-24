package com.example.matt_new_ex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.matt_new_ex.model.BlockList;
import com.example.matt_new_ex.model.DocumentType;



@Repository
public interface DocumentTypeRepository extends JpaRepository<DocumentType, String> {

}

