package com.example.matt_new_ex.service;

import java.util.HashMap;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Employee;
import com.example.matt_new_ex.model.Login;
import com.example.matt_new_ex.repository.EmployeeRepository;
import com.example.matt_new_ex.repository.LoginRepository;

@Service
public class LoginService extends BaseService{
	@Autowired
	LoginRepository loginRepository;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	public Employee validateLoginInformation(String username, String password){
		Login loginResponse = loginRepository.validateLoginInformation(username, password).orElseThrow(() -> new ResourceNotFoundException("Login","loginCode",username));
		Optional<Employee> employee = employeeRepository.findById(loginResponse.getEmployeeId());
		return employee.get();
	}
}
