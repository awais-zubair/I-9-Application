package com.example.matt_new_ex.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.matt_new_ex.exception.ResourceNotFoundException;
import com.example.matt_new_ex.model.Province;
import com.example.matt_new_ex.repository.ProvinceRepository;


@Service
public class ProvinceService {
	@Autowired
	ProvinceRepository provinceRepository;
	
	public List<Province> getAllProvinces() {
		return provinceRepository.findAll();
	}
	
	public Province getProvinceById(String provinceCode) {
		return provinceRepository.findById(provinceCode)
		.orElseThrow(()-> new ResourceNotFoundException("province","code",provinceCode));
		}
}

