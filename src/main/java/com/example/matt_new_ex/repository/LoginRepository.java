package com.example.matt_new_ex.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.matt_new_ex.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long>{

	@Query(value="select * from login where login_code = :login_code and password = :password",
			nativeQuery=true)
	public Optional<Login> validateLoginInformation(@Param("login_code") String login_code, @Param("password") String password);
}