package com.example.matt_new_ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.matt_new_ex.model.Document;
import com.example.matt_new_ex.model.DocumentType;
import com.example.matt_new_ex.service.DocumentService;
import com.example.matt_new_ex.service.DocumentTypeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {

	@Autowired
	private DocumentTypeService documentTypeService;
	
	@Autowired
	private DocumentService documentService;
	
	@GetMapping("/getDocumentTypeList")
	@ResponseBody
	public List<DocumentType> getAlldocuments() {
		return this.documentTypeService.getAllDocumentTypeList();
	}
	
	@PostMapping("/postDocument")
	public Document postDocument(@RequestBody Document document) {
		return this.documentService.postDocument(document);
	}
	
	@GetMapping("/getDocument/{id}")
	public Document getDocument(@PathVariable(name="id") Long documentId) {
		return this.documentService.getDocument(documentId);
	}
}
