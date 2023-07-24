package com.example.matt_new_ex.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Region")
public class Region {
	
@Id
private String regionCode;
private String description;

public String getRegionCode() {
	return regionCode;
}
public void setRegionCode(String regionCode) {
	this.regionCode = regionCode;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}





}
