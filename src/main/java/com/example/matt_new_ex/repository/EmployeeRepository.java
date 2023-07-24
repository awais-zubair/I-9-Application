package com.example.matt_new_ex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.matt_new_ex.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	
	@Query("SELECT e FROM Employee e WHERE e.employeeRole.employeeRoleId = 2")
	public List<Employee> getReviewersByProvince() ;

}
