package com.example.matt_new_ex.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Province")
public class Province {
	
@Id
private String provinceCode;
private String description;
private String regionCode;

public String getProvinceCode() {
	return provinceCode;
}
public void setProvinceCode(String provinceCode) {
	this.provinceCode = provinceCode;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public String getRegionCode() {
	return regionCode;
}
public void setRegionCode(String regionCode) {
	this.regionCode = regionCode;
}


}

