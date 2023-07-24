package com.example.matt_new_ex.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")

public class HelloController {

	@GetMapping("/hello")
	public String getGreeting() {
	return "Hello Spring World!";
	}
	
	@GetMapping("/bye")
	public String getGoodBye() {
	return "Bye Spring World!";
	}
}
