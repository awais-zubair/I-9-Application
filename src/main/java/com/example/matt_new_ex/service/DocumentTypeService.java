package com.example.matt_new_ex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.model.BlockList;
import com.example.matt_new_ex.model.DocumentType;
import com.example.matt_new_ex.repository.BlockListRepository;
import com.example.matt_new_ex.repository.DocumentTypeRepository;


@Service
public class DocumentTypeService {
	@Autowired
	DocumentTypeRepository documentTypeRepository;
	
	public List<DocumentType> getAllDocumentTypeList() {
		return documentTypeRepository.findAll();
	}
}
