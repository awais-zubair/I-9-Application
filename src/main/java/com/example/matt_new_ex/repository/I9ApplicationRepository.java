package com.example.matt_new_ex.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.matt_new_ex.model.I9Application;

@Repository
public interface I9ApplicationRepository extends JpaRepository<I9Application, Long>,QuerydslPredicateExecutor<I9Application> {
	
	@Query(value="SELECT COUNT(*) FROM I_9_APPLICATION WHERE status_id=:status_id", nativeQuery=true)
	public Long getI9StatusTotalsByType(@Param("status_id") Long status_id);
}
