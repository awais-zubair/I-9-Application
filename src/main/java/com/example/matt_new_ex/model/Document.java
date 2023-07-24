package com.example.matt_new_ex.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Document")
public class Document {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,
					generator = "document_Sequence")
	@SequenceGenerator(name = "document_Sequence",
						sequenceName = "document_seq",
						initialValue = 150,
						allocationSize = 1)
	private Long documentId;
	private Long I_9_ApplicationId;
	private String issuingAuthority;
	private String documentNumber;
	private Date expirationDate;
	@Column(columnDefinition="char")
	private String listType;
	
	public Long getDocumentId() {
		return documentId;
	}

	public void setDocumentId(Long documentId) {
		this.documentId = documentId;
	}

	public Long getI_9_ApplicationId() {
		return I_9_ApplicationId;
	}
	public void setI_9_ApplicationId(Long i_9_ApplicationId) {
		I_9_ApplicationId = i_9_ApplicationId;
	}

	public String getIssuingAuthority() {
		return issuingAuthority;
	}

	public void setIssuingAuthority(String issuingAuthority) {
		this.issuingAuthority = issuingAuthority;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}
}
