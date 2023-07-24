package com.example.matt_new_ex.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Employee_role")
public class EmployeeRole {
	@Id
	private Long employeeRoleId;
	private String description;
	public Long getEmployeeRoleId() {
		return employeeRoleId;
	}
	
	public void setEmployeeRoleId(Long employeeRoleId) {
		this.employeeRoleId = employeeRoleId;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
}