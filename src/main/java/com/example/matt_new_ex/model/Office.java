package com.example.matt_new_ex.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity

public class Office {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,
					generator = "office_Sequence")
	@SequenceGenerator(name = "office_Sequence",
						sequenceName = "office_seq",
						initialValue = 150,
						allocationSize = 1)
	private Long officeId;
	private String name;
	private String street;
	private String city;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="provinceCode")
	private Province province;
	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	//private String provinceCode;

	
	private String postalCode;
	private String phoneNumber;
	private Date openDate;
	
	public Date getOpenDate() {
		return openDate;
	}

	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}

	public Long getOfficeId() {
		return officeId;
	}
	
	public void setOfficeId(Long officeId) {
		this.officeId=officeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

/**	public String getProvinceCode() {
		return provinceCode;
	}

	public void setProvince(String provinceCode) {
		this.provinceCode = provinceCode;
	}
**/
	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}