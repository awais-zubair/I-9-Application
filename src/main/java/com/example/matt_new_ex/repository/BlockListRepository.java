package com.example.matt_new_ex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.matt_new_ex.model.BlockList;



@Repository
public interface BlockListRepository extends JpaRepository<BlockList, String> {

}

