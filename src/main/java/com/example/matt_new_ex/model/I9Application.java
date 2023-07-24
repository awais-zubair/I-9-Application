package com.example.matt_new_ex.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "I_9_Application")
public class I9Application {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,
					generator = "i_9_application_Sequence")
	@SequenceGenerator(name = "i_9_application_Sequence",
						sequenceName = "i_9_application_seq",
						initialValue = 150,
						allocationSize = 1)
	private Long I_9_ApplicationId;
	
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="employeeId")
	private Employee employee;
	//private Long employeeId;
	//@ManyToOne(fetch=FetchType.EAGER)
	//@JoinColumn(name="reviewerId")
	//private Employee reviewer;
	private Long reviewerId;
	
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="statusId")
	private Status status;
	private Date dateCreated;
	private Date dateSubmitted;
	private String otherNames;
	private String address;
	private String aptNumber;
	private String city;
	
	@Column(columnDefinition="char")
	private String state;
	private String zipCode;
	private String citizenStatus;
	private String uscisNumber;
	private Date alienAuthorizationDate;
	private String form_I_94_AdmissionNumber;
	private String foreignPassportNumber;
	private String countryCode;
	private char preparedOrTranslatedId;
	private String empLastFirstMiddleName;
	private Date empFirstDayOfEmployment;
	private Date reviewerSignatureDate;
	private String titleOfEmployer;
	private String businessName;
	private String lastName;
	private String firstName;
	private String middleInitial;
	private String ssn;
	private String email;
	private String phoneNumber;
	
	public Long getI_9_ApplicationId() {
		return I_9_ApplicationId;
	}
	public void setI_9_ApplicationId(Long i_9_ApplicationId) {
		I_9_ApplicationId = i_9_ApplicationId;
	}
	public Date getAlienAuthorizationDate() {
		return alienAuthorizationDate;
	}
	public void setAlienAuthorizationDate(Date alienAuthorizationDate) {
		this.alienAuthorizationDate = alienAuthorizationDate;
	}
	public String getForm_I_94_AdmissionNumber() {
		return form_I_94_AdmissionNumber;
	}
	public void setForm_I_94_AdmissionNumber(String form_I_94_AdmissionNumber) {
		this.form_I_94_AdmissionNumber = form_I_94_AdmissionNumber;
	}
	public char getPreparedOrTranslatedId() {
		return preparedOrTranslatedId;
	}
	public void setPreparedOrTranslatedId(char preparedOrTranslatedId) {
		this.preparedOrTranslatedId = preparedOrTranslatedId;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleInitial() {
		return middleInitial;
	}
	public void setMiddleInitial(String middleInitial) {
		this.middleInitial = middleInitial;
	}
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Long getI9ApplicationId() {
		return I_9_ApplicationId;
	}
	public void setI9ApplicationId(Long i_9_ApplicationId) {
		I_9_ApplicationId = i_9_ApplicationId;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	} 
	public Long getReviewerId() {
		return reviewerId;
	}
	public void setReviewerId(Long reviewer) {
		this.reviewerId = reviewer;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	public Date getDateSubmitted() {
		return dateSubmitted;
	}
	public void setDateSubmitted(Date dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}
	public String getOtherNames() {
		return otherNames;
	}
	public void setOtherNames(String otherNames) {
		this.otherNames = otherNames;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAptNumber() {
		return aptNumber;
	}
	public void setAptNumber(String aptNumber) {
		this.aptNumber = aptNumber;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getCitizenStatus() {
		return citizenStatus;
	}
	public void setCitizenStatus(String citizenStatus) {
		this.citizenStatus = citizenStatus;
	}
	public String getUscisNumber() {
		return uscisNumber;
	}
	public void setUscisNumber(String uscisNumber) {
		this.uscisNumber = uscisNumber;
	}
	public Date getAlientAuthorizationDate() {
		return alienAuthorizationDate;
	}
	public void setAlientAuthorizationDate(Date alientAuthorizationDate) {
		this.alienAuthorizationDate = alientAuthorizationDate;
	}
	public String getFormI94AdmissionNumber() {
		return form_I_94_AdmissionNumber;
	}
	public void setFormI94AdmissionNumber(String formI94AdmissionNumber) {
		this.form_I_94_AdmissionNumber = formI94AdmissionNumber;
	}
	public String getForeignPassportNumber() {
		return foreignPassportNumber;
	}
	public void setForeignPassportNumber(String foreignPassportNumber) {
		this.foreignPassportNumber = foreignPassportNumber;
	}
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	public char getPraparedOrTranslatedId() {
		return preparedOrTranslatedId;
	}
	public void setPraparedOrTranslatedId(char preparedOrTranslatedId) {
		this.preparedOrTranslatedId = preparedOrTranslatedId;
	}
	public String getEmpLastFirstMiddleName() {
		return empLastFirstMiddleName;
	}
	public void setEmpLastFirstMiddleName(String empLastFirstMiddleName) {
		this.empLastFirstMiddleName = empLastFirstMiddleName;
	}
	public Date getEmpFirstDayOfEmployment() {
		return empFirstDayOfEmployment;
	}
	public void setEmpFirstDayOfEmployment(Date empFirstDayOfEmployment) {
		this.empFirstDayOfEmployment = empFirstDayOfEmployment;
	}
	public Date getReviewerSignatureDate() {
		return reviewerSignatureDate;
	}
	public void setReviewerSignatureDate(Date reviewerSignatureDate) {
		this.reviewerSignatureDate = reviewerSignatureDate;
	}
	public String getTitleOfEmployer() {
		return titleOfEmployer;
	}
	public void setTitleOfEmployer(String titleOfEmployer) {
		this.titleOfEmployer = titleOfEmployer;
	}
	public String getBusinessName() {
		return businessName;
	}
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}
	
}
