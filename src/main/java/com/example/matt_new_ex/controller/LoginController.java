package com.example.matt_new_ex.controller;

import java.util.HashMap;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.Employee;
import com.example.matt_new_ex.model.Login;
import com.example.matt_new_ex.service.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	@Autowired
	LoginService loginService;
	
	@PostMapping("employees/login")
	public Employee validateLoginInformation(@RequestBody Login loginDetails) {
		return this.loginService.validateLoginInformation(loginDetails.getLoginCode(), loginDetails.getPassword());
	}
}