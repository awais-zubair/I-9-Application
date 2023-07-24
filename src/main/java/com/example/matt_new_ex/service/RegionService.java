package com.example.matt_new_ex.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Region;
import com.example.matt_new_ex.repository.RegionRepository;


@Service
public class RegionService {
	@Autowired
	RegionRepository regionRepository;
	
	public List<Region> getAllRegions() {
		
		return regionRepository.findAll();
	}
	
	public Region getRegionById(String regionCode)  {
		return regionRepository.findById(regionCode)
		.orElseThrow(()-> new ResourceNotFoundException("region","code",regionCode));
		}
	
	
}