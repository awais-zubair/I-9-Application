package com.example.matt_new_ex.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.I9Application;
import com.example.matt_new_ex.model.Office;
import com.example.matt_new_ex.repository.I9ApplicationRepository;
import com.example.matt_new_ex.service.EmployeeService;
import com.example.matt_new_ex.service.I9ApplicationService;
import com.querydsl.core.types.Predicate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class I9ApplicationController {
	@Autowired
	I9ApplicationService i9ApplicationService;

	@Autowired
	I9ApplicationRepository i9ApplicationRepository;

	@Autowired
	EmployeeService employeeService;

	@GetMapping("/getAllI9Applications")
	public Iterable<I9Application> getI9Applicaitons(@QuerydslPredicate(root = I9Application.class) Predicate predicate,
			Pageable pageable) {
		return this.i9ApplicationService.getAllI9Applications(predicate, pageable);
	}

	@GetMapping("/getI9ApplicationById/{id}")
	public I9Application getI9ApplicationById(@PathVariable(value = "id") Long i9ApplicationId) {
		System.out.println("Made it!");
		return this.i9ApplicationService.getI9ApplicationById(i9ApplicationId);
	}

	@PostMapping("/saveSectionOneI9Application")
	public I9Application saveSectionOneI9Application(@RequestBody I9Application i9Application) {
		if (this.employeeService.verifyUserIsBlackListed(i9Application.getEmployee().getEmployeeId())) {
			i9Application.getStatus().setStatusId(5L);
		
		} else {
			i9Application.getStatus().setStatusId(2L);
		}
		Long reviewerId = this.employeeService.assignReviewer(i9Application.getEmployee().getEmployeeId());
		if (reviewerId != null) {
			i9Application.setReviewerId(reviewerId);
		}
		return this.i9ApplicationService.saveSectionOneI9Application(i9Application);

	}

	@PutMapping("/I9Application/{id}")
	public I9Application updateI9Application(@PathVariable(value = "id") Long i9ApplicationId,
			@RequestBody I9Application i9ApplicationDetails) {
		i9ApplicationDetails.setI9ApplicationId(i9ApplicationId);
		return this.i9ApplicationService.updateI9Application(i9ApplicationId, i9ApplicationDetails);
	}

	@PatchMapping("/I9Application/{id}")
	@ResponseBody
	@CrossOrigin(origins = "http://localhost:3000")
	public I9Application updateI9ApplicationPatch(@PathVariable(value = "id") Long i9ApplicationId,
			@RequestBody I9Application i9ApplicationDetails) {
		return this.i9ApplicationService.updateI9ApplicationPatch(i9ApplicationId, i9ApplicationDetails);
	}
	
	@GetMapping("/getI9StatusTotalsByType/{id}")
	public Long getI9StatusTotalsByType(@PathVariable(value="id") Long statusId) {
		return this.i9ApplicationService.getI9StatusTotalsByType(statusId);
	}
}
