package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.Employee;
import com.example.matt_new_ex.repository.EmployeeRepository;
import com.example.matt_new_ex.service.EmployeeService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	EmployeeRepository employeeRepository ;
	
	@GetMapping("/employees")
	@ResponseBody
	public List<Employee> getAllEmployees(){
		return this.employeeService.getAllEmployees();
	}
	
	@GetMapping("/employee/{id}")
	public Employee getEmployeeById(@PathVariable(value="id") Long employeeId){
		return this.employeeService.getEmployeeById(employeeId);
	}
	
	@GetMapping("/blocklistCheck/{id}")
	public boolean verifyUserIsBlackListed(@PathVariable(value="id") Long employeeId) {
	return this.employeeService.verifyUserIsBlackListed(employeeId);
	}
	
	@GetMapping("/assignReviewer/{id}")
	public Long assignReviewer(@PathVariable(value="id") Long employeeId) {
	return this.employeeService.assignReviewer(employeeId);
	}
	
}
