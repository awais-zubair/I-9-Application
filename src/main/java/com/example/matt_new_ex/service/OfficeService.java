package com.example.matt_new_ex.service;

import java.lang.module.FindException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Office;
import com.example.matt_new_ex.repository.OfficeRepository;

@Service
public class OfficeService extends BaseService{
	@Autowired
	OfficeRepository officeRepository;
	
	public List<Office> getAllOffices() {
		return officeRepository.findAll();
	}
	
	public Office getOfficeById(Long officeId) {
		return officeRepository.findById(officeId)
		.orElseThrow(()-> new ResourceNotFoundException("office","id",officeId));
		}
	
	public Office createOffice(Office office) {
		return officeRepository.save(office); 
		}
	
	public Office updateOffice(Long officeId, Office officeDetails) {
		//Get all the data for the id from the database
		Office office = officeRepository.findById(officeId)
		.orElseThrow(() -> new ResourceNotFoundException("office", "id", officeId));
		office.setOfficeId(officeDetails.getOfficeId());
		office.setName(officeDetails.getName());
		office.setStreet(officeDetails.getStreet());
		office.setCity(officeDetails.getCity());
		office.setProvince(officeDetails.getProvince());
		office.setPostalCode(officeDetails.getPostalCode());
		office.setPhoneNumber(officeDetails.getPhoneNumber());
		Office updatedOffice = officeRepository.save(office);
		return updatedOffice;
		}
		
	public Office updateOfficePatch(Long id, Office office) {
		Optional<Office> target = officeRepository.findById(id); // Get all columns for the id
		if (target.isEmpty()) throw new FindException("Office not found");
		Office updated = target.get();
		copyNonNullProperties(office, updated);
		return officeRepository.save(updated);
		}

	public ResponseEntity<?> deleteOffice(Long officeId) {
		Office office = officeRepository.findById(officeId)
		.orElseThrow(() -> new ResourceNotFoundException("office", "id", officeId));
		officeRepository.delete(office);
		return new ResponseEntity<>("Office Deleted", HttpStatus.OK);
		}

}
