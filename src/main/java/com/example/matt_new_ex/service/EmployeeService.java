package com.example.matt_new_ex.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.BlockList;
import com.example.matt_new_ex.model.Employee;
import com.example.matt_new_ex.repository.EmployeeRepository;


@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	private BlockListService blockListService;
	private static Map<String, List<Long>> reviewerMap = new HashMap<>();
	private static Map<String, Integer> regionIndexMap = new HashMap<>();

	private static final String DEFAULT_REVIEWER_GROUP = "FL";
	
	public List<Employee> getAllEmployees(){
		return this.employeeRepository.findAll();
	}
	
	public Employee getEmployeeById(Long employeeId) {
		return this.employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee","Id",employeeId));
	}
	

	public boolean verifyUserIsBlackListed(Long employeeId) {

		List<BlockList> blockList = (List<BlockList>) this.blockListService.getAllBlockList();
		Employee employee = this.getEmployeeById(employeeId);
		for (BlockList bl : blockList) {
			int count = 0;
			if (employee.getLastName().equals(bl.getLastName())) {
				count++;
			}
			if (employee.getFirstName().equals(bl.getFirstName())) {
				count++;
			}
			if (employee.getSsn().equals(bl.getSsn())) {
				count++;
			}
			if (employee.getStreet().equals(bl.getStreet())) {
				count++;
			}
			if (employee.getCity().equals(bl.getCity())) {
				count++;
			}
			if (employee.getProvinceCode().equals(bl.getProvince())) {
				count++;
			}
			if (employee.getPhoneNumber().equals(bl.getPhoneNumber())) {
				count++;
			}
			if (employee.getEmail().equals(bl.getEmail())) {
				count++;
			}
			if (count >= 5) {
				return true;
			}
		}

		return false;
	}

	public void reviewerList() {
		List<Employee> reviewerList = this.employeeRepository.getReviewersByProvince();

		for (Employee reviewer : reviewerList) {
			String provinceCode = reviewer.getProvinceCode().getProvinceCode();
		
			Long employeeId = reviewer.getEmployeeId();
			if (!EmployeeService.reviewerMap.containsKey(provinceCode)) {
				EmployeeService.reviewerMap.put(provinceCode, new ArrayList<>());
				EmployeeService.regionIndexMap.put(provinceCode, 0);
			}

			EmployeeService.reviewerMap.get(provinceCode).add(employeeId);

		}
	}

	public Long assignReviewer(Long employeeId) {
		int currentIndex = 0;
		Employee employee = getEmployeeById(employeeId);
		String province = employee.getProvinceCode().getProvinceCode();

		reviewerList();
		List<Long> reviewerList = EmployeeService.reviewerMap.get(province);
		if (reviewerList != null) {
			currentIndex = EmployeeService.regionIndexMap.get(province);
		} else {
			reviewerList = EmployeeService.reviewerMap.get(DEFAULT_REVIEWER_GROUP);
			currentIndex = EmployeeService.regionIndexMap.get(DEFAULT_REVIEWER_GROUP);
		}
		Long revId = reviewerList.get(currentIndex);
		currentIndex = (currentIndex + 1) % reviewerList.size();
		EmployeeService.regionIndexMap.put(province, currentIndex);
		return revId;
	}
	
	
}
