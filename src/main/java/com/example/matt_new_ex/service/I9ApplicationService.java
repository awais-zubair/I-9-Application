package com.example.matt_new_ex.service;

import java.lang.module.FindException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Employee;
import com.example.matt_new_ex.model.I9Application;
import com.example.matt_new_ex.model.Office;
import com.example.matt_new_ex.repository.I9ApplicationRepository;
import com.querydsl.core.types.Predicate;

@Service
public class I9ApplicationService extends BaseService {
	@Autowired
	I9ApplicationRepository i9ApplicationRepository;

	public Iterable<I9Application> getAllI9Applications(Predicate predicate, Pageable pageable) {
		return this.i9ApplicationRepository.findAll(predicate, pageable);
	}

	public I9Application getI9ApplicationById(Long i9ApplicationId) {
		return i9ApplicationRepository.findById(i9ApplicationId)
				.orElseThrow(() -> new ResourceNotFoundException("i9ApplicationId", "id", i9ApplicationId));
	}

	public I9Application saveSectionOneI9Application(I9Application i9Application) {
		return i9ApplicationRepository.save(i9Application);
	}

	public I9Application updateI9Application(Long i9ApplicationId, I9Application i9ApplicationDetails) {
		Optional<I9Application> target = i9ApplicationRepository.findById(i9ApplicationId); // Get all columns for the
																							// id
		if (target.isEmpty())
			throw new FindException("I9 Application not found");
		I9Application updated = target.get();
		copyProperties(i9ApplicationDetails, updated);
		return i9ApplicationRepository.save(updated);
	}

	public I9Application updateI9ApplicationPatch(Long i9ApplicationId, I9Application i9ApplicationDetails) {
		Optional<I9Application> target = i9ApplicationRepository.findById(i9ApplicationId); // Get all columns for the
																							// id
		if (target.isEmpty())
			throw new FindException("I9 Application not found");
		I9Application updated = target.get();
		copyNonNullProperties(i9ApplicationDetails, updated);
		return i9ApplicationRepository.save(updated);
	}
	
	public Long getI9StatusTotalsByType(Long statusId) {
		return i9ApplicationRepository.getI9StatusTotalsByType(statusId);
	}
}
