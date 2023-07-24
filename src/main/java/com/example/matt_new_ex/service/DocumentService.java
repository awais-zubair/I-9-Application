package com.example.matt_new_ex.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Document;
import com.example.matt_new_ex.repository.DocumentRepository;

@Service
public class DocumentService extends BaseService{
	@Autowired
	DocumentRepository documentRepository;
	
	public Document postDocument(Document document) {
		return documentRepository.save(document);
	}
	
	public Document getDocument(Long documentId) {
		return documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("document", "id", documentId));
	}
}
