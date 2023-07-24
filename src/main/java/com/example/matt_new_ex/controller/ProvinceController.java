package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.Province;
import com.example.matt_new_ex.service.ProvinceService;

@RestController
public class ProvinceController {
	

	@Autowired
	private ProvinceService provinceService;
	
	
	@GetMapping("/provinces")
	@ResponseBody
	public List<Province> getAllProvinces() {
		return this.provinceService.getAllProvinces();
	}
	
	@GetMapping("/provinces/{code}")
	public Province getProvinceById(@PathVariable(value="code") String provinceCode) {
	return this.provinceService.getProvinceById(provinceCode);
	}

}
