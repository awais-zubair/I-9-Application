package com.example.matt_new_ex.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Document_type")
public class DocumentType {
	
	@Id
	private Long documentTypeId;
	private String description;
	
	public Long getDocumentTypeId() {
		return documentTypeId;
	}
	public void setDocumentTypeId(Long documentTypeId) {
		this.documentTypeId = documentTypeId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	

	

}

