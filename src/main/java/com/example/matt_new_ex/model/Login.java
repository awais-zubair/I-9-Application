package com.example.matt_new_ex.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Login")
public class Login {
	    
	@Id
	private Long loginId;
	private String loginCode;
	private Long employeeId; // MAKE THIS AN EMP OBJ !!
	private String password;
	
	public Long getLoginId() {
	    return loginId;
	}
	public void setLoginId(Long loginId) {
	    this.loginId = loginId;
	}
	public String getLoginCode() {
	    return loginCode;
	}
	public void setLoginCode(String loginCode) {
	    this.loginCode = loginCode;
	}
	public Long getEmployeeId() {
	    return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
	    this.employeeId = employeeId;
	}
	public String getPassword() {
	    return password;
	}
	public void setPassword(String password) {
	    this.password = password;
	}

}