package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.Office;
import com.example.matt_new_ex.service.OfficeService;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class OfficeController {

	@Autowired
	private OfficeService officeService;
	
	
	@GetMapping("/offices")
	@ResponseBody
	public List<Office> getAllOffices() {
		return this.officeService.getAllOffices();
	}
	
	@GetMapping("/offices/{id}")
	public Office getOfficeById(@PathVariable(value="id") Long officeId) {
	return this.officeService.getOfficeById(officeId);
	}
	
	@PostMapping("/office")
	public Office createOffice(@RequestBody Office newOffice) {
	return this.officeService.createOffice(newOffice);
	}
	
	@PutMapping("/office/{id}")
	public Office updateOffice(@PathVariable(value = "id") Long officeId, @RequestBody Office officeDetails) {
	return this.officeService.updateOffice(officeId, officeDetails);
	}
	
	@PatchMapping("/office/{id}")
	@ResponseBody
	public Office updateOfficePatch(@PathVariable String id, @RequestBody Office office)
	{
	return this.officeService.updateOfficePatch(Long.parseLong(id), office);
	}
	
	@DeleteMapping("/office/{id}")
	public ResponseEntity<?> deleteOffice(@PathVariable(value = "id") Long officeId) {
	return this.officeService.deleteOffice(officeId);
	}

}
